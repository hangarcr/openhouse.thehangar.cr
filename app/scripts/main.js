(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _modulesScrollDown = require("./modules/ScrollDown");

var _modulesScrollDown2 = _interopRequireDefault(_modulesScrollDown);

var _modulesShare = require("./modules/Share");

var _modulesShare2 = _interopRequireDefault(_modulesShare);

var _modulesRegistrationForm = require("./modules/RegistrationForm");

var _modulesRegistrationForm2 = _interopRequireDefault(_modulesRegistrationForm);

// jQuery DOM Ready
$(function () {
  'use strict';

  // Polyfill to remove click delays on browsers with touch UIs
  FastClick.attach(document.body);

  // Arrow down animation
  (0, _modulesScrollDown2["default"])();

  // Initialize form funcionality
  new _modulesRegistrationForm2["default"]();
  new _modulesShare2["default"]();
});

},{"./modules/RegistrationForm":2,"./modules/ScrollDown":3,"./modules/Share":4}],2:[function(require,module,exports){
//imports/RegistrationForm .js
'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var RegistrationForm = (function () {
    function RegistrationForm() {
        var debug = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

        _classCallCheck(this, RegistrationForm);

        this.element = document.getElementById('formRegistration');

        this.fullname = this.element.querySelector('#fullname');
        this.email = this.element.querySelector('#email');
        this.phone = this.element.querySelector('#phone');
        this.checkboxList = this.element.querySelector('.mdl-checkbox__input');
    }

    // validate form

    _createClass(RegistrationForm, [{
        key: 'validate',
        value: function validate() {}
    }, {
        key: 'save',
        value: function save() {
            // debugger;
            console.log("Hello, I am ", this); //this == the object instance.
        }
    }]);

    return RegistrationForm;
})();

module.exports = RegistrationForm; //set what can be imported from this file

},{}],3:[function(require,module,exports){
'use strict';

var ScrollDown = function ScrollDown() {

  var animate = function animate(target) {
    $('html, body').animate({
      scrollTop: target.offset().top
    }, 1000);
  };

  $('.js-h-arrow-down').on('click', function (e) {
    e.preventDefault();
    animate($('#intro'));
  });

  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.hash);
    if (target.length) {
      e.preventDefault();
      animate(target);
    }
  });
};

