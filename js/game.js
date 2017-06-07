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
        game.load.image('mpigeon', 'small_mpigeon.jpg');
        console.log('preload');
    },
    create: function() {
		this.state.start('Game.Welcome');
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
	},
	create: function () {
        for (i = 0; i < 6; i++) {
            for (j = 0; j < 4; j++) {
                var newtile = this.add.sprite(this.world.centerX + 134 * (i - 2.5) - 230,this.world.centerY + 178 * (j - 1.5), 'mpigeon');
                newtile.anchor.x = 0.5;
                newtile.anchor.y = 0.5;
                newtile.inputEnabled = true;
				newtile.events.onInputOver.add(this.over, this);
				newtile.events.onInputOut.add(this.out, this);
				newtile.events.onInputDown.add(this.click, this);
            }
        }
		this.time.events.add(3000, this.next, this);
	},
    over: function (item) {
	},
	out: function (item) {
	},
	click: function (item) {
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