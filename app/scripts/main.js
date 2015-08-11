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
    debugger;
    var target = $(this.hash);
    if (target.length > 0) {
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

var url = encodeURIComponent(env_url);

var facebookString = 'http://www.facebook.com/sharer.php?s=100&p[url]=' + url;
var googleString = 'https://plus.google.com/share?url=' + url;

var title = encodeURIComponent('A place of great opportunities  - Join us at the @Hangar_cr #OpenHouse');
var twitterString = 'https://twitter.com/share?text=' + title + '&url=' + url;
console.log(twitterString);

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
      e.preventDefault();
      window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=620,width=500');
      return false;
    }
  }]);

  return Share;
})();

module.exports = Share; //set what can be imported from this file

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbWFpbi5qcyIsIi9Vc2Vycy9qYWlyb2cvRGV2L3dvcmsvaGFuZ2FyL29wZW5ob3VzZS50aGVoYW5nYXIuY3IvYXBwL2VzNi9tb2R1bGVzL1JlZ2lzdHJhdGlvbkZvcm0uanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbW9kdWxlcy9TY3JvbGxEb3duLmpzIiwiL1VzZXJzL2phaXJvZy9EZXYvd29yay9oYW5nYXIvb3BlbmhvdXNlLnRoZWhhbmdhci5jci9hcHAvZXM2L21vZHVsZXMvU2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7aUNBQ1Usc0JBQXNCOzs7OzRCQUMzQixpQkFBaUI7Ozs7dUNBQ04sNEJBQTRCOzs7OztBQUd6RCxDQUFDLENBQUMsWUFBTTtBQUNOLGNBQVksQ0FBQzs7O0FBR2IsV0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdoQyx1Q0FBWSxDQUFDOzs7QUFHYiw0Q0FBc0IsQ0FBQztBQUN2QixpQ0FBVyxDQUFDO0NBQ2IsQ0FBQyxDQUFDOzs7Ozs7Ozs7OztBQ2hCSCxJQUFJLFdBQVcsR0FBRztBQUNoQixXQUFTLEVBQUU7QUFDVCxZQUFRLEVBQUUsSUFBSTtBQUNkLFVBQU0sRUFBRTtBQUNOLGFBQU8sRUFBRSxDQUFDO0FBQ1YsYUFBTyxFQUFFLCtCQUErQjtLQUN6QztHQUNGO0FBQ0QsT0FBSyxFQUFFO0FBQ0wsWUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSTtBQUMzQixVQUFNLEVBQUU7QUFDTixhQUFPLEVBQUUsQ0FBQztBQUNW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QUFJLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBRSx5RUFBeUUsQ0FBQyxDQUFDO0FBQ3JHLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztTQXBCQyxLQUFLOzs7QUF1QlgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IFNjcm9sbERvd24gZnJvbSBcIi4vbW9kdWxlcy9TY3JvbGxEb3duXCI7XG5pbXBvcnQgU2hhcmUgZnJvbSBcIi4vbW9kdWxlcy9TaGFyZVwiO1xuaW1wb3J0IFJlZ2lzdHJhdGlvbkZvcm0gZnJvbSBcIi4vbW9kdWxlcy9SZWdpc3RyYXRpb25Gb3JtXCI7XG5cbi8vIGpRdWVyeSBET00gUmVhZHlcbiQoKCkgPT4ge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gUG9seWZpbGwgdG8gcmVtb3ZlIGNsaWNrIGRlbGF5cyBvbiBicm93c2VycyB3aXRoIHRvdWNoIFVJc1xuICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuXG4gIC8vIEFycm93IGRvd24gYW5pbWF0aW9uXG4gIFNjcm9sbERvd24oKTtcblxuICAvLyBJbml0aWFsaXplIGZvcm0gZnVuY2lvbmFsaXR5XG4gIG5ldyBSZWdpc3RyYXRpb25Gb3JtKCk7XG4gIG5ldyBTaGFyZSgpO1xufSk7XG4iLCIvL2ltcG9ydHMvUmVnaXN0cmF0aW9uRm9ybSAuanNcblxudmFyIGNvbnN0cmFpbnRzID0ge1xuICBmdWxsX25hbWU6IHtcbiAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIG1pbmltdW06IDIsXG4gICAgICBtZXNzYWdlOiBcIm11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzXCJcbiAgICB9XG4gIH0sXG4gIGVtYWlsOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsIGVtYWlsOiB0cnVlLFxuICAgIGxlbmd0aDoge1xuICAgICAgbWluaW11bTogNCxcbiAgICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBhdCBsZWFzdCA0IGNoYXJhY3RlcnNcIlxuICAgIH1cbiAgfSxcbiAgcGhvbmVfbnVtYmVyOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsIGVtYWlsOiB0cnVlLFxuICAgIGxlbmd0aDoge1xuICAgICAgbWluaW11bTogNCxcbiAgICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnNcIlxuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBwYXR0ZXJuOiBcIlswLTldK1wiLFxuICAgICAgZmxhZ3M6IFwiaVwiLFxuICAgICAgbWVzc2FnZTogXCJjYW4gb25seSBjb250YWluIDAtOSBudW1iZXJzXCJcbiAgICB9XG4gIH1cbn07XG5cbmNsYXNzIFJlZ2lzdHJhdGlvbkZvcm0ge1xuICAgIGNvbnN0cnVjdG9yKGRlYnVnID0gZmFsc2Upe1xuICAgICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1SZWdpc3RyYXRpb24nKTtcbiAgICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbmhvdXNlLXRoYW5rcycpO1xuXG4gICAgICB0aGlzLmZ1bGxuYW1lID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmdWxsbmFtZScpO1xuICAgICAgdGhpcy5lbWFpbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKTtcbiAgICAgIHRoaXMucGhvbmUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Bob25lJyk7XG4gICAgICB0aGlzLmNoZWNrYm94TGlzdCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcubWRsLWNoZWNrYm94X19pbnB1dCcpO1xuICAgIH1cblxuICAgIC8vIHZhbGlkYXRlIGZvcm1cbiAgICB2YWxpZGF0ZSAoKSB7XG5cbiAgICB9XG5cbiAgICBzYXZlICgpIHtcbiAgICAgICAgLy8gZGVidWdnZXI7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiSGVsbG8sIEkgYW0gXCIsIHRoaXMpOyAvL3RoaXMgPT0gdGhlIG9iamVjdCBpbnN0YW5jZS5cbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVnaXN0cmF0aW9uRm9ybTsgLy9zZXQgd2hhdCBjYW4gYmUgaW1wb3J0ZWQgZnJvbSB0aGlzIGZpbGVcbiIsInZhciBTY3JvbGxEb3duID0gKCkgPT4ge1xuXG4gIHZhciBhbmltYXRlID0gKHRhcmdldCkgPT4ge1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgJCgnLmpzLWgtYXJyb3ctZG93bicpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhbmltYXRlKCQoJyNpbnRybycpKTtcbiAgfSk7XG5cbiAgJCgnYVtocmVmXj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGRlYnVnZ2VyO1xuICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgaWYoIHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYW5pbWF0ZSh0YXJnZXQpO1xuICAgIH1cbiAgfSk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxEb3duO1xuIiwiLy9pbXBvcnRzL1JlZ2lzdHJhdGlvbkZvcm0gLmpzXG5cbnZhciBlbnZfdXJsID0gJ2h0dHA6Ly9vcGVuaG91c2UudGhlaGFuZ2FyLmNyLyc7XG5cbmlmICh3aW5kb3cuX19lbnYpIHtcbiAgZW52X3VybCA9IHdpbmRvdy5fX2Vudi51cmw7XG59XG5cbnZhciB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQoZW52X3VybCk7XG5cbnZhciBmYWNlYm9va1N0cmluZyA9IGBodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIucGhwP3M9MTAwJnBbdXJsXT0ke3VybH1gO1xudmFyIGdvb2dsZVN0cmluZyA9IGBodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JHt1cmx9YDtcblxudmFyIHRpdGxlID0gIGVuY29kZVVSSUNvbXBvbmVudCgnQSBwbGFjZSBvZiBncmVhdCBvcHBvcnR1bml0aWVzICAtIEpvaW4gdXMgYXQgdGhlIEBIYW5nYXJfY3IgI09wZW5Ib3VzZScpO1xudmFyIHR3aXR0ZXJTdHJpbmcgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZT90ZXh0PSR7dGl0bGV9JnVybD0ke3VybH1gO1xuY29uc29sZS5sb2codHdpdHRlclN0cmluZyk7XG5cbmNsYXNzIFNoYXJlIHtcbiAgICBjb25zdHJ1Y3RvcihkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgICB0aGlzLmZhY2Vib29rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2pzLXNvY2lhbC1mYicpO1xuICAgICAgdGhpcy50d2l0dGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2pzLXNvY2lhbC10dycpO1xuICAgICAgdGhpcy5nb29nbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjanMtc29jaWFsLWdvJyk7XG5cbiAgICAgIHRoaXMuZmFjZWJvb2suaHJlZiA9IGZhY2Vib29rU3RyaW5nO1xuICAgICAgdGhpcy5mYWNlYm9vay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaW5rLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuZ29vZ2xlLmhyZWYgPSBnb29nbGVTdHJpbmc7XG4gICAgICB0aGlzLmdvb2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaW5rLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMudHdpdHRlci5ocmVmID0gdHdpdHRlclN0cmluZztcbiAgICAgIHRoaXMudHdpdHRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaW5rLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY2xpY2tMaW5rIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cub3Blbih0aGlzLmhyZWYsJycsICdtZW51YmFyPW5vLHRvb2xiYXI9bm8scmVzaXphYmxlPXllcyxzY3JvbGxiYXJzPXllcyxoZWlnaHQ9NjIwLHdpZHRoPTUwMCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaGFyZTsgLy9zZXQgd2hhdCBjYW4gYmUgaW1wb3J0ZWQgZnJvbSB0aGlzIGZpbGVcbiJdfQ==
