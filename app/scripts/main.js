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

    // url: http://openhouse.hangar.agency/attendees

    this.postURL = 'http://openhouse.hangar.agency/attendees';

    this.element = document.getElementById('formRegistration');
    this.modal = document.getElementById('openhouse-thanks');

    this.fullname = this.element.querySelector('#fullname');
    this.email = this.element.querySelector('#email');
    this.phone = this.element.querySelector('#phone');
    this.hear_question = this.element.querySelector('#hear_question');
    this.checkboxList = $('.mdl-checkbox__input');

    // Attach submit event
    this.element.addEventListener("submit", function (e) {
      e.preventDefault();
      _this.save();
    });

    // Notification settings
    toastr.options = {
      closeButton: true,
      timeOut: 15000,
      newestOnTop: true,
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
        this.showErrors(errors);
        return false;
      }
      return true;
    })
  }, {
    key: "showErrors",
    value: function showErrors(errors) {
      var stringErrors = '';
      Object.keys(errors).forEach(function (key) {
        toastr.error(errors[key]);
      });
    }
  }, {
    key: "errorfn",
    value: function errorfn(xhr, textStatus, errorThrown) {
      this.showErrors({ error: ['Oops! An error occurred! Please try again!'] });
    }
  }, {
    key: "cleanInputs",
    value: function cleanInputs() {
      this.fullname.value = '';
      this.email.value = '';
      this.phone.value = '';
      this.hear_question.selectedIndex = 0;

      this.checkboxList.filter(':checked').removeAttr('checked');
      $('.mdl-js-checkbox').removeClass('is-checked');
    }
  }, {
    key: "save",
    value: function save() {
      var _this2 = this;

      // clean messages
      toastr.clear();

      if (this.validate()) {

        var data = $(this.element).serializeArray();

        $.post(this.postURL, data).done(function (xhr) {
          if (!xhr.success) {
            _this2.showErrors(xhr.errors);
          } else {
            $(_this2.modal).modal('show');
            _this2.cleanInputs();
          }
        }).fail(function (xhr, textStatus, errorThrown) {
          _this2.errorfn(xhr, textStatus, errorThrown);
        });
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbWFpbi5qcyIsIi9Vc2Vycy9qYWlyb2cvRGV2L3dvcmsvaGFuZ2FyL29wZW5ob3VzZS50aGVoYW5nYXIuY3IvYXBwL2VzNi9tb2R1bGVzL1JlZ2lzdHJhdGlvbkZvcm0uanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbW9kdWxlcy9TY3JvbGxEb3duLmpzIiwiL1VzZXJzL2phaXJvZy9EZXYvd29yay9oYW5nYXIvb3BlbmhvdXNlLnRoZWhhbmdhci5jci9hcHAvZXM2L21vZHVsZXMvU2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7aUNBQ1Usc0JBQXNCOzs7OzRCQUMzQixpQkFBaUI7Ozs7dUNBQ04sNEJBQTRCOzs7OztBQUd6RCxDQUFDLENBQUMsWUFBTTtBQUNOLGNBQVksQ0FBQzs7O0FBR2IsV0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7OztBQUdoQyx1Q0FBWSxDQUFDOzs7QUFHYiw0Q0FBc0IsQ0FBQztBQUN2QixpQ0FBVyxDQUFDO0NBQ2IsQ0FBQyxDQUFDOzs7Ozs7Ozs7Ozs7QUNmSCxJQUFJLFdBQVcsR0FBRztBQUNoQixXQUFTLEVBQUU7QUFDVCxZQUFRLEVBQUUsSUFBSTtBQUNkLFVBQU0sRUFBRTtBQUNOLGFBQU8sRUFBRSxDQUFDO0FBQ1YsYUFBTyxFQUFFLCtCQUErQjtLQUN6QztHQUNGO0FBQ0QsT0FBSyxFQUFFO0FBQ0wsWUFBUSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsSUFBSTtBQUMzQixVQUFNLEVBQUU7QUFDTixhQUFPLEVBQUUsQ0FBQztBQUNW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U0FwQkMsS0FBSzs7O0FBdUJYLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTY3JvbGxEb3duIGZyb20gXCIuL21vZHVsZXMvU2Nyb2xsRG93blwiO1xuaW1wb3J0IFNoYXJlIGZyb20gXCIuL21vZHVsZXMvU2hhcmVcIjtcbmltcG9ydCBSZWdpc3RyYXRpb25Gb3JtIGZyb20gXCIuL21vZHVsZXMvUmVnaXN0cmF0aW9uRm9ybVwiO1xuXG4vLyBqUXVlcnkgRE9NIFJlYWR5XG4kKCgpID0+IHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFBvbHlmaWxsIHRvIHJlbW92ZSBjbGljayBkZWxheXMgb24gYnJvd3NlcnMgd2l0aCB0b3VjaCBVSXNcbiAgRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KTtcblxuICAvLyBBcnJvdyBkb3duIGFuaW1hdGlvblxuICBTY3JvbGxEb3duKCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBmb3JtIGZ1bmNpb25hbGl0eVxuICBuZXcgUmVnaXN0cmF0aW9uRm9ybSgpO1xuICBuZXcgU2hhcmUoKTtcbn0pO1xuIiwiLy9pbXBvcnRzL1JlZ2lzdHJhdGlvbkZvcm0gLmpzXG5cbi8vIFZhbGlkYXRpb24gUnVsZXNcbnZhciBjb25zdHJhaW50cyA9IHtcbiAgZnVsbF9uYW1lOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsXG4gICAgbGVuZ3RoOiB7XG4gICAgICBtaW5pbXVtOiAyLFxuICAgICAgbWVzc2FnZTogXCJtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVyc1wiXG4gICAgfVxuICB9LFxuICBlbWFpbDoge1xuICAgIHByZXNlbmNlOiB0cnVlLCBlbWFpbDogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIG1pbmltdW06IDQsXG4gICAgICBtZXNzYWdlOiBcIm11c3QgYmUgYXQgbGVhc3QgNCBjaGFyYWN0ZXJzXCJcbiAgICB9XG4gIH0sXG4gIHBob25lX251bWJlcjoge1xuICAgIHByZXNlbmNlOiB0cnVlLFxuICAgIGxlbmd0aDoge1xuICAgICAgbWluaW11bTogNCxcbiAgICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBhdCBsZWFzdCA4IGNoYXJhY3RlcnNcIlxuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBwYXR0ZXJuOiBcIlswLTldK1wiLFxuICAgICAgZmxhZ3M6IFwiaVwiLFxuICAgICAgbWVzc2FnZTogXCJjYW4gb25seSBjb250YWluIDAtOSBudW1iZXJzXCJcbiAgICB9XG4gIH1cbn07XG5cbmNsYXNzIFJlZ2lzdHJhdGlvbkZvcm0ge1xuICBjb25zdHJ1Y3RvcihkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgLy8gdXJsOiBodHRwOi8vb3BlbmhvdXNlLmhhbmdhci5hZ2VuY3kvYXR0ZW5kZWVzXG5cbiAgICB0aGlzLnBvc3RVUkwgPSAnaHR0cDovL29wZW5ob3VzZS5oYW5nYXIuYWdlbmN5L2F0dGVuZGVlcyc7XG5cbiAgICB0aGlzLmVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZm9ybVJlZ2lzdHJhdGlvbicpO1xuICAgIHRoaXMubW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnb3BlbmhvdXNlLXRoYW5rcycpO1xuXG4gICAgdGhpcy5mdWxsbmFtZSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZnVsbG5hbWUnKTtcbiAgICB0aGlzLmVtYWlsID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNlbWFpbCcpO1xuICAgIHRoaXMucGhvbmUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI3Bob25lJyk7XG4gICAgdGhpcy5oZWFyX3F1ZXN0aW9uID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNoZWFyX3F1ZXN0aW9uJyk7XG4gICAgdGhpcy5jaGVja2JveExpc3QgPSAkKCcubWRsLWNoZWNrYm94X19pbnB1dCcpO1xuXG4gICAgLy8gQXR0YWNoIHN1Ym1pdCBldmVudFxuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIChlKSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLnNhdmUoKTtcbiAgICB9KTtcblxuICAgIC8vIE5vdGlmaWNhdGlvbiBzZXR0aW5nc1xuICAgIHRvYXN0ci5vcHRpb25zID0ge1xuICAgICAgY2xvc2VCdXR0b246IHRydWUsXG4gICAgICB0aW1lT3V0OiAxNTAwMCxcbiAgICAgIG5ld2VzdE9uVG9wOiB0cnVlLFxuICAgICAgcG9zaXRpb25DbGFzczogXCJ0b2FzdC10b3AtcmlnaHRcIlxuICAgIH1cblxuICB9XG5cbiAgLy8gdmFsaWRhdGUgZm9ybVxuICB2YWxpZGF0ZSAoKSB7XG4gICAgdmFyIHZhbHVlcyA9IHZhbGlkYXRlLmNvbGxlY3RGb3JtVmFsdWVzKHRoaXMuZWxlbWVudCk7XG4gICAgdmFyIGVycm9ycyA9IHZhbGlkYXRlKHZhbHVlcywgY29uc3RyYWludHMpO1xuXG4gICAgY29uc29sZS5sb2coZXJyb3JzKTtcblxuICAgIGlmIChlcnJvcnMpIHtcbiAgICAgIHRoaXMuc2hvd0Vycm9ycyhlcnJvcnMpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHNob3dFcnJvcnMgKGVycm9ycykge1xuICAgIGxldCBzdHJpbmdFcnJvcnMgPSAnJztcbiAgICBPYmplY3Qua2V5cyhlcnJvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdG9hc3RyLmVycm9yKGVycm9yc1trZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIGVycm9yZm4gKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICB0aGlzLnNob3dFcnJvcnMoeyBlcnJvcjogWydPb3BzISBBbiBlcnJvciBvY2N1cnJlZCEgUGxlYXNlIHRyeSBhZ2FpbiEnXSB9KTtcbiAgfVxuXG4gIGNsZWFuSW5wdXRzICgpIHtcbiAgICB0aGlzLmZ1bGxuYW1lLnZhbHVlID0gJyc7XG4gICAgdGhpcy5lbWFpbC52YWx1ZSA9ICcnO1xuICAgIHRoaXMucGhvbmUudmFsdWUgPSAnJztcbiAgICB0aGlzLmhlYXJfcXVlc3Rpb24uc2VsZWN0ZWRJbmRleCA9IDA7XG5cbiAgICB0aGlzLmNoZWNrYm94TGlzdC5maWx0ZXIoJzpjaGVja2VkJykucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xuICAgICQoJy5tZGwtanMtY2hlY2tib3gnKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICB9XG5cblxuICBzYXZlICgpIHtcbiAgICAvLyBjbGVhbiBtZXNzYWdlc1xuICAgIHRvYXN0ci5jbGVhcigpO1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdGUoKSkge1xuXG4gICAgICB2YXIgZGF0YSA9ICAkKCB0aGlzLmVsZW1lbnQgKS5zZXJpYWxpemVBcnJheSgpO1xuXG4gICAgICAkLnBvc3QodGhpcy5wb3N0VVJMLCBkYXRhKS5kb25lKCAoeGhyKSA9PiB7XG4gICAgICAgIGlmICgheGhyLnN1Y2Nlc3MpIHtcbiAgICAgICAgICB0aGlzLnNob3dFcnJvcnMoeGhyLmVycm9ycyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgJCh0aGlzLm1vZGFsKS5tb2RhbCgnc2hvdycpO1xuICAgICAgICAgIHRoaXMuY2xlYW5JbnB1dHMoKTtcbiAgICAgICAgfVxuICAgICAgfSkuZmFpbCggKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pID0+IHtcbiAgICAgICAgdGhpcy5lcnJvcmZuKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gUmVnaXN0cmF0aW9uRm9ybTsgLy9zZXQgd2hhdCBjYW4gYmUgaW1wb3J0ZWQgZnJvbSB0aGlzIGZpbGVcbiIsInZhciBTY3JvbGxEb3duID0gKCkgPT4ge1xuXG4gIHZhciBhbmltYXRlID0gKHRhcmdldCkgPT4ge1xuICAgICQoJ2h0bWwsIGJvZHknKS5hbmltYXRlKHtcbiAgICAgICAgICAgIHNjcm9sbFRvcDogdGFyZ2V0Lm9mZnNldCgpLnRvcFxuICAgIH0sIDEwMDApO1xuICB9XG5cbiAgJCgnLmpzLWgtYXJyb3ctZG93bicpLm9uKCdjbGljaycsIChlKSA9PiB7XG4gICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICBhbmltYXRlKCQoJyNpbnRybycpKTtcbiAgfSk7XG5cbiAgJCgnYVtocmVmXj1cIiNcIl0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIHZhciB0YXJnZXQgPSAkKHRoaXMuaGFzaCk7XG4gICAgaWYoIHRhcmdldC5sZW5ndGggPiAwKSB7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgYW5pbWF0ZSh0YXJnZXQpO1xuICAgIH1cbiAgfSk7XG5cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTY3JvbGxEb3duO1xuIiwiLy9pbXBvcnRzL1JlZ2lzdHJhdGlvbkZvcm0gLmpzXG5cbnZhciBlbnZfdXJsID0gJ2h0dHA6Ly9vcGVuaG91c2UudGhlaGFuZ2FyLmNyLyc7XG5cbmlmICh3aW5kb3cuX19lbnYpIHtcbiAgZW52X3VybCA9IHdpbmRvdy5fX2Vudi51cmw7XG59XG5cbnZhciB1cmwgPSBlbmNvZGVVUklDb21wb25lbnQoZW52X3VybCk7XG5cbnZhciBmYWNlYm9va1N0cmluZyA9IGBodHRwOi8vd3d3LmZhY2Vib29rLmNvbS9zaGFyZXIucGhwP3M9MTAwJnBbdXJsXT0ke3VybH1gO1xudmFyIGdvb2dsZVN0cmluZyA9IGBodHRwczovL3BsdXMuZ29vZ2xlLmNvbS9zaGFyZT91cmw9JHt1cmx9YDtcblxudmFyIHRpdGxlID0gIGVuY29kZVVSSUNvbXBvbmVudCgnQSBwbGFjZSBvZiBncmVhdCBvcHBvcnR1bml0aWVzICAtIEpvaW4gdXMgYXQgdGhlIEBIYW5nYXJfY3IgI09wZW5Ib3VzZScpO1xudmFyIHR3aXR0ZXJTdHJpbmcgPSBgaHR0cHM6Ly90d2l0dGVyLmNvbS9zaGFyZT90ZXh0PSR7dGl0bGV9JnVybD0ke3VybH1gO1xuXG5jbGFzcyBTaGFyZSB7XG4gICAgY29uc3RydWN0b3IoZGVidWcgPSBmYWxzZSkge1xuICAgICAgdGhpcy5mYWNlYm9vayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtZmInKTtcbiAgICAgIHRoaXMudHdpdHRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtdHcnKTtcbiAgICAgIHRoaXMuZ29vZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2pzLXNvY2lhbC1nbycpO1xuXG4gICAgICB0aGlzLmZhY2Vib29rLmhyZWYgPSBmYWNlYm9va1N0cmluZztcbiAgICAgIHRoaXMuZmFjZWJvb2suYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuXG4gICAgICB0aGlzLmdvb2dsZS5ocmVmID0gZ29vZ2xlU3RyaW5nO1xuICAgICAgdGhpcy5nb29nbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuXG4gICAgICB0aGlzLnR3aXR0ZXIuaHJlZiA9IHR3aXR0ZXJTdHJpbmc7XG4gICAgICB0aGlzLnR3aXR0ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0aGlzLmNsaWNrTGluaywgZmFsc2UpO1xuICAgIH1cblxuICAgIGNsaWNrTGluayAoZSkge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgd2luZG93Lm9wZW4odGhpcy5ocmVmLCcnLCAnbWVudWJhcj1ubyx0b29sYmFyPW5vLHJlc2l6YWJsZT15ZXMsc2Nyb2xsYmFycz15ZXMsaGVpZ2h0PTYyMCx3aWR0aD01MDAnKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2hhcmU7IC8vc2V0IHdoYXQgY2FuIGJlIGltcG9ydGVkIGZyb20gdGhpcyBmaWxlXG4iXX0=
