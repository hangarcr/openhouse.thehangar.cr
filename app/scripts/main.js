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

// Validation Rules
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
  "talks[]": {
    presence: true,
    length: {
      minimum: 1,
      message: "must be at least 1 talk selected"
    }
  },
  phone_number: {
    presence: true,
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
    var _this = this;

    var debug = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

    _classCallCheck(this, RegistrationForm);

    // this.postURL = 'http://openhouse.hangar.agency:@openhouse.hangar.agency/attendees';
    this.postURL = 'http://localhost:3000/registration';

    this.element = document.getElementById('formRegistration');
    this.modal = document.getElementById('openhouse-thanks');

    this.fullname = this.element.querySelector('#fullname');
    this.email = this.element.querySelector('#email');
    this.phone = this.element.querySelector('#phone');
    this.checkboxList = $('.mdl-checkbox__input');

    // Attach submit event
    this.element.addEventListener("submit", function (e) {
      e.preventDefault();
      _this.save();
    });

    // Notification settings
    toastr.options = {
      closeButton: true,
      positionClass: "toast-top-right"
    };
  }

  // validate form

  _createClass(RegistrationForm, [{
    key: "validate",
    value: (function (_validate) {
      function validate() {
        return _validate.apply(this, arguments);
      }

      validate.toString = function () {
        return _validate.toString();
      };

      return validate;
    })(function () {
      var values = validate.collectFormValues(this.element);
      var errors = validate(values, constraints);

      console.log(errors);

      if (errors) {
        this.showErros(errors);
        return false;
      }
      return true;
    })
  }, {
    key: "showErros",
    value: function showErros(errors) {
      var stringErrors = '';
      Object.keys(errors).forEach(function (key) {
        toastr.error(errors[key]);
      });
    }
  }, {
    key: "cleanInputs",
    value: function cleanInputs() {
      this.fullname.value = '';
      this.email.value = '';
      this.phone.value = '';

      this.checkboxList.filter(':checked').removeAttr('checked');
      $('.mdl-js-checkbox').removeClass('is-checked');
    }
  }, {
    key: "errorfn",
    value: function errorfn(error) {
      console.log(error);
    }
  }, {
    key: "save",
    value: function save() {
      var _this2 = this;

      // clean messages
      toastr.clear();

      if (this.validate()) {
        console.log('submit form');

        var data = $(this.element).serializeArray();

        $.post(this.postURL, data).done(function (xhr) {
          $(_this2.modal).modal('show');
          _this2.cleanInputs();
        }).fail(this.errorfn);
      }
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbWFpbi5qcyIsIi9Vc2Vycy9qYWlyb2cvRGV2L3dvcmsvaGFuZ2FyL29wZW5ob3VzZS50aGVoYW5nYXIuY3IvYXBwL2VzNi9tb2R1bGVzL1JlZ2lzdHJhdGlvbkZvcm0uanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbW9kdWxlcy9TY3JvbGxEb3duLmpzIiwiL1VzZXJzL2phaXJvZy9EZXYvd29yay9oYW5nYXIvb3BlbmhvdXNlLnRoZWhhbmdhci5jci9hcHAvZXM2L21vZHVsZXMvU2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7aUNBQ1Usc0JBQXNCOzs7OzRCQUMzQixpQkFBaUI7Ozs7dUNBQ04sNEJBQTRCOzs7OztBQUd6RCxDQUFDLENBQUMsWUFBTTtBQUNOLGNBQVksQ0FBQzs7O0FBR2IsV0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdoQyx1Q0FBWSxDQUFDOzs7QUFHYiw0Q0FBc0IsQ0FBQztBQUN2QixpQ0FBVyxDQUFDO0NBQ2IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNmSCxJQUFJLFdBQVcsR0FBRztBQUNoQixXQUFTLEVBQUU7QUFDVCxZQUFRLEVBQUUsSUFBSTtBQUNkLFVBQU0sRUFBRTtBQUNOLGFBQU8sRUFBRSxDQUFDO0FBQ1YsYUFBTyxFQUFFLCtCQUErQjtLQUN6QztHQUNGO0FBQ0QsT0FBSyxFQUFFO0FBQ0wsWUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSTtBQUMzQixVQUFNLEVBQUU7QUFDTixhQUFPLEVBQUUsQ0FBQztBQUNW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RyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZELFFBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFdEQsUUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO0FBQ3BDLFFBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRS9ELFFBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUNoQyxRQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUU3RCxRQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7QUFDbEMsUUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztHQUMvRDs7ZUFkQyxLQUFLOztXQWdCRyxtQkFBQyxDQUFDLEVBQUU7QUFDWixPQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsWUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBRSx5RUFBeUUsQ0FBQyxDQUFDO0FBQ3JHLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztTQXBCQyxLQUFLOzs7QUF1QlgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IFNjcm9sbERvd24gZnJvbSBcIi4vbW9kdWxlcy9TY3JvbGxEb3duXCI7XG5pbXBvcnQgU2hhcmUgZnJvbSBcIi4vbW9kdWxlcy9TaGFyZVwiO1xuaW1wb3J0IFJlZ2lzdHJhdGlvbkZvcm0gZnJvbSBcIi4vbW9kdWxlcy9SZWdpc3RyYXRpb25Gb3JtXCI7XG5cbi8vIGpRdWVyeSBET00gUmVhZHlcbiQoKCkgPT4ge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gUG9seWZpbGwgdG8gcmVtb3ZlIGNsaWNrIGRlbGF5cyBvbiBicm93c2VycyB3aXRoIHRvdWNoIFVJc1xuICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuXG4gIC8vIEFycm93IGRvd24gYW5pbWF0aW9uXG4gIFNjcm9sbERvd24oKTtcblxuICAvLyBJbml0aWFsaXplIGZvcm0gZnVuY2lvbmFsaXR5XG4gIG5ldyBSZWdpc3RyYXRpb25Gb3JtKCk7XG4gIG5ldyBTaGFyZSgpO1xufSk7XG4iLCIvL2ltcG9ydHMvUmVnaXN0cmF0aW9uRm9ybSAuanNcblxuLy8gVmFsaWRhdGlvbiBSdWxlc1xudmFyIGNvbnN0cmFpbnRzID0ge1xuICBmdWxsX25hbWU6IHtcbiAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIG1pbmltdW06IDIsXG4gICAgICBtZXNzYWdlOiBcIm11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzXCJcbiAgICB9XG4gIH0sXG4gIGVtYWlsOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsIGVtYWlsOiB0cnVlLFxuICAgIGxlbmd0aDoge1xuICAgICAgbWluaW11bTogNCxcbiAgICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBhdCBsZWFzdCA0IGNoYXJhY3RlcnNcIlxuICAgIH1cbiAgfSxcbiAgXCJ0YWxrc1tdXCI6IHtcbiAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIG1pbmltdW06IDEsXG4gICAgICBtZXNzYWdlOiBcIm11c3QgYmUgYXQgbGVhc3QgMSB0YWxrIHNlbGVjdGVkXCJcbiAgICB9XG4gIH0sXG4gIHBob25lX251bWJlcjoge1xuICAgIHByZXNlbmNlOiB0cnVlLFxuICAgIGxlbmd0aDoge1xuICAgICAgbWluaW11bTogNCxcbiAgICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnNcIlxuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBwYXR0ZXJuOiBcIlswLTldK1wiLFxuICAgICAgZmxhZ3M6IFwiaVwiLFxuICAgICAgbWVzc2FnZTogXCJjYW4gb25seSBjb250YWluIDAtOSBudW1iZXJzXCJcbiAgICB9XG4gIH1cbn07XG5cbmNsYXNzIFJlZ2lzdHJhdGlvbkZvcm0ge1xuICBjb25zdHJ1Y3RvcihkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgLy8gdGhpcy5wb3N0VVJMID0gJ2h0dHA6Ly9vcGVuaG91c2UuaGFuZ2FyLmFnZW5jeTpAb3BlbmhvdXNlLmhhbmdhci5hZ2VuY3kvYXR0ZW5kZWVzJztcbiAgICB0aGlzLnBvc3RVUkwgPSAnaHR0cDovL2xvY2FsaG9zdDozMDAwL3JlZ2lzdHJhdGlvbic7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybVJlZ2lzdHJhdGlvbicpO1xuICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbmhvdXNlLXRoYW5rcycpO1xuXG4gICAgdGhpcy5mdWxsbmFtZSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZnVsbG5hbWUnKTtcbiAgICB0aGlzLmVtYWlsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpO1xuICAgIHRoaXMucGhvbmUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Bob25lJyk7XG4gICAgdGhpcy5jaGVja2JveExpc3QgPSAkKCcubWRsLWNoZWNrYm94X19pbnB1dCcpO1xuXG4gICAgLy8gQXR0YWNoIHN1Ym1pdCBldmVudFxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9KTtcblxuICAgIC8vIE5vdGlmaWNhdGlvbiBzZXR0aW5nc1xuICAgIHRvYXN0ci5vcHRpb25zID0ge1xuICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICBwb3NpdGlvbkNsYXNzOiBcInRvYXN0LXRvcC1yaWdodFwiXG4gICAgfVxuXG4gIH1cblxuICAvLyB2YWxpZGF0ZSBmb3JtXG4gIHZhbGlkYXRlICgpIHtcbiAgICB2YXIgdmFsdWVzID0gdmFsaWRhdGUuY29sbGVjdEZvcm1WYWx1ZXModGhpcy5lbGVtZW50KTtcbiAgICB2YXIgZXJyb3JzID0gdmFsaWRhdGUodmFsdWVzLCBjb25zdHJhaW50cyk7XG5cbiAgICBjb25zb2xlLmxvZyhlcnJvcnMpO1xuXG4gICAgaWYgKGVycm9ycykge1xuICAgICAgdGhpcy5zaG93RXJyb3MoZXJyb3JzKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzaG93RXJyb3MgKGVycm9ycykge1xuICAgIGxldCBzdHJpbmdFcnJvcnMgPSAnJztcbiAgICBPYmplY3Qua2V5cyhlcnJvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdG9hc3RyLmVycm9yKGVycm9yc1trZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsZWFuSW5wdXRzICgpIHtcbiAgICB0aGlzLmZ1bGxuYW1lLnZhbHVlID0gJyc7XG4gICAgdGhpcy5lbWFpbC52YWx1ZSA9ICcnO1xuICAgIHRoaXMucGhvbmUudmFsdWUgPSAnJztcblxuICAgIHRoaXMuY2hlY2tib3hMaXN0LmZpbHRlcignOmNoZWNrZWQnKS5yZW1vdmVBdHRyKCdjaGVja2VkJyk7XG4gICAgJCgnLm1kbC1qcy1jaGVja2JveCcpLnJlbW92ZUNsYXNzKCdpcy1jaGVja2VkJyk7XG4gIH1cbiAgZXJyb3JmbiAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmxvZyhlcnJvcik7XG4gIH1cblxuICBzYXZlICgpIHtcbiAgICAvLyBjbGVhbiBtZXNzYWdlc1xuICAgIHRvYXN0ci5jbGVhcigpO1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdGUoKSkge1xuICAgICAgY29uc29sZS5sb2coJ3N1Ym1pdCBmb3JtJyk7XG5cbiAgICAgIHZhciBkYXRhID0gICQoIHRoaXMuZWxlbWVudCApLnNlcmlhbGl6ZUFycmF5KCk7XG5cbiAgICAgICQucG9zdCh0aGlzLnBvc3RVUkwsIGRhdGEpLmRvbmUoKHhocik9PiB7XG4gICAgICAgICQodGhpcy5tb2RhbCkubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgdGhpcy5jbGVhbklucHV0cygpO1xuICAgICAgfSkuZmFpbCh0aGlzLmVycm9yZm4pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZ2lzdHJhdGlvbkZvcm07IC8vc2V0IHdoYXQgY2FuIGJlIGltcG9ydGVkIGZyb20gdGhpcyBmaWxlXG4iLCJ2YXIgU2Nyb2xsRG93biA9ICgpID0+IHtcblxuICB2YXIgYW5pbWF0ZSA9ICh0YXJnZXQpID0+IHtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gICQoJy5qcy1oLWFycm93LWRvd24nKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYW5pbWF0ZSgkKCcjaW50cm8nKSk7XG4gIH0pO1xuXG4gICQoJ2FbaHJlZl49XCIjXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICBkZWJ1Z2dlcjtcbiAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgIGlmKCB0YXJnZXQubGVuZ3RoID4gMCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFuaW1hdGUodGFyZ2V0KTtcbiAgICB9XG4gIH0pO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsRG93bjtcbiIsIi8vaW1wb3J0cy9SZWdpc3RyYXRpb25Gb3JtIC5qc1xuXG52YXIgZW52X3VybCA9ICdodHRwOi8vb3BlbmhvdXNlLnRoZWhhbmdhci5jci8nO1xuXG5pZiAod2luZG93Ll9fZW52KSB7XG4gIGVudl91cmwgPSB3aW5kb3cuX19lbnYudXJsO1xufVxuXG52YXIgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGVudl91cmwpO1xuXG52YXIgZmFjZWJvb2tTdHJpbmcgPSBgaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyLnBocD9zPTEwMCZwW3VybF09JHt1cmx9YDtcbnZhciBnb29nbGVTdHJpbmcgPSBgaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPSR7dXJsfWA7XG5cbnZhciB0aXRsZSA9ICBlbmNvZGVVUklDb21wb25lbnQoJ0EgcGxhY2Ugb2YgZ3JlYXQgb3Bwb3J0dW5pdGllcyAgLSBKb2luIHVzIGF0IHRoZSBASGFuZ2FyX2NyICNPcGVuSG91c2UnKTtcbnZhciB0d2l0dGVyU3RyaW5nID0gYGh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dGV4dD0ke3RpdGxlfSZ1cmw9JHt1cmx9YDtcblxuY2xhc3MgU2hhcmUge1xuICAgIGNvbnN0cnVjdG9yKGRlYnVnID0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZmFjZWJvb2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjanMtc29jaWFsLWZiJyk7XG4gICAgICB0aGlzLnR3aXR0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjanMtc29jaWFsLXR3Jyk7XG4gICAgICB0aGlzLmdvb2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtZ28nKTtcblxuICAgICAgdGhpcy5mYWNlYm9vay5ocmVmID0gZmFjZWJvb2tTdHJpbmc7XG4gICAgICB0aGlzLmZhY2Vib29rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpbmssIGZhbHNlKTtcblxuICAgICAgdGhpcy5nb29nbGUuaHJlZiA9IGdvb2dsZVN0cmluZztcbiAgICAgIHRoaXMuZ29vZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpbmssIGZhbHNlKTtcblxuICAgICAgdGhpcy50d2l0dGVyLmhyZWYgPSB0d2l0dGVyU3RyaW5nO1xuICAgICAgdGhpcy50d2l0dGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpbmssIGZhbHNlKTtcbiAgICB9XG5cbiAgICBjbGlja0xpbmsgKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5vcGVuKHRoaXMuaHJlZiwnJywgJ21lbnViYXI9bm8sdG9vbGJhcj1ubyxyZXNpemFibGU9eWVzLHNjcm9sbGJhcnM9eWVzLGhlaWdodD02MjAsd2lkdGg9NTAwJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXJlOyAvL3NldCB3aGF0IGNhbiBiZSBpbXBvcnRlZCBmcm9tIHRoaXMgZmlsZVxuIl19
