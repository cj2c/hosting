(function(){

	var lvl = Game.level;

	//lvl.player.NORMAL_SPEED = 0.3;

	subscribeOnce("level/goal",function(){
		alert("WHOO");
	});

	subscribeOnce("custom/conversation",function(){
		Sequence([
			function(){
				lvl.player.deactivated = true;
				lvl.player.speak("Woah...");
			},
			function(){
				lvl.player.speak("...What happened here?");
			},
			function(){
				lvl.fatty.speak("Your MOM is what happened here.");
			},
			function(){
				lvl.fatty.speak("fatty.");
			},
			function(){
				lvl.player.deactivated = false;
				lvl.dialogue.hide();
			}
		]);
    });

	subscribeOnce("custom/vote_one",function(){
		takePicture();
		addComment("intro/comment_one");
    });
    subscribeOnce("custom/vote_zero",function(){
		takePicture();
		addComment("intro/comment_zero");
    });
	
	subscribe("game/update", function(){
	    if(!pictureTaken && lvl.player.x>32){
	    	takePicture();
			addComment("intro/comment_none");
	    }
	});

	var pictureTaken = false;
	function takePicture(){

		// ONLY ONCE

		if(pictureTaken) return;
		pictureTaken = true;

		// TAKE PICTURE

		var cam = lvl.renderer.camera;
		var cx = Game.canvas.width/2 - cam.x*W;
		var cy = Game.canvas.height/2 - cam.y*H;
		var px = lvl.player.x*W;
		var py = lvl.player.y*H;
		
		var x = cx+px-100;
		var y = cy+py-150;

		var picture = document.createElement("canvas");
		picture.width = 200;
		picture.height = 200;
		var ctx = picture.getContext("2d");

		ctx.fillRect(0,0,200,200);
		ctx.drawImage(Game.canvas, x,y,200,200, 0,0,200,200);

		// ADD TO WALL

		Asset.image["snapshot/first_vote"] = picture;

		var wallImage = new WallImage(lvl);
		wallImage.image = "snapshot/first_vote";
		wallImage.x = 36;
		wallImage.y = 0;
		wallImage.init();
		lvl.wallobjects.push(wallImage);

	}

	function addComment(comment_image){

		var wallImage = new WallImage(lvl);
		wallImage.image = comment_image;
		wallImage.x = 36;
		wallImage.y = 0;
		wallImage.init();
		lvl.wallobjects.push(wallImage);

	}

})();