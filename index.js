/**
 * Module dependencies
 */
var domify = require('domify'),
    classes = require('classlist'),
	prefix = (function() {
	    var styles = window.getComputedStyle(document.documentElement, ''),
	        pre = (Array.prototype.slice
	            .call(styles)
	            .join('')
	            .match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
	        )[1],
	        dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
	    return {
	        dom: dom,
	        lowercase: pre,
	        css: '-' + pre + '-',
	        js: pre[0].toUpperCase() + pre.substr(1)
	    };
})();

/**
 * Expose `BetterMinimalCounter`
 */
module.exports = BetterMinimalCounter;

function BetterMinimalCounter(value, stagger) {
    var self = this;

    this.el = domify('<div class="better-minimal-counter"/>');
    this.value = value || 100;
    this.stagger = stagger || 50;
    this.value.toString().split('').forEach(self.addCharacter.bind(this));
    this.update(this.value);
}

BetterMinimalCounter.prototype.setStagger = function(stagger) {
    this.stagger = stagger;
};

BetterMinimalCounter.prototype.addCharacter = function() {
    var digit = domify('<div class="character"/>'),
        sequence = domify('<div class="sequence is-hidden">' + [9, 8, 7, 6, 5, 4, 3, 2, 1, 0].join('\n') + '</div>');

    sequence.style[prefix.js + 'TransitionDelay'] = (this.el.children.length * this.stagger).toString() + 'ms';
    digit.appendChild(sequence);
    this.el.appendChild(digit);
};

BetterMinimalCounter.prototype.update = function(number) {
    var numberWithSpaces = function(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    };

    var self = this,
        characters = numberWithSpaces(number).split('').reverse(),
        digitElements = this.el.children,
        diff = digitElements.length - characters.length;

    if (diff < 0) {
        while (diff++) this.addCharacter();
        digitElements = this.el.children;
    } else {
        while (diff--) characters.push(-1);
    }

    for (var index = 0; index < characters.length; index += 1) {
        var character = characters[index],
            shift = -(9 - parseInt(character, 10)) * 10,
            elIndex = digitElements.length - index - 1,
            element = digitElements[elIndex].children[0];

        if (character === ' ') {
            classes(digitElements[elIndex]).add('is-space');
        } else {
            classes(digitElements[elIndex]).remove('is-space');
            character = parseInt(character, 10);
        }

        if (character === -1) {
            classes(element).add('is-hidden');
        } else {
            classes(element).remove('is-hidden');
            element.style[prefix.js + 'Transform'] = 'translate(0, ' + shift + '%)';
        }
    }
};