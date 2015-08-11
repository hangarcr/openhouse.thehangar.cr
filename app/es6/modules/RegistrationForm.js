//imports/RegistrationForm .js
class RegistrationForm {
    constructor(debug = false){
      this.element = document.getElementById('formRegistration');

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
