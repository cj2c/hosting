function LevelRenderer(level){

	var self = this;
	self.level = level;

	/*********************

	1. DRAW THE VISIBLE LAYER
	- The map's static background
	- The wall screen
	- The cam's CCTV lines (nice polygon technique)
	- The floor realobjects
	- The solid realobjects
	// save this canvas!
	- Mask in the same canvas

	2. DRAW THE CCTV LAYER
	- Just use grayscale
	- Create Monolith mask

	3. DRAW THEM TOGETHER
	- Translate to camera position
	- Oh wait, outline world
	- Draw Poppy, because she's gotta appear on top of everything.
	- Draw both layers onto the main canvas

	*********************/

	self.init = function(){

		var canvasWidth = self.level.map.width * W;
		var canvasHeight = self.level.map.height * H;

		// SEEN Canvas
		self.seenCanvas = _createCanvas(canvasWidth,canvasHeight);
		self.seenContext = self.seenCanvas.getContext('2d');

		// CCTV Canvas
		self.cctvCanvas = _createCanvas(canvasWidth,canvasHeight);
		self.cctvContext = self.cctvCanvas.getContext('2d');
		
		// Monolith Mask Canvas
		self.maskCanvas = _createCanvas(canvasWidth,canvasHeight);
		self.maskContext = self.maskCanvas.getContext('2d');

		// Camera Translations
		self.camera = {
			x: canvasWidth/2,
			y: canvasHeight/2,
			gotoX: canvasWidth/2,
			gotoY: canvasHeight/2
		};

	};

	function _createCanvas(w,h){
		canvas = document.createElement("canvas");
		canvas.width = w;
		canvas.height = h;
		return canvas;
	}

	self.draw = function(gameContext){

		// CCTV & DOTS offset
		offset = (offset+0.0125)%0.5;
		offset2 = (offset2+0.025)%1.0;

		///////////////////////////////
		// 1. DRAW THE VISIBLE LAYER //
		///////////////////////////////

		var ctx = self.seenContext;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

		// - The map's static background
		level.map.draw(ctx);

		// - The screen wallobjects
		level.walls.draw(ctx);

		// - Floor-tagged real objects
		// SHOULD BE .draw, not .drawFloor
		var floors = level.getTagged("floor");
		for(var i=0;i<floors.length;i++){
			if(floors[i].drawFloor){
				floors[i].drawFloor(ctx);
			}
		}

		// - The cam's CCTV lines & dots
		var path;
		if(!self.noCCTV){
			path = _getCCTVLines();
			_drawCCTVLines(ctx,path);
			_drawCCTVDots(ctx);
		}

		// If Alert, draw REDNESS EVERYWHERE
		if(level.sightLogic.alert){
			ctx.fillStyle = "rgba(200,40,40,0.6)";
			ctx.fillRect(0,0,ctx.canvas.width,ctx.canvas.height);
			ctx.fillStyle = "#000";
		}

		// - Realobjects, depth sorted.
		// SHOULD BE all reals - floors.
		var reals = level.realobjects.sort(function(a,b){
			return a.y-b.y;
		});
		for(var i=0;i<reals.length;i++){
			if(reals[i].draw){
				reals[i].draw(ctx);
			}
		}

		// - Mask in the same canvas

		ctx.globalCompositeOperation = "destination-in";
		ctx.beginPath();
		var poly = level.player.sightPolygon;
		var p = poly[0];
		ctx.moveTo(p.x*W, p.y*H);
		for(var i=1;i<poly.length;i++){
			p = poly[i];
			ctx.lineTo(p.x*W, p.y*H);
		}
		ctx.fill();
		ctx.globalCompositeOperation = "source-over";

		////////////////////////////
		// 2. DRAW THE CCTV LAYER //
		////////////////////////////

		var ctx = self.cctvContext;
		var grayOption = {gray:true};
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

		// - The map's static background
		level.map.draw(ctx,grayOption);

		// Draw floor as grayscale.

		// - The cam's CCTV lines & dots
		if(!self.noCCTV){
			_drawCCTVLines(ctx,path);
			_drawCCTVDots(ctx);
		}

		// - Reals, grayscaled (unless you're player)
		for(var i=0;i<reals.length;i++){
			if(reals[i].draw){
				reals[i].draw(ctx,grayOption);
			}
		}

		// - Create Monolith mask

		var ctx = self.maskContext;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

		var monoliths = level.getTagged("monolith");
		for(var x=0;x<monoliths.length;x++){
			ctx.beginPath();
			var poly = monoliths[x].sightPolygonDrawn;
			var p = poly[0];
			ctx.moveTo(p.x*W, p.y*H);
			for(var i=1;i<poly.length;i++){
				p = poly[i];
				ctx.lineTo(p.x*W, p.y*H);
			}
			ctx.fill();
		}

		// Mask it.
		var ctx = self.cctvContext;
		ctx.globalCompositeOperation = "destination-in";
		ctx.drawImage(self.maskCanvas,0,0);
		ctx.globalCompositeOperation = "source-over";

		///////////////////////////
		// 3. DRAW THEM TOGETHER //
		///////////////////////////

		var ctx = gameContext;
		ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);

		ctx.save();

		// Translate to camera position
		var cam = self.camera;
		cam.x = cam.x*0.8 + cam.gotoX*0.2;
		cam.y = cam.y*0.8 + cam.gotoY*0.2;
		ctx.translate(Game.canvas.width/2, Game.canvas.height/2);
		ctx.translate(-cam.x*W, -cam.y*H);

		// Draw all the layers
		ctx.drawImage(level.map.lineCanvas,0,0);
		
		// On the blackness
		level.player.draw(ctx);
		// What about monoliths? 
		/*for(var i=0;i<reals.length;i++){
			if(reals[i].draw){
				//debugger;
				reals[i].draw(ctx);
			}
		}*/

		ctx.drawImage(self.cctvCanvas,0,0);
		ctx.drawImage(self.seenCanvas,0,0);

		ctx.restore();

		/////////////////////////
		// 4. DRAW UI ELEMENTS //
		/////////////////////////

		for(var i=0;i<level.uiobjects.length;i++){
			level.uiobjects[i].draw(ctx);
		}
		

	};

	// HELPER METHODS //

	var offset = 0;
	function _getCCTVLines(){

		// Get monoliths
		var monoliths = level.getTagged("monolith");

		// Begin drawing...
		var path = [];

		// For each monolith's sight polygon...
		for(var x=0;x<monoliths.length;x++){
			var poly = monoliths[x].sightPolygon;

			// For each horizontal CCTV ray...
			for(var y=0.5;y<level.map.height;y+=0.5){

				// HACK - 0.01 offset to prevent odd-number polygon intersections. Hopefully.
				var ray = {
					a:{
						x: -1,
						y: y+offset+0.01
					},
					b:{
						x: 0,
						y: y+offset+0.01
					}
				};

				// Get array of all intersections, sorted by x
				var intersections = [];
				for(var z=0;z<poly.length;z++){
					var curr = poly[z];
					var next = poly[(z+1)%poly.length];
					var segment = {
						ax: curr.x,
						ay: curr.y,
						bx: next.x,
						by: next.y
					};
					var intersect = SightAndLight.getIntersection(ray,segment);
					var prev = intersections[intersections.length-1];
					if(intersect && !(prev && prev.x==intersect.x && prev.y==intersect.y)){
						intersections.push(intersect);
					}
				}
				intersections.sort(function(a,b){ return a.x-b.x; });

				// Add to total path
				path = path.concat(intersections);

			}
		}

		// Return total path!
		return path;		

	}
	function _drawCCTVLines(ctx,path){

		// Assume path is of form [start, end, start, end]
		// Or else we're screwed.
		ctx.beginPath();
		for(var i=0;i<path.length;i++){
			var p = path[i];
			if(i%2==0){
				ctx.moveTo(p.x*W, p.y*H);
			}else{
				ctx.lineTo(p.x*W, p.y*H);
			}
		}
		ctx.strokeStyle = "rgba(0,0,0,0.25)";
		ctx.lineWidth = 2;
		ctx.stroke();

	}
	var offset2 = 0;
	function _drawCCTVDots(ctx){

		// Get monoliths, cloned
		var monoliths = level.getTagged("monolith").concat();

		// Filter out the ones not seeing THE PLAYER
		monoliths = monoliths.filter(function(monolith){
			return SightAndLight.inPolygon(level.player, monolith.sightPolygon);
		});

		// For now, straight up draw lines
		ctx.fillStyle = "#fff";
		var p = level.player;
		for(var i=0;i<monoliths.length;i++){
			var m = monoliths[i];

			var vector = {
				x: p.x-m.x,
				y: (p.y-0.1)-m.y
			};
			vector.mag = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
			vector.x /= vector.mag;
			vector.y /= vector.mag;

			for(var t=offset2;t<vector.mag;t+=1){
				ctx.beginPath();
				var x = m.x + vector.x*t;
				var y = m.y + vector.y*t;
				ctx.arc(x*W, y*H, 3, 0, 2*Math.PI, false);
				ctx.fill();
			}

		}

	}


}