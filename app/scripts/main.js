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
  // FastClick.attach(document.body);

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
    presence: true,
    email: true,
    length: {
      minimum: 4,
      message: "must be at least 4 characters"
    }
  },
  phone_number: {
    presence: true,
    length: {
      is: 8,
      message: "must be 8 characters"
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

    this.saveInProgress = false;

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

      if (_this.saveInProgress) {
        toastr.info('Your info is still saving please wait .. !');
        return false;
      }

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

        this.saveInProgress = true;

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
        }).always(function () {
          _this2.saveInProgress = false;
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbWFpbi5qcyIsIi9Vc2Vycy9qYWlyb2cvRGV2L3dvcmsvaGFuZ2FyL29wZW5ob3VzZS50aGVoYW5nYXIuY3IvYXBwL2VzNi9tb2R1bGVzL1JlZ2lzdHJhdGlvbkZvcm0uanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbW9kdWxlcy9TY3JvbGxEb3duLmpzIiwiL1VzZXJzL2phaXJvZy9EZXYvd29yay9oYW5nYXIvb3BlbmhvdXNlLnRoZWhhbmdhci5jci9hcHAvZXM2L21vZHVsZXMvU2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7aUNBQ1Usc0JBQXNCOzs7OzRCQUMzQixpQkFBaUI7Ozs7dUNBQ04sNEJBQTRCOzs7OztBQUd6RCxDQUFDLENBQUMsWUFBTTtBQUNOLGNBQVksQ0FBQzs7Ozs7O0FBTWIsdUNBQVksQ0FBQzs7O0FBR2IsNENBQXNCLENBQUM7QUFDdkIsaUNBQVcsQ0FBQztDQUNiLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDZkgsSUFBSSxXQUFXLEdBQUc7QUFDaEIsV0FBUyxFQUFFO0FBQ1QsWUFBUSxFQUFFLElBQUk7QUFDZCxVQUFNLEVBQUU7QUFDTixhQUFPLEVBQUUsQ0FBQztBQUNWLGFBQU8sRUFBRSwrQkFBK0I7S0FDekM7R0FDRjtBQUNELE9BQUssRUFBRTtBQUNMLFlBQVEsRUFBRSxJQUFJO0FBQ2QsU0FBSyxFQUFFLElBQUk7QUFDWCxVQUFNLEVBQUU7QUFDTixhQUFPLEVBQUUsQ0FBQztBQUNWLGFBQU8sRUFBRSwrQkFBK0I7S0FDekM7R0FDRjtBQUNELGNBQVksRUFBRTtBQUNaLFlB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QyxFQUFFO0FBQ1osT0FBQyxDQUFDLGNBQWMsRUFBRSxDQUFDO0FBQ25CLFlBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBQyxFQUFFLEVBQUUseUVBQXlFLENBQUMsQ0FBQztBQUNyRyxhQUFPLEtBQUssQ0FBQztLQUNkOzs7U0FwQkMsS0FBSzs7O0FBdUJYLE1BQU0sQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0JztcbmltcG9ydCBTY3JvbGxEb3duIGZyb20gXCIuL21vZHVsZXMvU2Nyb2xsRG93blwiO1xuaW1wb3J0IFNoYXJlIGZyb20gXCIuL21vZHVsZXMvU2hhcmVcIjtcbmltcG9ydCBSZWdpc3RyYXRpb25Gb3JtIGZyb20gXCIuL21vZHVsZXMvUmVnaXN0cmF0aW9uRm9ybVwiO1xuXG4vLyBqUXVlcnkgRE9NIFJlYWR5XG4kKCgpID0+IHtcbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8vIFBvbHlmaWxsIHRvIHJlbW92ZSBjbGljayBkZWxheXMgb24gYnJvd3NlcnMgd2l0aCB0b3VjaCBVSXNcbiAgLy8gRmFzdENsaWNrLmF0dGFjaChkb2N1bWVudC5ib2R5KTtcblxuICAvLyBBcnJvdyBkb3duIGFuaW1hdGlvblxuICBTY3JvbGxEb3duKCk7XG5cbiAgLy8gSW5pdGlhbGl6ZSBmb3JtIGZ1bmNpb25hbGl0eVxuICBuZXcgUmVnaXN0cmF0aW9uRm9ybSgpO1xuICBuZXcgU2hhcmUoKTtcbn0pO1xuIiwiLy9pbXBvcnRzL1JlZ2lzdHJhdGlvbkZvcm0gLmpzXG5cbi8vIFZhbGlkYXRpb24gUnVsZXNcbnZhciBjb25zdHJhaW50cyA9IHtcbiAgZnVsbF9uYW1lOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsXG4gICAgbGVuZ3RoOiB7XG4gICAgICBtaW5pbXVtOiAyLFxuICAgICAgbWVzc2FnZTogXCJtdXN0IGJlIGF0IGxlYXN0IDIgY2hhcmFjdGVyc1wiXG4gICAgfVxuICB9LFxuICBlbWFpbDoge1xuICAgIHByZXNlbmNlOiB0cnVlLFxuICAgIGVtYWlsOiB0cnVlLFxuICAgIGxlbmd0aDoge1xuICAgICAgbWluaW11bTogNCxcbiAgICAgIG1lc3NhZ2U6IFwibXVzdCBiZSBhdCBsZWFzdCA0IGNoYXJhY3RlcnNcIlxuICAgIH1cbiAgfSxcbiAgcGhvbmVfbnVtYmVyOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsXG4gICAgbGVuZ3RoOiB7XG4gICAgICBpczogOCxcbiAgICAgIG1lc3NhZ2U6IFwibXVzdCBiZSA4IGNoYXJhY3RlcnNcIlxuICAgIH0sXG4gICAgZm9ybWF0OiB7XG4gICAgICBwYXR0ZXJuOiBcIlswLTldK1wiLFxuICAgICAgZmxhZ3M6IFwiaVwiLFxuICAgICAgbWVzc2FnZTogXCJjYW4gb25seSBjb250YWluIDAtOSBudW1iZXJzXCJcbiAgICB9XG4gIH1cbn07XG5cbmNsYXNzIFJlZ2lzdHJhdGlvbkZvcm0ge1xuICBjb25zdHJ1Y3RvcihkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgLy8gdXJsOiBodHRwOi8vb3BlbmhvdXNlLmhhbmdhci5hZ2VuY3kvYXR0ZW5kZWVzXG4gICAgdGhpcy5wb3N0VVJMID0gJ2h0dHA6Ly9vcGVuaG91c2UuaGFuZ2FyLmFnZW5jeS9hdHRlbmRlZXMnO1xuXG4gICAgdGhpcy5zYXZlSW5Qcm9ncmVzcyA9IGZhbHNlO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2Zvcm1SZWdpc3RyYXRpb24nKTtcbiAgICB0aGlzLm1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ29wZW5ob3VzZS10aGFua3MnKTtcblxuICAgIHRoaXMuZnVsbG5hbWUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI2Z1bGxuYW1lJyk7XG4gICAgdGhpcy5lbWFpbCA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjZW1haWwnKTtcbiAgICB0aGlzLnBob25lID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNwaG9uZScpO1xuICAgIHRoaXMuaGVhcl9xdWVzdGlvbiA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjaGVhcl9xdWVzdGlvbicpO1xuICAgIHRoaXMuY2hlY2tib3hMaXN0ID0gJCgnLm1kbC1jaGVja2JveF9faW5wdXQnKTtcblxuICAgIC8vIEF0dGFjaCBzdWJtaXQgZXZlbnRcbiAgICB0aGlzLmVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCAoZSkgPT4ge1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBpZiAodGhpcy5zYXZlSW5Qcm9ncmVzcykge1xuICAgICAgICB0b2FzdHIuaW5mbygnWW91ciBpbmZvIGlzIHN0aWxsIHNhdmluZyBwbGVhc2Ugd2FpdCAuLiAhJyk7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zYXZlKCk7XG4gICAgfSk7XG5cbiAgICAvLyBOb3RpZmljYXRpb24gc2V0dGluZ3NcbiAgICB0b2FzdHIub3B0aW9ucyA9IHtcbiAgICAgIGNsb3NlQnV0dG9uOiB0cnVlLFxuICAgICAgdGltZU91dDogMTUwMDAsXG4gICAgICBuZXdlc3RPblRvcDogdHJ1ZSxcbiAgICAgIHBvc2l0aW9uQ2xhc3M6IFwidG9hc3QtdG9wLXJpZ2h0XCJcbiAgICB9XG5cbiAgfVxuXG4gIC8vIHZhbGlkYXRlIGZvcm1cbiAgdmFsaWRhdGUgKCkge1xuICAgIHZhciB2YWx1ZXMgPSB2YWxpZGF0ZS5jb2xsZWN0Rm9ybVZhbHVlcyh0aGlzLmVsZW1lbnQpO1xuICAgIHZhciBlcnJvcnMgPSB2YWxpZGF0ZSh2YWx1ZXMsIGNvbnN0cmFpbnRzKTtcblxuICAgIGlmIChlcnJvcnMpIHtcbiAgICAgIHRoaXMuc2hvd0Vycm9ycyhlcnJvcnMpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHNob3dFcnJvcnMgKGVycm9ycykge1xuICAgIGxldCBzdHJpbmdFcnJvcnMgPSAnJztcbiAgICBPYmplY3Qua2V5cyhlcnJvcnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuICAgICAgdG9hc3RyLmVycm9yKGVycm9yc1trZXldKTtcbiAgICB9KTtcbiAgfVxuXG4gIGVycm9yZm4gKHhociwgdGV4dFN0YXR1cywgZXJyb3JUaHJvd24pIHtcbiAgICB0aGlzLnNob3dFcnJvcnMoeyBlcnJvcjogWydPb3BzISBBbiBlcnJvciBvY2N1cnJlZCEgUGxlYXNlIHRyeSBhZ2FpbiEnXSB9KTtcbiAgfVxuXG4gIGNsZWFuSW5wdXRzICgpIHtcbiAgICB0aGlzLmZ1bGxuYW1lLnZhbHVlID0gJyc7XG4gICAgdGhpcy5lbWFpbC52YWx1ZSA9ICcnO1xuICAgIHRoaXMucGhvbmUudmFsdWUgPSAnJztcbiAgICB0aGlzLmhlYXJfcXVlc3Rpb24uc2VsZWN0ZWRJbmRleCA9IDA7XG5cbiAgICB0aGlzLmNoZWNrYm94TGlzdC5maWx0ZXIoJzpjaGVja2VkJykucmVtb3ZlQXR0cignY2hlY2tlZCcpO1xuICAgICQoJy5tZGwtanMtY2hlY2tib3gnKS5yZW1vdmVDbGFzcygnaXMtY2hlY2tlZCcpO1xuICB9XG5cblxuICBzYXZlICgpIHtcbiAgICAvLyBjbGVhbiBtZXNzYWdlc1xuICAgIHRvYXN0ci5jbGVhcigpO1xuXG4gICAgaWYgKHRoaXMudmFsaWRhdGUoKSkge1xuXG4gICAgICB0aGlzLnNhdmVJblByb2dyZXNzID0gdHJ1ZTtcblxuICAgICAgdmFyIGRhdGEgPSAgJCggdGhpcy5lbGVtZW50ICkuc2VyaWFsaXplQXJyYXkoKTtcblxuICAgICAgJC5wb3N0KHRoaXMucG9zdFVSTCwgZGF0YSkuZG9uZSggKHhocikgPT4ge1xuICAgICAgICBpZiAoIXhoci5zdWNjZXNzKSB7XG4gICAgICAgICAgdGhpcy5zaG93RXJyb3JzKHhoci5lcnJvcnMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICQodGhpcy5tb2RhbCkubW9kYWwoJ3Nob3cnKTtcbiAgICAgICAgICB0aGlzLmNsZWFuSW5wdXRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0pLmZhaWwoICh4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSA9PiB7XG4gICAgICAgIHRoaXMuZXJyb3Jmbih4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKTtcbiAgICAgIH0pLmFsd2F5cygoKSA9PiB7XG4gICAgICAgIHRoaXMuc2F2ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFJlZ2lzdHJhdGlvbkZvcm07IC8vc2V0IHdoYXQgY2FuIGJlIGltcG9ydGVkIGZyb20gdGhpcyBmaWxlXG4iLCJ2YXIgU2Nyb2xsRG93biA9ICgpID0+IHtcblxuICB2YXIgYW5pbWF0ZSA9ICh0YXJnZXQpID0+IHtcbiAgICAkKCdodG1sLCBib2R5JykuYW5pbWF0ZSh7XG4gICAgICAgICAgICBzY3JvbGxUb3A6IHRhcmdldC5vZmZzZXQoKS50b3BcbiAgICB9LCAxMDAwKTtcbiAgfVxuXG4gICQoJy5qcy1oLWFycm93LWRvd24nKS5vbignY2xpY2snLCAoZSkgPT4ge1xuICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgYW5pbWF0ZSgkKCcjaW50cm8nKSk7XG4gIH0pO1xuXG4gICQoJ2FbaHJlZl49XCIjXCJdJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gJCh0aGlzLmhhc2gpO1xuICAgIGlmKCB0YXJnZXQubGVuZ3RoID4gMCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGFuaW1hdGUodGFyZ2V0KTtcbiAgICB9XG4gIH0pO1xuXG59XG5cbm1vZHVsZS5leHBvcnRzID0gU2Nyb2xsRG93bjtcbiIsIi8vaW1wb3J0cy9SZWdpc3RyYXRpb25Gb3JtIC5qc1xuXG52YXIgZW52X3VybCA9ICdodHRwOi8vb3BlbmhvdXNlLnRoZWhhbmdhci5jci8nO1xuXG5pZiAod2luZG93Ll9fZW52KSB7XG4gIGVudl91cmwgPSB3aW5kb3cuX19lbnYudXJsO1xufVxuXG52YXIgdXJsID0gZW5jb2RlVVJJQ29tcG9uZW50KGVudl91cmwpO1xuXG52YXIgZmFjZWJvb2tTdHJpbmcgPSBgaHR0cDovL3d3dy5mYWNlYm9vay5jb20vc2hhcmVyLnBocD9zPTEwMCZwW3VybF09JHt1cmx9YDtcbnZhciBnb29nbGVTdHJpbmcgPSBgaHR0cHM6Ly9wbHVzLmdvb2dsZS5jb20vc2hhcmU/dXJsPSR7dXJsfWA7XG5cbnZhciB0aXRsZSA9ICBlbmNvZGVVUklDb21wb25lbnQoJ0EgcGxhY2Ugb2YgZ3JlYXQgb3Bwb3J0dW5pdGllcyAgLSBKb2luIHVzIGF0IHRoZSBASGFuZ2FyX2NyICNPcGVuSG91c2UnKTtcbnZhciB0d2l0dGVyU3RyaW5nID0gYGh0dHBzOi8vdHdpdHRlci5jb20vc2hhcmU/dGV4dD0ke3RpdGxlfSZ1cmw9JHt1cmx9YDtcblxuY2xhc3MgU2hhcmUge1xuICAgIGNvbnN0cnVjdG9yKGRlYnVnID0gZmFsc2UpIHtcbiAgICAgIHRoaXMuZmFjZWJvb2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjanMtc29jaWFsLWZiJyk7XG4gICAgICB0aGlzLnR3aXR0ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjanMtc29jaWFsLXR3Jyk7XG4gICAgICB0aGlzLmdvb2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNqcy1zb2NpYWwtZ28nKTtcblxuICAgICAgdGhpcy5mYWNlYm9vay5ocmVmID0gZmFjZWJvb2tTdHJpbmc7XG4gICAgICB0aGlzLmZhY2Vib29rLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpbmssIGZhbHNlKTtcblxuICAgICAgdGhpcy5nb29nbGUuaHJlZiA9IGdvb2dsZVN0cmluZztcbiAgICAgIHRoaXMuZ29vZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpbmssIGZhbHNlKTtcblxuICAgICAgdGhpcy50d2l0dGVyLmhyZWYgPSB0d2l0dGVyU3RyaW5nO1xuICAgICAgdGhpcy50d2l0dGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5jbGlja0xpbmssIGZhbHNlKTtcbiAgICB9XG5cbiAgICBjbGlja0xpbmsgKGUpIHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgIHdpbmRvdy5vcGVuKHRoaXMuaHJlZiwnJywgJ21lbnViYXI9bm8sdG9vbGJhcj1ubyxyZXNpemFibGU9eWVzLHNjcm9sbGJhcnM9eWVzLGhlaWdodD02MjAsd2lkdGg9NTAwJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNoYXJlOyAvL3NldCB3aGF0IGNhbiBiZSBpbXBvcnRlZCBmcm9tIHRoaXMgZmlsZVxuIl19
