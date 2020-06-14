window.Popper = require('popper.js').default;
window.$ = window.jQuery = require('jquery');
try {
    require('bootstrap')
    require('fomantic-ui')
} catch (e) {}