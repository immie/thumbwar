// Generated by CoffeeScript 1.4.0
(function() {
  var TapRace,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  TapRace = (function(_super) {

    __extends(TapRace, _super);

    function TapRace() {
      this.end = __bind(this.end, this);

      this.render = __bind(this.render, this);

      this.start = __bind(this.start, this);
      return TapRace.__super__.constructor.apply(this, arguments);
    }

    TapRace.prototype.start = function() {
      var _this = this;
      this.score = 0;
      $(".view").html("<div class='minigame' style='width:100%; height:100%;'></div>");
      this.el = $(".minigame");
      this.el.append("<a href='#' class='btn'>Click me!</a>");
      this.el.append("<div class='score'>0</div>");
      this.el.find(".btn").bind('click', function() {
        _this.score++;
        return _this.render();
      });
      return setTimeout(this.end, 5000);
    };

    TapRace.prototype.render = function() {
      return $('.score').text(this.score);
    };

    TapRace.prototype.end = function() {
      return App.currentMetagame.clientGameover(this);
    };

    return TapRace;

  })(App.Minigame);

  App.minigames.push(new TapRace);

}).call(this);
