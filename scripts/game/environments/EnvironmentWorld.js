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
        try {
        this.game.camera.position.set(-100, 100, 0);
        this.game.camera.lookAt(this.game.scene.position);

                var hemiLight = new THREE.HemisphereLight( 0xffffff, 0xffffff, 0.4 );
                // hemiLight.color.setHSL( 0.6, 1, 0.6 );
                // hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
                hemiLight.position.set( 0, 500, 0 );
                this.game.scene.add( hemiLight );

                //

                var dirLight = new THREE.DirectionalLight( 0xffffff, 0.9 );
                dirLight.position.set( -1, 1.75, 1 );
                dirLight.position.multiplyScalar( 50 );
                this.game.scene.add( dirLight );

                dirLight.castShadow = true;

                dirLight.shadowMapWidth = 2048;
                dirLight.shadowMapHeight = 2048;

                var d = 100;

                dirLight.shadowCameraLeft = -d;
                dirLight.shadowCameraRight = d;
                dirLight.shadowCameraTop = d;
                dirLight.shadowCameraBottom = -d;

                dirLight.shadowCameraFar = 3500;
                dirLight.shadowBias = -0.0001;
                dirLight.shadowDarkness = 0.7;
                //dirLight.shadowCameraVisible = true;

        var room = new Room();
        room.mesh.position.set(0, 0, 0);
        this.add(room);

        var box = new Box();
        box.mesh.position.set(0, 50, 0);
        this.add(box);
        box.mesh.setLinearVelocity(new THREE.Vector3(0, -10, 0));
        box.mesh.setAngularVelocity(new THREE.Vector3(0.1, 0.1, 0.1));
    } catch (e) {
        console.log(e.toString());
    }
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