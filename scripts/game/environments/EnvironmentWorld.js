define(function (require) {
    "use strict";

    var THREE = require('THREE');
    var EnvironmentBase = require('game/environments/EnvironmentBase');
    var Room = require('game/game-objects/Room');
    var Box = require('game/game-objects/Box');

    function EnvironmentWorld () {
        EnvironmentBase.apply(this, arguments);
    }
    EnvironmentWorld.prototype = new EnvironmentBase();
    EnvironmentWorld.prototype.constructor = EnvironmentWorld;


    ////////////////////////////////////
    // ENVIRONMENT-SPECIFIC FUNCTIONS //
    ////////////////////////////////////

    /**
     * This runs when the environment finishes loading. Each environment should have a unique `ready` callback
     */
    EnvironmentWorld.prototype.ready = function () {
        var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.4 );
        var dirLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
        var room = new Room();
        var box = new Box();
        var d = 100;

        this.game.camera.position.set(-100, 100, 0);
        this.game.camera.lookAt(this.game.scene.position);

        hemiLight.position.set( 0, 500, 0 );
        this.game.scene.add( hemiLight );

        dirLight.position.set( -1, 1.75, 1 );
        dirLight.position.multiplyScalar( 50 );
        dirLight.shadowCameraLeft = -d;
        dirLight.shadowCameraRight = d;
        dirLight.shadowCameraTop = d;
        dirLight.shadowCameraBottom = -d;
        dirLight.shadowCameraFar = 3500;
        dirLight.shadowCameraVisible = false;
        dirLight.castShadow = true;
        this.game.scene.add( dirLight );

        room.mesh.position.set(0, 0, 0);
        this.add(room);

        box.mesh.position.set(0, 50, 0);
        this.add(box);
        box.mesh.setLinearVelocity(new THREE.Vector3(0, -10, 0));
        box.mesh.setAngularVelocity(new THREE.Vector3(0.1, 0.1, 0.1));
    };

    /**
     * The callback to execute when the assets make progress loading
     * @param  {AssetBase} asset  The asset that was just loaded
     */
    EnvironmentWorld.prototype.progress = function (asset) {
        console.log('asset loaded:', asset);
    };


    return EnvironmentWorld;
});