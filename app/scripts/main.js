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

"use strict";

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var constraints = {
  full_name: {
    presence: true,
    length: {
      minimum: 2,
      message: "must be at least 2 characters"
    }
  },
  email: {
    presence: true, email: true,
    length: {
      minimum: 4,
      message: "must be at least 4 characters"
    }
  },
  phone_number: {
    presence: true, email: true,
    length: {
      minimum: 4,
      message: "must be at least 8 characters"
    },
    format: {
      pattern: "[0-9]+",
      flags: "i",
      message: "can only contain 0-9 numbers"
    }
  }
};

var RegistrationForm = (function () {
  function RegistrationForm() {
    var debug = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    _classCallCheck(this, RegistrationForm);

    this.element = document.getElementById('formRegistration');
    this.modal = document.getElementById('openhouse-thanks');

    this.fullname = this.element.querySelector('#fullname');
    this.email = this.element.querySelector('#email');
    this.phone = this.element.querySelector('#phone');
    this.checkboxList = this.element.querySelector('.mdl-checkbox__input');
  }

  // validate form

  _createClass(RegistrationForm, [{
    key: "validate",
    value: function validate() {}
  }, {
    key: "save",
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

var env_url = 'http://openhouse.thehangar.cr/';

if (window.__env) {
  env_url = window.__env.url;
}

var title = encodeURIComponent('Discover the plance you want to be in.');
var url = encodeURIComponent(env_url);

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbWFpbi5qcyIsIi9Vc2Vycy9qYWlyb2cvRGV2L3dvcmsvaGFuZ2FyL29wZW5ob3VzZS50aGVoYW5nYXIuY3IvYXBwL2VzNi9tb2R1bGVzL1JlZ2lzdHJhdGlvbkZvcm0uanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbW9kdWxlcy9TY3JvbGxEb3duLmpzIiwiL1VzZXJzL2phaXJvZy9EZXYvd29yay9oYW5nYXIvb3BlbmhvdXNlLnRoZWhhbmdhci5jci9hcHAvZXM2L21vZHVsZXMvU2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7aUNBQ1Usc0JBQXNCOzs7OzRCQUMzQixpQkFBaUI7Ozs7dUNBQ04sNEJBQTRCOzs7OztBQUd6RCxDQUFDLENBQUMsWUFBTTtBQUNOLGNBQVksQ0FBQzs7O0FBR2IsV0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdoQyx1Q0FBWSxDQUFDOzs7QUFHYiw0Q0FBc0IsQ0FBQztBQUN2QixpQ0FBVyxDQUFDO0NBQ2IsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQ2hCSCxJQUFJLFdBQVcsR0FBRztBQUNoQixXQUFTLEVBQUU7QUFDVCxZQUFRLEVBQUUsSUFBSTtBQUNkLFVBQU0sRUFBRTtBQUNOLGFBQU8sRUFBRSxDQUFDO0FBQ1YsYUFBTyxFQUFFLCtCQUErQjtLQUN6QztHQUNGO0FBQ0QsT0FBSyxFQUFFO0FBQ0wsWUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSTtBQUMzQixVQUFNLEVBQUU7QUFDTixhQUFPLEVBQUUsQ0FBQztBQUNW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QUssQ0FBQztLQUNkOzs7U0FuQkMsS0FBSzs7O0FBc0JYLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTY3JvbGxEb3duIGZyb20gXCIuL21vZHVsZXMvU2Nyb2xsRG93blwiO1xuaW1wb3J0IFNoYXJlIGZyb20gXCIuL21vZHVsZXMvU2hhcmVcIjtcbmltcG9ydCBSZWdpc3RyYXRpb25Gb3JtIGZyb20gXCIuL21vZHVsZXMvUmVnaXN0cmF0aW9uRm9ybVwiO1xuXG4vLyBqUXVlcnkgRE9NIFJlYWR5XG4kKCgpID0+IHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFBvbHlmaWxsIHRvIHJlbW92ZSBjbGljayBkZWxheXMgb24gYnJvd3NlcnMgd2l0aCB0b3VjaCBVSXNcbiAgRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KTtcblxuICAvLyBBcnJvdyBkb3duIGFuaW1hdGlvblxuICBTY3JvbGxEb3duKCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBmb3JtIGZ1bmNpb25hbGl0eVxuICBuZXcgUmVnaXN0cmF0aW9uRm9ybSgpO1xuICBuZXcgU2hhcmUoKTtcbn0pO1xuIiwiLy9pbXBvcnRzL1JlZ2lzdHJhdGlvbkZvcm0gLmpzXG5cbnZhciBjb25zdHJhaW50cyA9IHtcbiAgZnVsbF9uYW1lOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsXG4gICAgbGVuZ3RoOiB7XG4gICAgICBtaW5pbXVtOiAyLFxuICAgICAgbWVzc2FnZTogXCJtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVyc1wiXG4gICAgfVxuICB9LFxuICBlbWFpbDoge1xuICAgIHByZXNlbmNlOiB0cnVlLCBlbWFpbDogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIG1pbmltdW06IDQsXG4gICAgICBtZXNzYWdlOiBcIm11c3QgYmUgYXQgbGVhc3QgNCBjaGFyYWN0ZXJzXCJcbiAgICB9XG4gIH0sXG4gIHBob25lX251bWJlcjoge1xuICAgIHByZXNlbmNlOiB0cnVlLCBlbWFpbDogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIG1pbmltdW06IDQsXG4gICAgICBtZXNzYWdlOiBcIm11c3QgYmUgYXQgbGVhc3QgOCBjaGFyYWN0ZXJzXCJcbiAgICB9LFxuICAgIGZvcm1hdDoge1xuICAgICAgcGF0dGVybjogXCJbMC05XStcIixcbiAgICAgIGZsYWdzOiBcImlcIixcbiAgICAgIG1lc3NhZ2U6IFwiY2FuIG9ubHkgY29udGFpbiAwLTkgbnVtYmVyc1wiXG4gICAgfVxuICB9XG59O1xuXG5jbGFzcyBSZWdpc3RyYXRpb25Gb3JtIHtcbiAgICBjb25zdHJ1Y3RvcihkZWJ1ZyA9IGZhbHNlKXtcbiAgICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtUmVnaXN0cmF0aW9uJyk7XG4gICAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5ob3VzZS10aGFua3MnKTtcblxuICAgICAgdGhpcy5mdWxsbmFtZSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZnVsbG5hbWUnKTtcbiAgICAgIHRoaXMuZW1haWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJyk7XG4gICAgICB0aGlzLnBob25lID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwaG9uZScpO1xuICAgICAgdGhpcy5jaGVja2JveExpc3QgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignLm1kbC1jaGVja2JveF9faW5wdXQnKTtcbiAgICB9XG5cbiAgICAvLyB2YWxpZGF0ZSBmb3JtXG4gICAgdmFsaWRhdGUgKCkge1xuXG4gICAgfVxuXG4gICAgc2F2ZSAoKSB7XG4gICAgICAgIC8vIGRlYnVnZ2VyO1xuICAgICAgICBjb25zb2xlLmxvZyhcIkhlbGxvLCBJIGFtIFwiLCB0aGlzKTsgLy90aGlzID09IHRoZSBvYmplY3QgaW5zdGFuY2UuXG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZ2lzdHJhdGlvbkZvcm07IC8vc2V0IHdoYXQgY2FuIGJlIGltcG9ydGVkIGZyb20gdGhpcyBmaWxlXG4iLCJ2YXIgU2Nyb2xsRG93biA9ICgpID0+IHtcblxuICB2YXIgYW5pbWF0ZSA9ICh0YXJnZXQpID0+IHtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gICQoJy5qcy1oLWFycm93LWRvd24nKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYW5pbWF0ZSgkKCcjaW50cm8nKSk7XG4gIH0pO1xuXG4gICQoJ2FbaHJlZl49XCIjXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgIGlmKCB0YXJnZXQubGVuZ3RoICkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFuaW1hdGUodGFyZ2V0KTtcbiAgICB9XG4gIH0pO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsRG93bjtcbiIsIi8vaW1wb3J0cy9SZWdpc3RyYXRpb25Gb3JtIC5qc1xuXG52YXIgZW52X3VybCA9ICdodHRwOi8vb3BlbmhvdXNlLnRoZWhhbmdhci5jci8nO1xuXG5pZiAod2luZG93Ll9fZW52KSB7XG4gIGVudl91cmwgPSB3aW5kb3cuX19lbnYudXJsO1xufVxuXG52YXIgdGl0bGUgPSBlbmNvZGVVUklDb21wb25lbnQoJ0Rpc2NvdmVyIHRoZSBwbGFuY2UgeW91IHdhbnQgdG8gYmUgaW4uJyk7XG52YXIgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGVudl91cmwpO1xuXG52YXIgZmFjZWJvb2tTdHJpbmcgPSBgaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyLnBocD9zPTEwMCZwW3VybF09JHt1cmx9YDtcbnZhciBnb29nbGVTdHJpbmcgPSBgaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPSR7dXJsfWA7XG5cbnZhciB0aXRsZSA9IFwiQSBwbGFjZSBvZiBncmVhdCBvcHBvcnR1bml0aWVzICAtIEpvaW4gdXMgYXQgdGhlIEBIYW5nYXJfY3IgI09wZW5Ib3VzZVwiO1xudmFyIHR3aXR0ZXJTdHJpbmcgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZT90ZXh0PSR7dGl0bGV9JnVybD0ke3VybH1gO1xuXG5jbGFzcyBTaGFyZSB7XG4gICAgY29uc3RydWN0b3IoZGVidWcgPSBmYWxzZSkge1xuICAgICAgdGhpcy5mYWNlYm9vayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtZmInKTtcbiAgICAgIHRoaXMudHdpdHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtdHcnKTtcbiAgICAgIHRoaXMuZ29vZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2pzLXNvY2lhbC1nbycpO1xuXG4gICAgICB0aGlzLmZhY2Vib29rLmhyZWYgPSBmYWNlYm9va1N0cmluZztcbiAgICAgIHRoaXMuZmFjZWJvb2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuXG4gICAgICB0aGlzLmdvb2dsZS5ocmVmID0gZ29vZ2xlU3RyaW5nO1xuICAgICAgdGhpcy5nb29nbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuXG4gICAgICB0aGlzLnR3aXR0ZXIuaHJlZiA9IHR3aXR0ZXJTdHJpbmc7XG4gICAgICB0aGlzLnR3aXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuICAgIH1cblxuICAgIGNsaWNrTGluayAoZSkge1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCcnLCAnbWVudWJhcj1ubyx0b29sYmFyPW5vLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMsaGVpZ2h0PTYyMCx3aWR0aD01MDAnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcmU7IC8vc2V0IHdoYXQgY2FuIGJlIGltcG9ydGVkIGZyb20gdGhpcyBmaWxlXG4iXX0=
