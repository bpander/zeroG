requirejs([
    'game/Game',
    'game/environments/EnvironmentWorld'
], function (
    Game,
    EnvironmentWorld
) {
    "use strict";

    var onDomReady = function () {
        window.game = new Game();
        document.body.appendChild(window.game.renderer.domElement);
        window.game.loadEnvironment(new EnvironmentWorld());
        window.game.start();
    };

    if (document.readyState === 'complete') {
        onDomReady();
    } else {
        document.addEventListener('DOMContentLoaded', onDomReady);
    }

});