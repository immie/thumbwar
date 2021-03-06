// Generated by CoffeeScript 1.4.0
(function() {

  App.Minigames.DoubleTapRace = {};

  App.Minigames.DoubleTapRace.Templates = {
    main_view: '<div class="score">Ready</div>\n<div class="racetrack">\n  <div class="progress">\n    <div class="runner-lane"></div>\n    <div class="runner-lane"></div>\n    <div class="runner-lane"></div>\n    <div class="runner-lane"></div>\n  </div>\n  <div class="finish"></div>\n</div>\n<div class="btn">Left!</div>\n<div class="btn">Right!</div>',
    player_view: '<div class="runner">\n  <div class="runner-body" id="body-<%= player.id %>" style="background-color: <%= player.color %>;"></div>\n  <div class="left-foot" id="left-<%= player.id %>" style="background-color: <%= player.color %>;"></div>\n  <div class="right-foot" id="right-<%= player.id %>" style="background-color: <%= player.color %>;"></div>\n</div>'
  };

}).call(this);
