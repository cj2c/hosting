Asset.init({
	images:{
		
		cctv:'assets/textures/cctv.png',

		conveyor:'assets/textures/conveyor.png',
		conveyor_blue:'assets/textures/conveyor_blue.png',
		conveyor_cctv:'assets/textures/conveyor_cctv.png',

		carpet:'assets/textures/carpet.png',
		carpet_cctv:'assets/textures/carpet_cctv.png',

		screenline:'assets/textures/screenline.png',
		exit:'assets/textures/exit.png',
		exit_2:'assets/textures/exit_2.png',

		// PROPAGANDA or TUTORIAL

		propaganda_cat:'assets/propaganda/cat.png',
		propaganda_up:'assets/propaganda/button_up.png',
		propaganda_down:'assets/propaganda/button_down.png',

		propaganda_tut_walk:'assets/propaganda/tut_walk.png',
		propaganda_tut_slow:'assets/propaganda/tut_slow.png',
		propaganda_tut_pickup:'assets/propaganda/tut_pickup.png',
		propaganda_tut_carpet:'assets/propaganda/tut_carpet.png',
		propaganda_tut_reminder:'assets/propaganda/tut_reminder.png',
		propaganda_tut_power:'assets/propaganda/tut_power.png',
		propaganda_tut_slidewalk:'assets/propaganda/tut_slidewalk.png',
		propaganda_tut_darker:'assets/propaganda/tut_darker.png',

		propaganda_smile:'assets/propaganda/smile.png',
		propaganda_puzzle_psa:'assets/propaganda/puzzle_psa.png',
		propaganda_puzzle_mock:'assets/propaganda/puzzle_mock.png',
		propaganda_dont_help_hiders:'assets/propaganda/dont_help_hiders.png',
		propaganda_pickup_gardner:'assets/propaganda/pickup_gardner.png',
		propaganda_nobody_the_wall:'assets/propaganda/nobody_the_wall.png',
		propaganda_nobody_the_wall_2:'assets/propaganda/nobody_the_wall_2.png',
		propaganda_nobody_messes:'assets/propaganda/nobody_messes.png',
		propaganda_stream_wall:'assets/propaganda/stream_wall.png',
		propaganda_stream_wall_2:'assets/propaganda/stream_wall_2.png',
		propaganda_questions:'assets/propaganda/questions.png',
		propaganda_intro_pics:'assets/propaganda/intro_pics.png',
		propaganda_pickup_lookout:'assets/propaganda/pickup_lookout.png',
		propaganda_unsecret_ballot:'assets/propaganda/unsecret_ballot.png',
		propaganda_error:'assets/propaganda/error.png',

	},
	spritesheets:{
		Poppy_Idle:'assets/spritesheets/poppy/200x200_bored_idle.png',
		Poppy_Walk:'assets/spritesheets/poppy/200x200_bored_walk.png'
	},
	sprites:{
		
		//Poppy_Idle:'assets/sprites/Poppy_Idle',
		Poppy_Idle_With_Eye:'assets/sprites/Poppy_Idle_With_Eye',
		Poppy_Idle_With_Eye_2:'assets/sprites/Poppy_Idle_With_Eye_2',
		Poppy_Shot:'assets/sprites/Poppy_Shot',
		
		//Poppy_Walk:'assets/sprites/Poppy_Walk',
		Poppy_Walk_With_Eye:'assets/sprites/Poppy_Walk_With_Eye',
		Poppy_Walk_With_Eye_2:'assets/sprites/Poppy_Walk_With_Eye_2',

		MrPrism:'assets/sprites/MrPrism',
		PrismEye:'assets/sprites/PrismEye',
		Shimmer:'assets/sprites/Shimmer',

		Cursor:'assets/sprites/Cursor',
		Button:'assets/sprites/Button',

		SmallProps:'assets/sprites/SmallProps',
		BigProps:'assets/sprites/BigProps',

		Dandy:'assets/sprites/Dandy'

	},
	sounds:{

		sfx_cam:{src:'assets/sounds/mp3/cam.mp3|assets/sounds/ogg/cam.ogg'}

		/*sfx_shotdown:{src:'assets/sounds/mp3/shotdown.mp3|assets/sounds/ogg/shotdown.ogg'},
		sfx_alarm:{src:'assets/sounds/mp3/alarm.mp3|assets/sounds/ogg/alarm.ogg'},
		
		sfx_prism_pickup:{src:'assets/sounds/mp3/prism_pickup.mp3|assets/sounds/ogg/prism_pickup.ogg'},
		sfx_prism_putdown:{src:'assets/sounds/mp3/prism_putdown.mp3|assets/sounds/ogg/prism_putdown.ogg'},

		sfx_footstep_1:{src:'assets/sounds/mp3/step_1.mp3|assets/sounds/ogg/step_1.ogg'},
		sfx_footstep_2:{src:'assets/sounds/mp3/step_2.mp3|assets/sounds/ogg/step_2.ogg'},
		sfx_metal_footstep_1:{src:'assets/sounds/mp3/metal_step_1.mp3|assets/sounds/ogg/metal_step_1.ogg'},
		sfx_metal_footstep_2:{src:'assets/sounds/mp3/metal_step_2.mp3|assets/sounds/ogg/metal_step_2.ogg'},
		
		sfx_carpet_footstep_1:{src:'assets/sounds/mp3/carpet_step_1.mp3|assets/sounds/ogg/carpet_step_1.ogg'},
		sfx_carpet_footstep_2:{src:'assets/sounds/mp3/carpet_step_2.mp3|assets/sounds/ogg/carpet_step_2.ogg'},

		sfx_cam:{src:'assets/sounds/mp3/cam.mp3|assets/sounds/ogg/cam.ogg'},
		sfx_slidewalk:{src:'assets/sounds/mp3/slidewalk.mp3|assets/sounds/ogg/slidewalk.ogg'},
		sfx_dialog:{src:'assets/sounds/mp3/dialog.mp3|assets/sounds/ogg/dialog.ogg'},

		button_hover: {src:'assets/sounds/mp3/button_hover.mp3|assets/sounds/ogg/button_hover.ogg'},
		button_press: {src:'assets/sounds/mp3/button_press.mp3|assets/sounds/ogg/button_press.ogg'},*/

		//music_bg: {src:'assets/music/mp3_64/a_healthy_dystopia.mp3|assets/music/ogg_64/a_healthy_dystopia.ogg'},
		//music_bg_2: {src:'assets/music/mp3_64/home_sweet_homeland.mp3|assets/music/ogg_64/home_sweet_homeland.ogg'}

	},
	levels:{
		/*light: 'levels/light',
		doors: 'levels/doors'*/
		amazing: 'levels/amazing',
		introo: 'levels/intro'
	}
});

Game.init({
	levels:[
		'introo'
	]
});