module.exports = ScrollDown;

},{}],4:[function(require,module,exports){
//imports/RegistrationForm .js

'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var title = encodeURIComponent('Discover the plance you want to be in.');
var url = encodeURIComponent('http://openhouse.thehangar.cr/');

var facebookString = 'http://www.facebook.com/sharer.php?s=100&p[url]=' + url;
var googleString = 'https://plus.google.com/share?url=' + url;

var title = "A place of great opportunities  - Join us at the @Hangar_cr #OpenHouse";
var twitterString = 'https://twitter.com/share?text=' + title + '&url=' + url;

var Share = (function () {
  function Share() {
    var debug = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    _classCallCheck(this, Share);

    this.facebook = document.querySelector('#js-social-fb');
    this.twitter = document.querySelector('#js-social-tw');
    this.google = document.querySelector('#js-social-go');

    this.facebook.href = facebookString;
    this.facebook.addEventListener('click', this.clickLink, false);

    this.google.href = googleString;
    this.google.addEventListener('click', this.clickLink, false);

    this.twitter.href = twitterString;
    this.twitter.addEventListener('click', this.clickLink, false);
  }

  _createClass(Share, [{
    key: 'clickLink',
    value: function clickLink(e) {
      window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=620,width=500');
      return false;
    }
  }]);

  return Share;
})();

module.exports = Share; //set what can be imported from this file

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbWFpbi5qcyIsIi9Vc2Vycy9qYWlyb2cvRGV2L3dvcmsvaGFuZ2FyL29wZW5ob3VzZS50aGVoYW5nYXIuY3IvYXBwL2VzNi9tb2R1bGVzL1JlZ2lzdHJhdGlvbkZvcm0uanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbW9kdWxlcy9TY3JvbGxEb3duLmpzIiwiL1VzZXJzL2phaXJvZy9EZXYvd29yay9oYW5nYXIvb3BlbmhvdXNlLnRoZWhhbmdhci5jci9hcHAvZXM2L21vZHVsZXMvU2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7aUNBQ1Usc0JBQXNCOzs7OzRCQUMzQixpQkFBaUI7Ozs7dUNBQ04sNEJBQTRCOzs7OztBQUd6RCxDQUFDLENBQUMsWUFBTTtBQUNOLGNBQVksQ0FBQzs7O0FBR2IsV0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdoQyx1Q0FBWSxDQUFDOzs7QUFHYiw0Q0FBc0IsQ0FBQztBQUN2QixpQ0FBVyxDQUFDO0NBQ2IsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lDakJHLGdCQUFnQjtBQUNQLGFBRFQsZ0JBQWdCLEdBQ1E7WUFBZCxLQUFLLHlEQUFHLEtBQUs7OzhCQUR2QixnQkFBZ0I7O0FBRWhCLFlBQUksQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDOztBQUUzRCxZQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0FBQ3hELFlBQUksQ0FB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OztBQUU3RCxRQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7QUFDbEMsUUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztHQUMvRDs7ZUFkQyxLQUFLOztXQWdCRyxtQkFBQyxDQUFDLEVBQUU7QUFDWixZQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsRUFBRSxFQUFFLHlFQUF5RSxDQUFDLENBQUM7QUFDckcsYUFBTyxLQUFLLENBQUM7S0FDZDs7O1NBbkJDLEtBQUs7OztBQXNCWCxNQUFNLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQyIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCc7XG5pbXBvcnQgU2Nyb2xsRG93biBmcm9tIFwiLi9tb2R1bGVzL1Njcm9sbERvd25cIjtcbmltcG9ydCBTaGFyZSBmcm9tIFwiLi9tb2R1bGVzL1NoYXJlXCI7XG5pbXBvcnQgUmVnaXN0cmF0aW9uRm9ybSBmcm9tIFwiLi9tb2R1bGVzL1JlZ2lzdHJhdGlvbkZvcm1cIjtcblxuLy8galF1ZXJ5IERPTSBSZWFkeVxuJCgoKSA9PiB7XG4gICd1c2Ugc3RyaWN0JztcblxuICAvLyBQb2x5ZmlsbCB0byByZW1vdmUgY2xpY2sgZGVsYXlzIG9uIGJyb3dzZXJzIHdpdGggdG91Y2ggVUlzXG4gIEZhc3RDbGljay5hdHRhY2goZG9jdW1lbnQuYm9keSk7XG5cbiAgLy8gQXJyb3cgZG93biBhbmltYXRpb25cbiAgU2Nyb2xsRG93bigpO1xuXG4gIC8vIEluaXRpYWxpemUgZm9ybSBmdW5jaW9uYWxpdHlcbiAgbmV3IFJlZ2lzdHJhdGlvbkZvcm0oKTtcbiAgbmV3IFNoYXJlKCk7XG59KTtcbiIsIi8vaW1wb3J0cy9SZWdpc3RyYXRpb25Gb3JtIC5qc1xuY2xhc3MgUmVnaXN0cmF0aW9uRm9ybSB7XG4gICAgY29uc3RydWN0b3IoZGVidWcgPSBmYWxzZSl7XG4gICAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybVJlZ2lzdHJhdGlvbicpO1xuXG4gICAgICB0aGlzLmZ1bGxuYW1lID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmdWxsbmFtZScpO1xuICAgICAgdGhpcy5lbWFpbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKTtcbiAgICAgIHRoaXMucGhvbmUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Bob25lJyk7XG4gICAgICB0aGlzLmNoZWNrYm94TGlzdCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRsLWNoZWNrYm94X19pbnB1dCcpO1xuICAgIH1cblxuICAgIC8vIHZhbGlkYXRlIGZvcm1cbiAgICB2YWxpZGF0ZSAoKSB7XG5cbiAgICB9XG5cbiAgICBzYXZlICgpIHtcbiAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8sIEkgYW0gXCIsIHRoaXMpOyAvL3RoaXMgPT0gdGhlIG9iamVjdCBpbnN0YW5jZS5cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVnaXN0cmF0aW9uRm9ybTsgLy9zZXQgd2hhdCBjYW4gYmUgaW1wb3J0ZWQgZnJvbSB0aGlzIGZpbGVcbiIsImxldCBTY3JvbGxEb3duID0gKCkgPT4ge1xuXG4gIHZhciBhbmltYXRlID0gKHRhcmdldCkgPT4ge1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgJCgnLmpzLWgtYXJyb3ctZG93bicpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhbmltYXRlKCQoJyNpbnRybycpKTtcbiAgfSk7XG5cbiAgJCgnYVtocmVmXj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgaWYoIHRhcmdldC5sZW5ndGggKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYW5pbWF0ZSh0YXJnZXQpO1xuICAgIH1cbiAgfSk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxEb3duO1xuIiwiLy9pbXBvcnRzL1JlZ2lzdHJhdGlvbkZvcm0gLmpzXG5cbnZhciB0aXRsZSA9IGVuY29kZVVSSUNvbXBvbmVudCgnRGlzY292ZXIgdGhlIHBsYW5jZSB5b3Ugd2FudCB0byBiZSBpbi4nKTtcbnZhciB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQoJ2h0dHA6Ly9vcGVuaG91c2UudGhlaGFuZ2FyLmNyLycpO1xuXG52YXIgZmFjZWJvb2tTdHJpbmcgPSBgaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyLnBocD9zPTEwMCZwW3VybF09JHt1cmx9YDtcbnZhciBnb29nbGVTdHJpbmcgPSBgaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPSR7dXJsfWA7XG5cbnZhciB0aXRsZSA9IFwiQSBwbGFjZSBvZiBncmVhdCBvcHBvcnR1bml0aWVzICAtIEpvaW4gdXMgYXQgdGhlIEBIYW5nYXJfY3IgI09wZW5Ib3VzZVwiO1xudmFyIHR3aXR0ZXJTdHJpbmcgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZT90ZXh0PSR7dGl0bGV9JnVybD0ke3VybH1gO1xuXG5jbGFzcyBTaGFyZSB7XG4gICAgY29uc3RydWN0b3IoZGVidWcgPSBmYWxzZSkge1xuICAgICAgdGhpcy5mYWNlYm9vayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtZmInKTtcbiAgICAgIHRoaXMudHdpdHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtdHcnKTtcbiAgICAgIHRoaXMuZ29vZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2pzLXNvY2lhbC1nbycpO1xuXG4gICAgICB0aGlzLmZhY2Vib29rLmhyZWYgPSBmYWNlYm9va1N0cmluZztcbiAgICAgIHRoaXMuZmFjZWJvb2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuXG4gICAgICB0aGlzLmdvb2dsZS5ocmVmID0gZ29vZ2xlU3RyaW5nO1xuICAgICAgdGhpcy5nb29nbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuXG4gICAgICB0aGlzLnR3aXR0ZXIuaHJlZiA9IHR3aXR0ZXJTdHJpbmc7XG4gICAgICB0aGlzLnR3aXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuICAgIH1cblxuICAgIGNsaWNrTGluayAoZSkge1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCcnLCAnbWVudWJhcj1ubyx0b29sYmFyPW5vLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMsaGVpZ2h0PTYyMCx3aWR0aD01MDAnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcmU7IC8vc2V0IHdoYXQgY2FuIGJlIGltcG9ydGVkIGZyb20gdGhpcyBmaWxlXG4iXX0=
