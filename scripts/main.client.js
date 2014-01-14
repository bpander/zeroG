requirejs([
    'game/Player'
], function (
    Player
) {
    "use strict";

    var onDomReady = function () {
        window.player = new Player().start();
    };

    document.readyState === 'complete' ? onDomReady() : document.addEventListener('DOMContentLoaded', onDomReady);

});