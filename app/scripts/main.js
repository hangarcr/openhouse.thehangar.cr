// jsLint
/*global FastClick $*/

$(function() {
  'use strict';
  FastClick.attach(document.body);

  $('.js-h-arrow-down').click(function(e) {
    e.preventDefault();
    $('html, body').animate({
        scrollTop: $('#intro').offset().top
    }, 800);
  });


});

// onclick="javascript:window.open(this.href,'', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=620,width=500');return false;",
// href='https://twitter.com/share?text=#{encodeURIComponent(tags.title)}&via=#{tags.twitter}&url=#{encodeURIComponent(tags.url)}')
