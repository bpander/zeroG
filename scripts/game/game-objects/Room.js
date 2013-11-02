define(function (require) {
    "use strict";

    var GameObjectBase = require('game/game-objects/GameObjectBase');
    var THREE = require('THREE');
    var Physijs = require('Physijs');

    function Room () {
        GameObjectBase.apply(this, arguments);

        this.mesh = new Physijs.BoxMesh(
            new THREE.CubeGeometry(100, 1, 100),
            Physijs.createMaterial(
                new THREE.MeshLambertMaterial({ color: 0xEEEEEE }),
                0.8, // high friction
                0.3 // low restitution
            ),
            0 // mass
        );
        this.mesh.receiveShadow = true;
    };
    Room.prototype = new GameObjectBase();
    Room.prototype.constructor = Room;

    Room.prototype.add = function () {
    };


    return Room;
});