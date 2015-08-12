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

    this.postURL = 'http://openhouse.hangar.agency/attendees';
    // this.postURL = 'http://localhost:3000/registration';

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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbWFpbi5qcyIsIi9Vc2Vycy9qYWlyb2cvRGV2L3dvcmsvaGFuZ2FyL29wZW5ob3VzZS50aGVoYW5nYXIuY3IvYXBwL2VzNi9tb2R1bGVzL1JlZ2lzdHJhdGlvbkZvcm0uanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbW9kdWxlcy9TY3JvbGxEb3duLmpzIiwiL1VzZXJzL2phaXJvZy9EZXYvd29yay9oYW5nYXIvb3BlbmhvdXNlLnRoZWhhbmdhci5jci9hcHAvZXM2L21vZHVsZXMvU2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7aUNBQ1Usc0JBQXNCOzs7OzRCQUMzQixpQkFBaUI7Ozs7dUNBQ04sNEJBQTRCOzs7OztBQUd6RCxDQUFDLENBQUMsWUFBTTtBQUNOLGNBQVksQ0FBQzs7O0FBR2IsV0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdoQyx1Q0FBWSxDQUFDOzs7QUFHYiw0Q0FBc0IsQ0FBQztBQUN2QixpQ0FBVyxDQUFDO0NBQ2IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNmSCxJQUFJLFdBQVcsR0FBRztBQUNoQixXQUFTLEVBQUU7QUFDVCxZQUFRLEVBQUUsSUFBSTtBQUNkLFVBQU0sRUFBRTtBQUNOLGFBQU8sRUFBRSxDQUFDO0FBQ1YsYUFBTyxFQUFFLCtCQUErQjtLQUN6QztHQUNGO0FBQ0QsT0FBSyxFQUFFO0FBQ0wsWUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSTtBQUMzQixVQUFNLEVBQUU7QUFDTixhQUFPLEVBQUUsQ0FBQztBQUNW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RyxRQUFRLENBQUMsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3ZELFFBQUksQ0FBQyxNQUFNLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQzs7QUFFdEQsUUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsY0FBYyxDQUFDO0FBQ3BDLFFBQUksQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUM7O0FBRS9ELFFBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUNoQyxRQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDOztBQUU3RCxRQUFJLENBQUMsT0FBTyxDQUFDLElBQUksR0FBRyxhQUFhLENBQUM7QUFDbEMsUUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsRUFBRSxLQUFLLENBQUMsQ0FBQztHQUMvRDs7ZUFkQyxLQUFLOztXQWdCRyxtQkFBQyxDQUFDLEVBQUU7QUFDWixPQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsWUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBRSx5RUFBeUUsQ0FBQyxDQUFDO0FBQ3JHLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztTQXBCQyxLQUFLOzs7QUF1QlgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IFNjcm9sbERvd24gZnJvbSBcIi4vbW9kdWxlcy9TY3JvbGxEb3duXCI7XG5pbXBvcnQgU2hhcmUgZnJvbSBcIi4vbW9kdWxlcy9TaGFyZVwiO1xuaW1wb3J0IFJlZ2lzdHJhdGlvbkZvcm0gZnJvbSBcIi4vbW9kdWxlcy9SZWdpc3RyYXRpb25Gb3JtXCI7XG5cbi8vIGpRdWVyeSBET00gUmVhZHlcbiQoKCkgPT4ge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gUG9seWZpbGwgdG8gcmVtb3ZlIGNsaWNrIGRlbGF5cyBvbiBicm93c2VycyB3aXRoIHRvdWNoIFVJc1xuICBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuXG4gIC8vIEFycm93IGRvd24gYW5pbWF0aW9uXG4gIFNjcm9sbERvd24oKTtcblxuICAvLyBJbml0aWFsaXplIGZvcm0gZnVuY2lvbmFsaXR5XG4gIG5ldyBSZWdpc3RyYXRpb25Gb3JtKCk7XG4gIG5ldyBTaGFyZSgpO1xufSk7XG4iLCIvL2ltcG9ydHMvUmVnaXN0cmF0aW9uRm9ybSAuanNcblxuLy8gVmFsaWRhdGlvbiBSdWxlc1xudmFyIGNvbnN0cmFpbnRzID0ge1xuICBmdWxsX25hbWU6IHtcbiAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIG1pbmltdW06IDIsXG4gICAgICBtZXNzYWdlOiBcIm11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzXCJcbiAgICB9XG4gIH0sXG4gIGVtYWlsOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsIGVtYWlsOiB0cnVlLFxuICAgIGxlbmd0aDoge1xuICAgICAgbWluaW11bTogNCxcbiAgICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBhdCBsZWFzdCA0IGNoYXJhY3RlcnNcIlxuICAgIH1cbiAgfSxcbiAgXCJ0YWxrc1tdXCI6IHtcbiAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIG1pbmltdW06IDEsXG4gICAgICBtZXNzYWdlOiBcIm11c3QgYmUgYXQgbGVhc3QgMSB0YWxrIHNlbGVjdGVkXCJcbiAgICB9XG4gIH0sXG4gIHBob25lX251bWJlcjoge1xuICAgIHByZXNlbmNlOiB0cnVlLFxuICAgIGxlbmd0aDoge1xuICAgICAgbWluaW11bTogNCxcbiAgICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnNcIlxuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBwYXR0ZXJuOiBcIlswLTldK1wiLFxuICAgICAgZmxhZ3M6IFwiaVwiLFxuICAgICAgbWVzc2FnZTogXCJjYW4gb25seSBjb250YWluIDAtOSBudW1iZXJzXCJcbiAgICB9XG4gIH1cbn07XG5cbmNsYXNzIFJlZ2lzdHJhdGlvbkZvcm0ge1xuICBjb25zdHJ1Y3RvcihkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgdGhpcy5wb3N0VVJMID0gJ2h0dHA6Ly9vcGVuaG91c2UuaGFuZ2FyLmFnZW5jeS9hdHRlbmRlZXMnO1xuICAgIC8vIHRoaXMucG9zdFVSTCA9ICdodHRwOi8vbG9jYWxob3N0OjMwMDAvcmVnaXN0cmF0aW9uJztcblxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtUmVnaXN0cmF0aW9uJyk7XG4gICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuaG91c2UtdGhhbmtzJyk7XG5cbiAgICB0aGlzLmZ1bGxuYW1lID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmdWxsbmFtZScpO1xuICAgIHRoaXMuZW1haWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJyk7XG4gICAgdGhpcy5waG9uZSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjcGhvbmUnKTtcbiAgICB0aGlzLmNoZWNrYm94TGlzdCA9ICQoJy5tZGwtY2hlY2tib3hfX2lucHV0Jyk7XG5cbiAgICAvLyBBdHRhY2ggc3VibWl0IGV2ZW50XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gTm90aWZpY2F0aW9uIHNldHRpbmdzXG4gICAgdG9hc3RyLm9wdGlvbnMgPSB7XG4gICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgIHBvc2l0aW9uQ2xhc3M6IFwidG9hc3QtdG9wLXJpZ2h0XCJcbiAgICB9XG5cbiAgfVxuXG4gIC8vIHZhbGlkYXRlIGZvcm1cbiAgdmFsaWRhdGUgKCkge1xuICAgIHZhciB2YWx1ZXMgPSB2YWxpZGF0ZS5jb2xsZWN0Rm9ybVZhbHVlcyh0aGlzLmVsZW1lbnQpO1xuICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0ZSh2YWx1ZXMsIGNvbnN0cmFpbnRzKTtcblxuICAgIGNvbnNvbGUubG9nKGVycm9ycyk7XG5cbiAgICBpZiAoZXJyb3JzKSB7XG4gICAgICB0aGlzLnNob3dFcnJvcyhlcnJvcnMpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHNob3dFcnJvcyAoZXJyb3JzKSB7XG4gICAgbGV0IHN0cmluZ0Vycm9ycyA9ICcnO1xuICAgIE9iamVjdC5rZXlzKGVycm9ycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG4gICAgICB0b2FzdHIuZXJyb3IoZXJyb3JzW2tleV0pO1xuICAgIH0pO1xuICB9XG5cbiAgY2xlYW5JbnB1dHMgKCkge1xuICAgIHRoaXMuZnVsbG5hbWUudmFsdWUgPSAnJztcbiAgICB0aGlzLmVtYWlsLnZhbHVlID0gJyc7XG4gICAgdGhpcy5waG9uZS52YWx1ZSA9ICcnO1xuXG4gICAgdGhpcy5jaGVja2JveExpc3QuZmlsdGVyKCc6Y2hlY2tlZCcpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcbiAgICAkKCcubWRsLWpzLWNoZWNrYm94JykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgfVxuICBlcnJvcmZuIChlcnJvcikge1xuICAgIGNvbnNvbGUubG9nKGVycm9yKTtcbiAgfVxuXG4gIHNhdmUgKCkge1xuICAgIC8vIGNsZWFuIG1lc3NhZ2VzXG4gICAgdG9hc3RyLmNsZWFyKCk7XG5cbiAgICBpZiAodGhpcy52YWxpZGF0ZSgpKSB7XG4gICAgICBjb25zb2xlLmxvZygnc3VibWl0IGZvcm0nKTtcblxuICAgICAgdmFyIGRhdGEgPSAgJCggdGhpcy5lbGVtZW50ICkuc2VyaWFsaXplQXJyYXkoKTtcblxuICAgICAgJC5wb3N0KHRoaXMucG9zdFVSTCwgZGF0YSkuZG9uZSgoeGhyKT0+IHtcbiAgICAgICAgJCh0aGlzLm1vZGFsKS5tb2RhbCgnc2hvdycpO1xuICAgICAgICB0aGlzLmNsZWFuSW5wdXRzKCk7XG4gICAgICB9KS5mYWlsKHRoaXMuZXJyb3Jmbik7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVnaXN0cmF0aW9uRm9ybTsgLy9zZXQgd2hhdCBjYW4gYmUgaW1wb3J0ZWQgZnJvbSB0aGlzIGZpbGVcbiIsInZhciBTY3JvbGxEb3duID0gKCkgPT4ge1xuXG4gIHZhciBhbmltYXRlID0gKHRhcmdldCkgPT4ge1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgJCgnLmpzLWgtYXJyb3ctZG93bicpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhbmltYXRlKCQoJyNpbnRybycpKTtcbiAgfSk7XG5cbiAgJCgnYVtocmVmXj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIGRlYnVnZ2VyO1xuICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgaWYoIHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYW5pbWF0ZSh0YXJnZXQpO1xuICAgIH1cbiAgfSk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxEb3duO1xuIiwiLy9pbXBvcnRzL1JlZ2lzdHJhdGlvbkZvcm0gLmpzXG5cbnZhciBlbnZfdXJsID0gJ2h0dHA6Ly9vcGVuaG91c2UudGhlaGFuZ2FyLmNyLyc7XG5cbmlmICh3aW5kb3cuX19lbnYpIHtcbiAgZW52X3VybCA9IHdpbmRvdy5fX2Vudi51cmw7XG59XG5cbnZhciB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQoZW52X3VybCk7XG5cbnZhciBmYWNlYm9va1N0cmluZyA9IGBodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIucGhwP3M9MTAwJnBbdXJsXT0ke3VybH1gO1xudmFyIGdvb2dsZVN0cmluZyA9IGBodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JHt1cmx9YDtcblxudmFyIHRpdGxlID0gIGVuY29kZVVSSUNvbXBvbmVudCgnQSBwbGFjZSBvZiBncmVhdCBvcHBvcnR1bml0aWVzICAtIEpvaW4gdXMgYXQgdGhlIEBIYW5nYXJfY3IgI09wZW5Ib3VzZScpO1xudmFyIHR3aXR0ZXJTdHJpbmcgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZT90ZXh0PSR7dGl0bGV9JnVybD0ke3VybH1gO1xuXG5jbGFzcyBTaGFyZSB7XG4gICAgY29uc3RydWN0b3IoZGVidWcgPSBmYWxzZSkge1xuICAgICAgdGhpcy5mYWNlYm9vayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtZmInKTtcbiAgICAgIHRoaXMudHdpdHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtdHcnKTtcbiAgICAgIHRoaXMuZ29vZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2pzLXNvY2lhbC1nbycpO1xuXG4gICAgICB0aGlzLmZhY2Vib29rLmhyZWYgPSBmYWNlYm9va1N0cmluZztcbiAgICAgIHRoaXMuZmFjZWJvb2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuXG4gICAgICB0aGlzLmdvb2dsZS5ocmVmID0gZ29vZ2xlU3RyaW5nO1xuICAgICAgdGhpcy5nb29nbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuXG4gICAgICB0aGlzLnR3aXR0ZXIuaHJlZiA9IHR3aXR0ZXJTdHJpbmc7XG4gICAgICB0aGlzLnR3aXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuICAgIH1cblxuICAgIGNsaWNrTGluayAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCcnLCAnbWVudWJhcj1ubyx0b29sYmFyPW5vLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMsaGVpZ2h0PTYyMCx3aWR0aD01MDAnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcmU7IC8vc2V0IHdoYXQgY2FuIGJlIGltcG9ydGVkIGZyb20gdGhpcyBmaWxlXG4iXX0=
