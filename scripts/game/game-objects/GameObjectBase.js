define(function (require) {
    "use strict";

    function GameObject () {

        this.mesh = null;

    };

    GameObject.prototype.add = function () {
        throw new Error('No add function implemented');
    };


    return GameObject;
});