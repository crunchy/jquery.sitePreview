(function( $ ){
  $.fn.siteSlider = function( settings ) {
    var options = _.extend({}, {
      expandImage: true,
      width: 800,
      height: 350,
      auto: true,
      slideTag: '.slide',
      paginateTag: '#paginate'
    }, settings);

    options.el = this;

    $slides = $(options.slideTag);

    return this.each(function() {

      _init(options);

      var slideWidth = $($('.slide')[0]).innerWidth() + 20;
      var numberOfSlides = $slides.length;

      $('#slides').css('width', slideWidth * numberOfSlides);
      $('#slide-viewer').css('width', (slideWidth * 2));

    });
  };

  function _init(options) {
    // setup the paginator
    for(var i=1; i < $slides.length; i++) {
      $(options.paginateTag).append("<a href='#' data-id="+i+" class='pager'>.</a>");
    }
    $('.pager').first().addClass('active');

    $slides.find('img').bind('mouseover', options, _handleHovers);
    $slides.find('img').bind('mouseout', options, _handleOut);
    $('.nav').bind("click", options, _handleNav);
  };

  function _handleNav(e) {
    var slideWidth = $($('.slide')[0]).innerWidth() + 20
      , pos = parseInt($('#slides').css('margin-left'))
      , max = $('#slides').width() - $('#slide-viewer').width()
      , forward = $(this).attr('id') == "next"
      , $active = $('.pager.active')
      , id = $active.data('id');

    if ( pos == 0 && !forward ) {
      return;
    } else if ( pos <= -max && forward ) {
      $('#slides').animate({ 'margin-left': 0 });
      $active.removeClass('active');
      $('.pager').first().addClass('active');
    } else {
      $('#slides').animate({ 'margin-left': forward ? pos-slideWidth : pos+slideWidth });
      $active.removeClass('active').siblings('[data-id="'+ (forward ? id+1 : id-1) +'"]').addClass('active');
    }
  };

  function _handleHovers(e) {
    $(this).animate({
      'left': $(this).parents('.slide').position().left - $(this).parent().position().left + 20
    });
  };

  function _handleOut(e) {
    $(this).animate({
      'left': 0
    });
  };

})( jQuery );

