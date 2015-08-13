//imports/RegistrationForm .js

// Validation Rules
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

class RegistrationForm {
  constructor(debug = false) {
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
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();

      if (this.saveInProgress) {
        toastr.info('Your info is still saving please wait .. !');
        return false;
      }

      this.save();
    });

    // Notification settings
    toastr.options = {
      closeButton: true,
      timeOut: 15000,
      newestOnTop: true,
      positionClass: "toast-top-right"
    }

  }

  // validate form
  validate () {
    var values = validate.collectFormValues(this.element);
    var errors = validate(values, constraints);

    if (errors) {
      this.showErrors(errors);
      return false;
    }
    return true;
  }

  showErrors (errors) {
    let stringErrors = '';
    Object.keys(errors).forEach(function (key) {
      toastr.error(errors[key]);
    });
  }

  errorfn (xhr, textStatus, errorThrown) {
    this.showErrors({ error: ['Oops! An error occurred! Please try again!'] });
  }

  cleanInputs () {
    this.fullname.value = '';
    this.email.value = '';
    this.phone.value = '';
    this.hear_question.selectedIndex = 0;

    this.checkboxList.filter(':checked').removeAttr('checked');
    $('.mdl-js-checkbox').removeClass('is-checked');
  }


  save () {
    // clean messages
    toastr.clear();

    if (this.validate()) {

      this.saveInProgress = true;

      var data =  $( this.element ).serializeArray();

      $.post(this.postURL, data).done( (xhr) => {
        if (!xhr.success) {
          this.showErrors(xhr.errors);
        } else {
          $(this.modal).modal('show');
          this.cleanInputs();
        }
      }).fail( (xhr, textStatus, errorThrown) => {
        this.errorfn(xhr, textStatus, errorThrown);
      }).always(() => {
        this.saveInProgress = false;
      });
    }
  }
}

module.exports = RegistrationForm; //set what can be imported from this file
