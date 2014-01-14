var SETTINGS = this.SETTINGS = {};

SETTINGS.GAME_SERVER = 'http://localhost';

if (typeof module !== 'undefined') {
    module.exports = SETTINGS;
}