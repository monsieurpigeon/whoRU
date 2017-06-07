var game = new Phaser.Game(1280, 720, Phaser.AUTO, document.getElementById('game'));
game.state.add('Game.Preloader',Game.Preloader);
game.state.add('Game.Welcome',Game.Welcome);
game.state.add('Game.Login',Game.Login);
game.state.add('Game.Lobby',Game.Lobby);
game.state.add('Game.MainGame',Game.MainGame);
game.state.add('Game.Result',Game.Result);
game.state.add('Game.Check',Game.Check);
game.state.start('Game.Preloader');