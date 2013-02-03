// Generated by CoffeeScript 1.4.0
(function() {
  var App,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  App = {};

  App.metagames = [];

  App.Metagame = (function() {

    function Metagame(id) {
      this.drawPlayerList = __bind(this.drawPlayerList, this);

      this.sendPlayerList = __bind(this.sendPlayerList, this);

      this.removePlayer = __bind(this.removePlayer, this);

      this.addPlayer = __bind(this.addPlayer, this);
      if (id) {
        this.id = id;
      } else {
        this.id = Math.random().toString(36).substring(2, 6);
      }
    }

    Metagame.prototype.url = function() {
      return "/" + this.id;
    };

    Metagame.prototype.isAcceptingPlayers = function() {
      return true;
    };

    Metagame.prototype.serverInit = function(io) {
      var _this = this;
      this.players = [];
      this.room = io.of("/" + this.id);
      return this.room.on('connection', function(socket) {
        console.log("GAME " + _this.id + ": user connected: " + socket.id);
        return socket.on('player joining', function(data) {
          return _this.addPlayer(data.name, socket.id);
        });
      });
    };

    Metagame.prototype.addPlayer = function(name, id) {
      this.players.push({
        name: name,
        id: id
      });
      return this.sendPlayerList();
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
      return this.room.emit('player list updated', this.players);
    };

    Metagame.prototype.clientInit = function(io, name) {
      var _this = this;
      this.el = $("<div>").addClass('active view').attr("id", "metagame");
      $('.active.view').removeClass('active').hide();
      $('body').append(this.el);
      this.socket = io.connect("/" + this.id);
      this.socket.emit('player joining', {
        name: name
      });
      return this.socket.on('player list updated', function(players) {
        _this.players = players;
        return _this.drawPlayerList();
      });
    };

    Metagame.prototype.drawPlayerList = function() {
      console.log(this.players);
      return this.el.html(_.template(App.Metagame.Default.Templates.main_view, {
        players: this.players
      }));
    };

    return Metagame;

  })();

  App.Minigame = (function() {

    function Minigame() {}

    return Minigame;

  })();

  App.Utilities = {
    checkOrientation: function() {
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) && $(window).width() > $(window).height()) {
        return alert('To play Mobile Party, you should use portrait orientation on your phone. (You may want to lock your phone in this orientation!)');
      }
    }
  };

  if (typeof module !== "undefined" && module !== null) {
    module.exports = App;
  } else {
    window.App = App;
  }

}).call(this);
