define(function (require) {
    "use strict";

    var GameObjectBase = require('game/game-objects/GameObjectBase');
    var THREE = require('THREE');
    var Physijs = require('Physijs');

    function Box () {
        GameObjectBase.apply(this, arguments);

        this.mesh = new Physijs.BoxMesh(
            new THREE.CubeGeometry(10, 10, 10),
            Physijs.createMaterial(
                new THREE.MeshLambertMaterial({ color: 0xff0000 }),
                0.8, // high friction
                0.3 // low restitution
            ),
            10 // mass
        );
        this.mesh.receiveShadow = true;
        this.mesh.castShadow = true;
    };
    Box.prototype = new GameObjectBase();
    Box.prototype.constructor = Box;

    Box.prototype.add = function () {
    };


    return Box;
});