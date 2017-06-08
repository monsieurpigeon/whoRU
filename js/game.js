var Game = {
    login: ''
};

Game.Preloader = function(){};
Game.Preloader.prototype = {
    init: function () {
        this.scale.pageAlignHorizontally = true;
    }, 
    preload: function() {
		this.load.path = 'assets/';
		game.load.json('students', 'students.json');
        console.log('preload');
    },
    create: function() {
		this.state.start('Game.Welcome');
		Game.students = game.cache.getJSON('students');
	}
};

Game.Welcome = function(){};
Game.Welcome.prototype = {
    preload: function () {
        console.log('welcome');
	},
	create: function () {
		this.time.events.add(3000, this.next, this);
	},
	next: function () {
		this.state.start('Game.Login');
	}
};

Game.Login = function(){};
Game.Login.prototype = {
    preload: function () {
        console.log('login');
	},
	create: function () {
		this.startButton = this.add.sprite(this.world.centerX, this.world.centerY, 'mpigeon');
		this.startButton.anchor.x = 0.5;
		this.startButton.anchor.y = 0.5;
		this.startButton.inputEnabled = true;
		this.startButton.events.onInputDown.add(this.next, this);
	},
	next: function () {
        Client.sendNewPlayer('mpigeon', game.state);
	}
};

Game.Lobby = function(){};
Game.Lobby.prototype = {
    preload: function () {
        console.log('lobby');
	},
	create: function () {
        Client.sendTest();
        text = game.add.text(game.world.centerX, game.world.centerY, Game.login, {
            font: "65px Arial",
            fill: "#ff0044",
            align: "center"
        });

        text.anchor.setTo(0.5, 0.5);
		this.time.events.add(3000, this.next, this);
	},
	next: function () {
		this.state.start('Game.MainGame');
	}
};

Game.MainGame = function(){};
Game.MainGame.prototype = {
    preload: function () {
        console.log('maingame');
		game.load.path = '';
		game.load.baseURL = 'https://cdn.intra.42.fr/users/';
    	game.load.crossOrigin = 'anonymous';
		Game.students.login.forEach(function(element) {
			game.load.image(element, 'small_'+element+'.jpg');
		});
        
	},
	create: function () {
        for (j = 0; j < 4; j++) {
            for (i = 0; i < 6; i++) {
                var newtile = this.add.sprite(this.world.centerX + 134 * (i - 2.5) - 230,this.world.centerY + 178 * (j - 1.5), Game.students.login[j * 6 + i]);
				var text = game.add.text(this.world.centerX + 134 * (i - 2.5) - 285, this.world.centerY + 178 * (j - 1.5) + 50, Game.students.login[j * 6 + i], {
					font: "20px Arial",
					fill: "#ffffff",
					align: "center"
				});
                newtile.anchor.setTo(0.5, 0.5);
                newtile.inputEnabled = true;
				cropRect = new Phaser.Rectangle(newtile.width/2 - 55, newtile.height/2 - 75, 120, 162);
				newtile.crop(cropRect);
				newtile.events.onInputOver.add(this.over, this);
				newtile.events.onInputOut.add(this.out, this);
				newtile.events.onInputDown.add(this.click, this);
            }
        }
		//this.time.events.add(3000, this.next, this);
	},
    over: function (item) {
		item.anchor.setTo(0.52, 0.52);
	},
	out: function (item) {
		item.anchor.setTo(0.5, 0.5);
	},
	click: function (item) {
		if (item.tint == 0xff0000) {
			item.tint = 0xffffff;
		} else {
			item.tint = 0xff0000;
		}
		
	},
	next: function () {
		this.state.start('Game.Result');
	}
};

Game.Result = function(){};
Game.Result.prototype = {
    preload: function () {
        console.log('result');
	},
	create: function () {
		this.time.events.add(3000, this.next, this);
	},
	next: function () {
		this.state.start('Game.Check');
	}
};

Game.Check = function(){};
Game.Check.prototype = {
    preload: function () {
        console.log('check');
	},
	create: function () {
		this.time.events.add(3000, this.next, this);
	},
	next: function () {
		this.state.start('Game.Lobby');
	}
};