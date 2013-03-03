# Thumb War

Thumb War is a totally awesome JavaScript-based video game platform. Think Mario Party for mobile.

## How it works

### Matchmaking

Players enter a name (or have one generated for them) and are automatically paired with others players waiting to play. 

### Metagame

The metagame tracks the overall "score" of a party as they play a series of minigames. After each minigame, the metagame takes control and displays current score, as well as the upcoming game and its instructions.

### Minigames

Minigames can be modularly written to take total control of the screen of all of the players, and simply report back to the metagame when a gameover has occured (as well as the scores of each player).

## How to run for development

* sudo npm install -g supervisor
* sudo npm install -g coffee-script
* sudo npm install
* sudo supervisor app.coffee
* coffee -c -w assets/
* point your browser to localhost

## Todo

* End game condition with final scores
* More games!

## Credits
Built by [@rofreg](http://twitter.com/rofreg), [@lizneu08](http://twitter.com/lizneu08), and [@kyletns](http://twitter.com/kyletns) for the [DowncityJS hackathon](http://downcityjs.com), February 2-3.

## License

Thumb War is released under a dual license. You may choose either the GPL or MIT license, depending on the project you are using it in and how you wish to use it. Have fun!
