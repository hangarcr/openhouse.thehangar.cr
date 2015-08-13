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

    // this.postURL = 'http://openhouse.hangar.agency/attendee';
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbWFpbi5qcyIsIi9Vc2Vycy9qYWlyb2cvRGV2L3dvcmsvaGFuZ2FyL29wZW5ob3VzZS50aGVoYW5nYXIuY3IvYXBwL2VzNi9tb2R1bGVzL1JlZ2lzdHJhdGlvbkZvcm0uanMiLCIvVXNlcnMvamFpcm9nL0Rldi93b3JrL2hhbmdhci9vcGVuaG91c2UudGhlaGFuZ2FyLmNyL2FwcC9lczYvbW9kdWxlcy9TY3JvbGxEb3duLmpzIiwiL1VzZXJzL2phaXJvZy9EZXYvd29yay9oYW5nYXIvb3BlbmhvdXNlLnRoZWhhbmdhci5jci9hcHAvZXM2L21vZHVsZXMvU2hhcmUuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQSxZQUFZLENBQUM7Ozs7aUNBQ1Usc0JBQXNCOzs7OzRCQUMzQixpQkFBaUI7Ozs7dUNBQ04sNEJBQTRCOzs7OztBQUd6RCxDQUFDLENBQUMsWUFBTTtBQUNOLGNBQVksQ0FBQzs7Ozs7O0FBTWIsdUNBQVksQ0FBQzs7O0FBR2IsNENBQXNCLENBQUM7QUFDdkIsaUNBQVcsQ0FBQztDQUNiLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7O0FDZkgsSUFBSSxXQUFXLEdBQUc7QUFDaEIsV0FBUyxFQUFFO0FBQ1QsWUFBUSxFQUFFLElBQUk7QUFDZCxVQUFNLEVBQUU7QUFDTixhQUFPLEVBQUUsQ0FBQztBQUNWLGFBQU8sRUFBRSwrQkFBK0I7S0FDekM7R0FDRjtBQUNELE9BQUssRUFBRTtBQUNMLFlBQVEsRUFBRSxJQUFJO0FBQ2QsU0FBSyxFQUFFLElBQUk7QUFDWCxVQUFNLEVBQUU7QUFDTixhQUFPLEVBQUUsQ0FBQztBQUNWLGFBQU8sRUFBRSwrQkFBK0I7S0FDekM7R0FDRjtBQUNELGNBQVksRUFBRTtBQUNaLFlB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QUFDLEVBQUU7QUFDWixPQUFDLENBQUMsY0FBYyxFQUFFLENBQUM7QUFDbkIsWUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLEVBQUUsRUFBRSx5RUFBeUUsQ0FBQyxDQUFDO0FBQ3JHLGFBQU8sS0FBSyxDQUFDO0tBQ2Q7OztTQXBCQyxLQUFLOzs7QUF1QlgsTUFBTSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuaW1wb3J0IFNjcm9sbERvd24gZnJvbSBcIi4vbW9kdWxlcy9TY3JvbGxEb3duXCI7XG5pbXBvcnQgU2hhcmUgZnJvbSBcIi4vbW9kdWxlcy9TaGFyZVwiO1xuaW1wb3J0IFJlZ2lzdHJhdGlvbkZvcm0gZnJvbSBcIi4vbW9kdWxlcy9SZWdpc3RyYXRpb25Gb3JtXCI7XG5cbi8vIGpRdWVyeSBET00gUmVhZHlcbiQoKCkgPT4ge1xuICAndXNlIHN0cmljdCc7XG5cbiAgLy8gUG9seWZpbGwgdG8gcmVtb3ZlIGNsaWNrIGRlbGF5cyBvbiBicm93c2VycyB3aXRoIHRvdWNoIFVJc1xuICAvLyBGYXN0Q2xpY2suYXR0YWNoKGRvY3VtZW50LmJvZHkpO1xuXG4gIC8vIEFycm93IGRvd24gYW5pbWF0aW9uXG4gIFNjcm9sbERvd24oKTtcblxuICAvLyBJbml0aWFsaXplIGZvcm0gZnVuY2lvbmFsaXR5XG4gIG5ldyBSZWdpc3RyYXRpb25Gb3JtKCk7XG4gIG5ldyBTaGFyZSgpO1xufSk7XG4iLCIvL2ltcG9ydHMvUmVnaXN0cmF0aW9uRm9ybSAuanNcblxuLy8gVmFsaWRhdGlvbiBSdWxlc1xudmFyIGNvbnN0cmFpbnRzID0ge1xuICBmdWxsX25hbWU6IHtcbiAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIG1pbmltdW06IDIsXG4gICAgICBtZXNzYWdlOiBcIm11c3QgYmUgYXQgbGVhc3QgMiBjaGFyYWN0ZXJzXCJcbiAgICB9XG4gIH0sXG4gIGVtYWlsOiB7XG4gICAgcHJlc2VuY2U6IHRydWUsXG4gICAgZW1haWw6IHRydWUsXG4gICAgbGVuZ3RoOiB7XG4gICAgICBtaW5pbXVtOiA0LFxuICAgICAgbWVzc2FnZTogXCJtdXN0IGJlIGF0IGxlYXN0IDQgY2hhcmFjdGVyc1wiXG4gICAgfVxuICB9LFxuICBwaG9uZV9udW1iZXI6IHtcbiAgICBwcmVzZW5jZTogdHJ1ZSxcbiAgICBsZW5ndGg6IHtcbiAgICAgIGlzOiA4LFxuICAgICAgbWVzc2FnZTogXCJtdXN0IGJlIDggY2hhcmFjdGVyc1wiXG4gICAgfSxcbiAgICBmb3JtYXQ6IHtcbiAgICAgIHBhdHRlcm46IFwiWzAtOV0rXCIsXG4gICAgICBmbGFnczogXCJpXCIsXG4gICAgICBtZXNzYWdlOiBcImNhbiBvbmx5IGNvbnRhaW4gMC05IG51bWJlcnNcIlxuICAgIH1cbiAgfVxufTtcblxuY2xhc3MgUmVnaXN0cmF0aW9uRm9ybSB7XG4gIGNvbnN0cnVjdG9yKGRlYnVnID0gZmFsc2UpIHtcbiAgICAvLyB1cmw6IGh0dHA6Ly9vcGVuaG91c2UuaGFuZ2FyLmFnZW5jeS9hdHRlbmRlZXNcblxuICAgIC8vIHRoaXMucG9zdFVSTCA9ICdodHRwOi8vb3BlbmhvdXNlLmhhbmdhci5hZ2VuY3kvYXR0ZW5kZWUnO1xuICAgIHRoaXMucG9zdFVSTCA9ICdodHRwOi8vb3BlbmhvdXNlLmhhbmdhci5hZ2VuY3kvYXR0ZW5kZWVzJztcblxuICAgIHRoaXMuc2F2ZUluUHJvZ3Jlc3MgPSBmYWxzZTtcblxuICAgIHRoaXMuZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmb3JtUmVnaXN0cmF0aW9uJyk7XG4gICAgdGhpcy5tb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdvcGVuaG91c2UtdGhhbmtzJyk7XG5cbiAgICB0aGlzLmZ1bGxuYW1lID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmdWxsbmFtZScpO1xuICAgIHRoaXMuZW1haWwgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI2VtYWlsJyk7XG4gICAgdGhpcy5waG9uZSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcjcGhvbmUnKTtcbiAgICB0aGlzLmhlYXJfcXVlc3Rpb24gPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcignI2hlYXJfcXVlc3Rpb24nKTtcbiAgICB0aGlzLmNoZWNrYm94TGlzdCA9ICQoJy5tZGwtY2hlY2tib3hfX2lucHV0Jyk7XG5cbiAgICAvLyBBdHRhY2ggc3VibWl0IGV2ZW50XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgKGUpID0+IHtcbiAgICAgIGUucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgaWYgKHRoaXMuc2F2ZUluUHJvZ3Jlc3MpIHtcbiAgICAgICAgdG9hc3RyLmluZm8oJ1lvdXIgaW5mbyBpcyBzdGlsbCBzYXZpbmcgcGxlYXNlIHdhaXQgLi4gIScpO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2F2ZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gTm90aWZpY2F0aW9uIHNldHRpbmdzXG4gICAgdG9hc3RyLm9wdGlvbnMgPSB7XG4gICAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgICAgIHRpbWVPdXQ6IDE1MDAwLFxuICAgICAgbmV3ZXN0T25Ub3A6IHRydWUsXG4gICAgICBwb3NpdGlvbkNsYXNzOiBcInRvYXN0LXRvcC1yaWdodFwiXG4gICAgfVxuXG4gIH1cblxuICAvLyB2YWxpZGF0ZSBmb3JtXG4gIHZhbGlkYXRlICgpIHtcbiAgICB2YXIgdmFsdWVzID0gdmFsaWRhdGUuY29sbGVjdEZvcm1WYWx1ZXModGhpcy5lbGVtZW50KTtcbiAgICB2YXIgZXJyb3JzID0gdmFsaWRhdGUodmFsdWVzLCBjb25zdHJhaW50cyk7XG5cbiAgICBpZiAoZXJyb3JzKSB7XG4gICAgICB0aGlzLnNob3dFcnJvcnMoZXJyb3JzKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzaG93RXJyb3JzIChlcnJvcnMpIHtcbiAgICBsZXQgc3RyaW5nRXJyb3JzID0gJyc7XG4gICAgT2JqZWN0LmtleXMoZXJyb3JzKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgIHRvYXN0ci5lcnJvcihlcnJvcnNba2V5XSk7XG4gICAgfSk7XG4gIH1cblxuICBlcnJvcmZuICh4aHIsIHRleHRTdGF0dXMsIGVycm9yVGhyb3duKSB7XG4gICAgdGhpcy5zaG93RXJyb3JzKHsgZXJyb3I6IFsnT29wcyEgQW4gZXJyb3Igb2NjdXJyZWQhIFBsZWFzZSB0cnkgYWdhaW4hJ10gfSk7XG4gIH1cblxuICBjbGVhbklucHV0cyAoKSB7XG4gICAgdGhpcy5mdWxsbmFtZS52YWx1ZSA9ICcnO1xuICAgIHRoaXMuZW1haWwudmFsdWUgPSAnJztcbiAgICB0aGlzLnBob25lLnZhbHVlID0gJyc7XG4gICAgdGhpcy5oZWFyX3F1ZXN0aW9uLnNlbGVjdGVkSW5kZXggPSAwO1xuXG4gICAgdGhpcy5jaGVja2JveExpc3QuZmlsdGVyKCc6Y2hlY2tlZCcpLnJlbW92ZUF0dHIoJ2NoZWNrZWQnKTtcbiAgICAkKCcubWRsLWpzLWNoZWNrYm94JykucmVtb3ZlQ2xhc3MoJ2lzLWNoZWNrZWQnKTtcbiAgfVxuXG5cbiAgc2F2ZSAoKSB7XG4gICAgLy8gY2xlYW4gbWVzc2FnZXNcbiAgICB0b2FzdHIuY2xlYXIoKTtcblxuICAgIGlmICh0aGlzLnZhbGlkYXRlKCkpIHtcblxuICAgICAgdGhpcy5zYXZlSW5Qcm9ncmVzcyA9IHRydWU7XG5cbiAgICAgIHZhciBkYXRhID0gICQoIHRoaXMuZWxlbWVudCApLnNlcmlhbGl6ZUFycmF5KCk7XG5cbiAgICAgICQucG9zdCh0aGlzLnBvc3RVUkwsIGRhdGEpLmRvbmUoICh4aHIpID0+IHtcbiAgICAgICAgaWYgKCF4aHIuc3VjY2Vzcykge1xuICAgICAgICAgIHRoaXMuc2hvd0Vycm9ycyh4aHIuZXJyb3JzKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAkKHRoaXMubW9kYWwpLm1vZGFsKCdzaG93Jyk7XG4gICAgICAgICAgdGhpcy5jbGVhbklucHV0cygpO1xuICAgICAgICB9XG4gICAgICB9KS5mYWlsKCAoeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bikgPT4ge1xuICAgICAgICB0aGlzLmVycm9yZm4oeGhyLCB0ZXh0U3RhdHVzLCBlcnJvclRocm93bik7XG4gICAgICB9KS5hbHdheXMoKCkgPT4ge1xuICAgICAgICB0aGlzLnNhdmVJblByb2dyZXNzID0gZmFsc2U7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBSZWdpc3RyYXRpb25Gb3JtOyAvL3NldCB3aGF0IGNhbiBiZSBpbXBvcnRlZCBmcm9tIHRoaXMgZmlsZVxuIiwidmFyIFNjcm9sbERvd24gPSAoKSA9PiB7XG5cbiAgdmFyIGFuaW1hdGUgPSAodGFyZ2V0KSA9PiB7XG4gICAgJCgnaHRtbCwgYm9keScpLmFuaW1hdGUoe1xuICAgICAgICAgICAgc2Nyb2xsVG9wOiB0YXJnZXQub2Zmc2V0KCkudG9wXG4gICAgfSwgMTAwMCk7XG4gIH1cblxuICAkKCcuanMtaC1hcnJvdy1kb3duJykub24oJ2NsaWNrJywgKGUpID0+IHtcbiAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGFuaW1hdGUoJCgnI2ludHJvJykpO1xuICB9KTtcblxuICAkKCdhW2hyZWZePVwiI1wiXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgdmFyIHRhcmdldCA9ICQodGhpcy5oYXNoKTtcbiAgICBpZiggdGFyZ2V0Lmxlbmd0aCA+IDApIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBhbmltYXRlKHRhcmdldCk7XG4gICAgfVxuICB9KTtcblxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IFNjcm9sbERvd247XG4iLCIvL2ltcG9ydHMvUmVnaXN0cmF0aW9uRm9ybSAuanNcblxudmFyIGVudl91cmwgPSAnaHR0cDovL29wZW5ob3VzZS50aGVoYW5nYXIuY3IvJztcblxuaWYgKHdpbmRvdy5fX2Vudikge1xuICBlbnZfdXJsID0gd2luZG93Ll9fZW52LnVybDtcbn1cblxudmFyIHVybCA9IGVuY29kZVVSSUNvbXBvbmVudChlbnZfdXJsKTtcblxudmFyIGZhY2Vib29rU3RyaW5nID0gYGh0dHA6Ly93d3cuZmFjZWJvb2suY29tL3NoYXJlci5waHA/cz0xMDAmcFt1cmxdPSR7dXJsfWA7XG52YXIgZ29vZ2xlU3RyaW5nID0gYGh0dHBzOi8vcGx1cy5nb29nbGUuY29tL3NoYXJlP3VybD0ke3VybH1gO1xuXG52YXIgdGl0bGUgPSAgZW5jb2RlVVJJQ29tcG9uZW50KCdBIHBsYWNlIG9mIGdyZWF0IG9wcG9ydHVuaXRpZXMgIC0gSm9pbiB1cyBhdCB0aGUgQEhhbmdhcl9jciAjT3BlbkhvdXNlJyk7XG52YXIgdHdpdHRlclN0cmluZyA9IGBodHRwczovL3R3aXR0ZXIuY29tL3NoYXJlP3RleHQ9JHt0aXRsZX0mdXJsPSR7dXJsfWA7XG5cbmNsYXNzIFNoYXJlIHtcbiAgICBjb25zdHJ1Y3RvcihkZWJ1ZyA9IGZhbHNlKSB7XG4gICAgICB0aGlzLmZhY2Vib29rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2pzLXNvY2lhbC1mYicpO1xuICAgICAgdGhpcy50d2l0dGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2pzLXNvY2lhbC10dycpO1xuICAgICAgdGhpcy5nb29nbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjanMtc29jaWFsLWdvJyk7XG5cbiAgICAgIHRoaXMuZmFjZWJvb2suaHJlZiA9IGZhY2Vib29rU3RyaW5nO1xuICAgICAgdGhpcy5mYWNlYm9vay5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaW5rLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMuZ29vZ2xlLmhyZWYgPSBnb29nbGVTdHJpbmc7XG4gICAgICB0aGlzLmdvb2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaW5rLCBmYWxzZSk7XG5cbiAgICAgIHRoaXMudHdpdHRlci5ocmVmID0gdHdpdHRlclN0cmluZztcbiAgICAgIHRoaXMudHdpdHRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMuY2xpY2tMaW5rLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgY2xpY2tMaW5rIChlKSB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB3aW5kb3cub3Blbih0aGlzLmhyZWYsJycsICdtZW51YmFyPW5vLHRvb2xiYXI9bm8scmVzaXphYmxlPXllcyxzY3JvbGxiYXJzPXllcyxoZWlnaHQ9NjIwLHdpZHRoPTUwMCcpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBTaGFyZTsgLy9zZXQgd2hhdCBjYW4gYmUgaW1wb3J0ZWQgZnJvbSB0aGlzIGZpbGVcbiJdfQ==
