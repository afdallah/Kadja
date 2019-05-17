var Kadja = (function () {
    'use strict';

    //
    // Variables
    //

    var defaults = {
        attribute: 'data-mirror',
        newLine: true,
        label: 'Preview text',
        callback: function (text) {
            return text
        }
    }

    /**
     * Setup the constructor
     * @param options
     * @constructor
     */
    var Constructor = function (selector, options) {

        //
        // Variables
        //

        var publicAPIs = {}
        var settings

        //
        // Public methods
        //

        /**
         * Render content to the dom
         * @param {Node} value
         * @param {Node} preview
         */
        publicAPIs.renderInput = function (value, preview) {
            // Get the content
            var content = value
            if (settings.newLine) {
                content = content.replace(/\n|\r/g, '<br />');
            }

            preview.innerHTML = settings.callback(content);
        }

        /**
         * Mirror any text typed in the textarea
         * @param event
         */
        var mirrorIt = function (event) {
            // Check if target have data-mirror attributte
            if (!event.target.matches(selector)) return

            var preview = document.querySelector(event.target.getAttribute(settings.attribute))
            if (!preview) return

            publicAPIs.renderInput(event.target.value, preview)
        }

        /**
         * Destroy the initialized plugin
         */
        publicAPIs.destroy = function () {
            document.querySelector('[' + settings.attribute + ']').value = ''
            document.removeEventListener('input', mirrorIt, false)
            settings = null
        }

        /**
         * Initialize katja
         * @param {object} options
         */
        publicAPIs.init = function (selector, options) {
            // Merge defaults and options into settings
            settings = Object.assign({}, defaults, options)

            // Listen to every input change
            document.addEventListener('input', mirrorIt, false)
        }
        publicAPIs.init(selector, options)

        // Return all public apis
        return publicAPIs;
    }

    // Return the constructor
    return Constructor
})();