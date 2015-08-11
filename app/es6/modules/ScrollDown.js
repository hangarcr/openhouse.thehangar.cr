var ScrollDown = () => {

  var animate = (target) => {
    $('html, body').animate({
            scrollTop: target.offset().top
    }, 1000);
  }

  $('.js-h-arrow-down').on('click', (e) => {
     e.preventDefault();
    animate($('#intro'));
  });

  $('a[href^="#"]').on('click', function (e) {
    var target = $(this.hash);
    if( target.length ) {
        e.preventDefault();
        animate(target);
    }
  });

}

module.exports = ScrollDown;
