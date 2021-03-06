define(function (require) {
    "use strict";

    var Loader = require('game/asset-loader/Loader');
    var THREE = require('THREE');
    var Physijs = require('Physijs');

    Physijs.scripts.worker = 'scripts/vendor/physijs_worker.js';

    /**
     * Holds all the info about your game
     * @constructor
     */
    function Game () {

        /**
         * THREEjs WebGL renderer
         * @type {THREE.WebGLRenderer}
         */
        this.renderer = null;

        /**
         * THREEjs camera object
         * @type {THREE.PerspectiveCamera}
         */
        this.camera = null;

        /**
         * Physijs scene
         * @type {Physjs.Scene}
         */
        this.scene = null;

        /**
         * The environment that we'll play the game in. Will be an instance of a class that extends EnvironmentBase.
         * @type {EnvironmentBase}
         */
        this.environment = null;

        /**
         * The thing you use to load assets
         * @type {Loader}
         */
        this.loader = new Loader();

        this.animate = this.animate.bind(this);
        this._onResize = this._onResize.bind(this);

        _init.call(this);
    };

    /**
     * Initialize the game framework
     * @return {Game}
     */
    var _init = function () {

        this.scene = new Physijs.Scene();
        this.scene.setGravity(new THREE.Vector3(0, 0, 0));

        // If this is server-side, we're done!
        if (Game.IS_SERVER) {
            return;
        }

        // Create the renderer for client-side
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.renderer.shadowMapEnabled = true;
        this.renderer.shadowMapSoft = true;
        this.render = function () {
            this.renderer.render(this.scene, this.camera);
        }.bind(this);

        // Set up the camera and add it to the scene
        this.camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 1000);
        this.scene.add(this.camera);

        // Adjust the aspect ratio if the user resizes their browser
        window.addEventListener('resize', this._onResize, false);
    };

    Game.IS_SERVER = typeof document === 'undefined';

    Game.prototype.start = function () {
        this.setAspectRatio();
        this.animate();
    };

    /**
     * The animation loop
     */
    Game.prototype.animate = function () {
        this.scene.simulate(undefined, 2);
        this.render();
        requestAnimationFrame(this.animate);
    };

    /**
     * By default, render is a no-op, but if we detect that we are client-side, we'll redefine `Game.render` to actually render the scene
     */
    Game.prototype.render = function () {};

    /**
     * Update the aspect ratio for THREEjs
     * @return {Game}
     */
    Game.prototype.setAspectRatio = function () {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
        return this;
    };

    Game.prototype._onResize = function () {
        this.setAspectRatio();
    };

    /**
     * Loads an environment
     * @param  {EnvironmentBase} environment  An instance of a class that is extended from EnvironmentBase that we want to run
     * @return {Deferred}
     */
    Game.prototype.loadEnvironment = function (environment) {
        this.environment = environment;
        this.environment.game = this;

        return this.environment.load();
    };


    return Game;
});