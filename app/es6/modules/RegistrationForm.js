//imports/RegistrationForm .js

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

class RegistrationForm {
    constructor(debug = false){
      this.element = document.getElementById('formRegistration');
      this.modal = document.getElementById('openhouse-thanks');

      this.fullname = this.element.querySelector('#fullname');
      this.email = this.element.querySelector('#email');
      this.phone = this.element.querySelector('#phone');
      this.checkboxList = this.element.querySelector('.mdl-checkbox__input');
    }

    // validate form
    validate () {

    }

    save () {
        // debugger;
        console.log("Hello, I am ", this); //this == the object instance.
    }
}

module.exports = RegistrationForm; //set what can be imported from this file
