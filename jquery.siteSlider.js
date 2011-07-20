(function( $ ){
  $.fn.siteSlider = function( settings ) {
    var options = _.extend({}, {
      expandImage: true,
      width: 800,
      height: 200,
      auto: true,
      autoInterval: 5,
      slideTag: '.slide',
      paginateTag: '#paginate'
    }, settings);

    options.el = this;

    return this.each(function() {
      _init(options);
    });
  };

  function _init(options) {
    var $slides = $(options.slideTag);

    // setup the paginator //
    for(var i=1; i < $slides.length; i++) {
      $(options.paginateTag).append("<a href='#' data-id="+i+" class='pager'>.</a>");
    }
    $('.pager').first().addClass('active');

    // bind actions //
    if(options.expandImage == true) {
      $slides.find('img').bind('mouseover', options, _handleHovers);
      $slides.find('img').bind('mouseout', options, _handleOut);
    }

    $('.nav').bind("click", options, _handleNav);
    if(options.auto == true) {
      setInterval(function() {
        _handleNav(options, true);
      }, options.autoInterval * 1000);
    }

    options.el.width(options.width).height(options.height);
    var $viewer = $('#slide-viewer').css('width', options.width-60).height(options.height);

    // setup sizing //
    var slideWidth = $viewer.width()/2 - 60;
    var numberOfSlides = $slides.length;

    $('#slides').css('width', (slideWidth+60) * numberOfSlides);

    // slides
    $(options.slideTag).width(slideWidth).height(options.height-60);
    $('img', options.slideTag).height(options.height-60);


    // position nav
    var navPos = (options.height / 2) - ($('.nav').innerHeight() / 2);
    $('.nav').css('margin-top', navPos);

  };

  function _handleNav(e, auto) {
    var slideWidth = $($('.slide')[0]).innerWidth() + 20
      , pos = parseInt($('#slides').css('margin-left'))
      , max = $('#slides').width() - $('#slide-viewer').width()
      , forward = ($(this).attr('id') == "next" || auto)
      , $active = $('.pager.active')
      , id = $active.data('id');

    if ( pos == 0 && !forward ) {
      return;
    } else if ( pos <= -max && (forward || auto) ) {
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
      'left': $(this).parents(e.data.slideTag).position().left - $(this).parent().position().left + 30
    });
  };

  function _handleOut(e) {
    $(this).animate({
      'left': 0
    });
  };

})( jQuery );

