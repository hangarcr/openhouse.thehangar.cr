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

class RegistrationForm {
  constructor(debug = false) {
    // this.postURL = 'http://openhouse.hangar.agency:@openhouse.hangar.agency/attendees';
    this.postURL = 'http://localhost:3000/registration';

    this.element = document.getElementById('formRegistration');
    this.modal = document.getElementById('openhouse-thanks');

    this.fullname = this.element.querySelector('#fullname');
    this.email = this.element.querySelector('#email');
    this.phone = this.element.querySelector('#phone');
    this.checkboxList = this.element.querySelector('.mdl-checkbox__input');

    // Attach submit event
    this.element.addEventListener("submit", (e) => {
      e.preventDefault();
      this.save();
    });

    // Notification settings
    toastr.options = {
      closeButton: true,
      positionClass: "toast-top-right"
    }

  }

  // validate form
  validate () {
    var values = validate.collectFormValues(this.element);
    var errors = validate(values, constraints);

    console.log(errors);

    if (errors) {
      this.showErros(errors);
      return false;
    }
    return true;
  }

  showErros (errors) {
    let stringErrors = '';
    Object.keys(errors).forEach(function (key) {
      toastr.error(errors[key]);
    });
  }

  successfn (xhr) {
    console.log(xhr);
  }
  successfn (error) {
    console.log(error);
  }

  save () {
    // clean messages
    toastr.clear();

    if (this.validate()) {
      console.log('submit form');

      var data =  $( this.element ).serializeArray();

      $.post(this.postURL, data).done(this.successfn).fail(this.errorfn);
    }
  }
}

module.exports = RegistrationForm; //set what can be imported from this file
