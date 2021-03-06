//imports/RegistrationForm .js

var env_url = 'http://openhouse.thehangar.cr?v=54321';
var url = encodeURIComponent(env_url);

var facebookString = `http://www.facebook.com/sharer.php?s=100&p[url]=${url}`;
var googleString = `https://plus.google.com/share?url=${url}`;

var title =  encodeURIComponent('A place of great opportunities  - Join us at the @Hangar_cr #OpenHouse');
var twitterString = `https://twitter.com/share?text=${title}&url=${url}`;

class Share {
    constructor(debug = false) {
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

    clickLink (e) {
      e.preventDefault();
      window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=620,width=500');
      return false;
    }
}

module.exports = Share; //set what can be imported from this file
