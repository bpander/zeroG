define(function (require) {
    'use strict';

    var io = require('socket.io-client');
    var Game = require('game/Game');
    var EnvironmentWorld = require('game/environments/EnvironmentWorld');

    function Player () {

        this.socket = io.connect(SETTINGS.GAME_SERVER);

        this.game = new Game();

    }


    Player.prototype.start = function () {
        document.body.appendChild(this.game.renderer.domElement);
        this.game.loadEnvironment(new EnvironmentWorld());
        this.game.start();
        return this;
    };


    return Player;
});