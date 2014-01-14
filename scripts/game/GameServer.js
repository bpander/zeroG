define([
    'socket.io',
    'game/Game',
    'game/environments/EnvironmentWorld'
], function (
    socketIO,
    Game,
    EnvironmentWorld
) {
    'use strict';

    function GameServer () {

        this.io = null;

        this.onConnection = this.onConnection.bind(this);

        var game = new Game();

        game.loadEnvironment(new EnvironmentWorld()).then(game.animate);

    }


    GameServer.prototype.start = function (server) {
        this.io = socketIO.listen(server);
        this.io.set('log level', 1);

        this.io.sockets.on('connection', this.onConnection);
    };


    GameServer.prototype.onConnection = function (socket) {
        console.log('on connection');
        socket.on('keydown', this.onKeyDown);
    };


    GameServer.prototype.onKeyDown = function () {
        console.log('keydown');
    };

    return GameServer;
});