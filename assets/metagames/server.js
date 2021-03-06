// Generated by CoffeeScript 1.4.0
(function() {
  var Server, request,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  Server = {};

  request = require('request');

  Server.Metagame = (function() {

    function Metagame(id) {
      this.gameover = __bind(this.gameover, this);

      this.loadGame = __bind(this.loadGame, this);

      this.buildName = __bind(this.buildName, this);

      this.loadRandomGame = __bind(this.loadRandomGame, this);

      this.startMinigame = __bind(this.startMinigame, this);

      this.allPlayersReady = __bind(this.allPlayersReady, this);

      this.allPlayersNotInGame = __bind(this.allPlayersNotInGame, this);

      this.playerReady = __bind(this.playerReady, this);

      this.getPlayer = __bind(this.getPlayer, this);

      this.isAcceptingPlayers = __bind(this.isAcceptingPlayers, this);

      this.sendPlayerList = __bind(this.sendPlayerList, this);

      this.removePlayer = __bind(this.removePlayer, this);

      this.startMetagame = __bind(this.startMetagame, this);

      this.addPlayer = __bind(this.addPlayer, this);

      this.proxyFetch = __bind(this.proxyFetch, this);

      this.init = __bind(this.init, this);

      this.getPlayer = __bind(this.getPlayer, this);
      this.id = "" + this.names[id % this.names.length] + id;
    }

    Metagame.prototype.names = ["banana", "plum", "pear", "aardvark", "pie", "apple", "cheese", "egg", "pomegranite", "kiwi"];

    Metagame.prototype.colors = ['#ff0000', '#ff6600', '#ffe500', '#00cc00', '#0033cc', '#9900cc', '#ff00cc'];

    Metagame.prototype.getPlayer = function(id) {
      var player, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.id === id) {
          return player;
        }
      }
      return null;
    };

    Metagame.prototype.minigames = [
      {
        'name': 'TapRace',
        'src': "/assets/minigames/tap_race/tap_race.js"
      }, {
        'name': 'DoubleTapRace',
        'src': "/assets/minigames/double_tap_race/double_tap_race.js"
      }, {
        'name': 'HotPotato',
        'src': "/assets/minigames/hot_potato/hot_potato.js"
      }, {
        'name': 'HideAndSeek',
        'src': "/assets/minigames/hide_and_seek/hide_and_seek.js"
      }
    ];

    Metagame.prototype.init = function(io) {
      var _this = this;
      this.players = [];
      this.room = io.of("/" + this.id);
      return this.room.on('connection', function(socket) {
        socket.on('players: player joining', function(data) {
          return _this.addPlayer(data.name, socket.id);
        });
        socket.on('metagame: start', _this.startMetagame);
        socket.on('metagame: player ready', function() {
          return _this.playerReady(socket.id);
        });
        socket.on('minigame: gameover', function(data) {
          return _this.gameover(data.score, socket.id);
        });
        socket.on('players: refresh', _this.sendPlayerList);
        socket.on('broadcast', function(data) {
          data._player_id = socket.id;
          return _this.room.emit('broadcast', data);
        });
        return socket.on('proxyFetch', _this.proxyFetch);
      });
    };

    Metagame.prototype.proxyFetch = function(data) {
      var _this = this;
      return request({
        uri: data.url,
        json: true
      }, function(error, response, body) {
        if (!error && response.statusCode === 200) {
          console.log(body);
          return _this.room.emit("proxyFetchReturn", {
            body: body
          });
        }
      });
    };

    Metagame.prototype.addPlayer = function(name, id) {
      if (!name || !(name != null) || name === '') {
        name = this.buildName();
      }
      if (!this.colorCount) {
        this.colorCount = 0;
      }
      this.players.push({
        name: name,
        id: id,
        color: this.colors[this.colorCount++ % this.colors.length],
        score: 0
      });
      return this.sendPlayerList();
    };

    Metagame.prototype.startMetagame = function() {
      if (this.players.length >= 1) {
        console.log('STARTING METAGAME!');
        this.gameStarted = true;
        this.room.emit('metagame: start');
        return this.loadRandomGame();
      }
    };

    Metagame.prototype.readyToStart = function() {
      return this.players.length >= 1 && this.allPlayersNotInGame();
    };

    Metagame.prototype.removePlayer = function(id) {
      var index, player, _ref, _results;
      _ref = this.players;
      _results = [];
      for (index in _ref) {
        player = _ref[index];
        if (player.id === id) {
          this.players.splice(index, 1);
          _results.push(this.sendPlayerList());
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Metagame.prototype.sendPlayerList = function() {
      return this.room.emit('players: list updated', this.players);
    };

    Metagame.prototype.isAcceptingPlayers = function() {
      return this.players.length < 4 && !this.gameStarted;
    };

    Metagame.prototype.getPlayer = function(id) {
      var player, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.id === id) {
          return player;
        }
      }
      return null;
    };

    Metagame.prototype.playerReady = function(id) {
      this.getPlayer(id).ready = true;
      this.sendPlayerList();
      if (this.allPlayersReady()) {
        return this.startMinigame();
      }
    };

    Metagame.prototype.allPlayersNotInGame = function() {
      var player, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (player.in_game) {
          return false;
        }
      }
      return true;
    };

    Metagame.prototype.allPlayersReady = function() {
      var player, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        if (!player.ready) {
          return false;
        }
      }
      return true;
    };

    Metagame.prototype.startMinigame = function() {
      var player, _i, _len, _ref;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        player.in_game = true;
        player.ready = false;
        player.minigame_score = 0;
      }
      return this.room.emit('minigame: start');
    };

    Metagame.prototype.loadRandomGame = function() {
      return this.loadGame(Math.floor(this.minigames.length * Math.random()));
    };

    Metagame.prototype.buildName = function() {
      this.nouns || (this.nouns = ["Pickle", "Banana", "Ocelot", "Turnip", "Tuna", "Thumb"]);
      this.adjs || (this.adjs = ["Spicy", "Wet", "Sassy", "Grumpy", "Scumbag", "Sad", "Stanky"]);
      return "" + this.adjs[Math.floor(Math.random() * this.adjs.length)] + " " + this.nouns[Math.floor(Math.random() * this.nouns.length)];
    };

    Metagame.prototype.loadGame = function(index) {
      var player, _i, _len, _ref;
      this.currentMinigameIndex = index;
      _ref = this.players;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        player = _ref[_i];
        player.ready = false;
      }
      console.log("LOADING GAME: " + this.minigames[index]['name']);
      return this.room.emit('minigame: load', {
        minigame: this.minigames[index]
      });
    };

    Metagame.prototype.gameover = function(score, id) {
      var player, _i, _len, _ref;
      if (!score) {
        score = 0;
      }
      this.getPlayer(id).minigame_score = score;
      this.getPlayer(id).in_game = false;
      this.sendPlayerList();
      if (this.readyToStart()) {
        this.room.emit('minigame: gameover', {
          players: this.players
        });
        _ref = this.players;
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
          player = _ref[_i];
          player.score += player.minigame_score;
        }
        return this.loadRandomGame();
      }
    };

    return Metagame;

  })();

  module.exports = Server.Metagame;

}).call(this);
