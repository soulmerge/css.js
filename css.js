define([], function() {

    "use strict";

    return {

        /**
         * Returns the css classes of a DOM node as an array.
         */
        classes: function cssClasses(node) {
            if (typeof node.getAttribute !== 'function') {
                throw new Error('Argument is not a DOM Node');
            }
            var classes = node.getAttribute('class');
            if (!classes) {
                return [];
            }
            return classes.split(' ');
        },

        /**
         * Adds given css class[es] to given DOM node.
         * Class names can either be
         * - a string containing one or more class names separated by space, or
         * - an array containing single class names.
         */
        addClass: function addCssClass(node, cls) {
            if (typeof node.getAttribute !== 'function') {
                throw new Error('Argument is not a DOM Node');
            }
            var classes = node.getAttribute('class');
            if (!classes) {
                if (cls instanceof Array) {
                    cls = cls.join(' ');
                }
                node.setAttribute('class', cls);
                return;
            }
            if (!(cls instanceof Array)) {
                cls = cls.split(/\s+/);
            }
            for (var i = 0; i < cls.length; i++) {
                var re = new RegExp('(^|\\s+)(' + cls[i] + ')(\\s+|$)');
                if (classes.match(re)) {
                    cls.splice(i--, 1);
                }
            }
            if (!cls.length) {
                return;
            }
            node.setAttribute('class', classes + ' ' + cls.join(' '));
        },

        /**
         * Tests whether given DOM node has given css class[es].
         * Class names can either be
         * - a string containing one or more class names separated by space, or
         * - an array containing single class names.
         */
        hasClass: function hasCssClass(node, cls) {
            if (typeof node.getAttribute !== 'function') {
                throw new Error('Argument is not a DOM Node');
            }
            var re, attr = node.getAttribute('class');
            if (!attr) {
                return false;
            }
            if (cls instanceof Array) {
                re = new RegExp('(^|\\s+)(' + cls.join('|') + ')(\\s+|$)');
            } else {
                re = new RegExp('(^|\\s+)(' + cls + ')(\\s+|$)');
            }
            return attr.match(re);
        },

        /**
         * Removes given css class[es] from given DOM node.
         * Class names can either be
         * - a string containing one or more class names separated by space, or
         * - an array containing single class names.
         */
        removeClass: function removeCssClass(node, cls) {
            if (typeof node.getAttribute !== 'function') {
                throw new Error('Argument is not a DOM Node');
            }
            var classes = node.getAttribute('class');
            var initialClasses = classes;
            if (!classes) {
                return;
            }
            if (!(cls instanceof Array)) {
                cls = cls.split(/\s+/);
            }
            var re = new RegExp('(^|\\s+)(' + cls.join('|') + ')(\\s+|$)');
            var replaced = classes;
            do {
                classes = replaced;
                replaced = classes.replace(re, '$3');
            } while (classes != replaced);
            if (classes === initialClasses) {
                return;
            }
            node.setAttribute('class', replaced);
        }

    };

});
