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
      $($slides[i]).data('id', i);
      $(options.paginateTag).append("<a href='#' data-id="+i+" class='pager'>.</a>");
    }
    $('.pager').first().addClass('active');

    // bind actions //
    if(options.expandImage == true) {
      $slides.find('img').bind('mouseover', options, _handleHovers);
      $slides.find('img').bind('mouseout', options, _handleOut);
    }

    $('.nav').bind("click", options, _handleNav);
    $('.pager').bind("click", options, _handlePage);
    if(options.auto == true) {
      startAutoScroll(options);
    }

    options.el.width(options.width).height(options.height);
    var $viewer = $('#slide-viewer').css('width', options.width-60).height(options.height);

    // setup sizing //
    var slideWidth = $viewer.width()/2 - 60;
    var numberOfSlides = $slides.length;

    $('#slides').css('width', (slideWidth+60) * numberOfSlides);

    // slides sizing
    $(options.slideTag).width(slideWidth).height(options.height-60);
    $('img', options.slideTag).height(options.height-60);


    // position nav
    var navPos = (options.height / 2) - ($('.nav').innerHeight() / 2);
    $('.nav').css('margin-top', navPos);
  };

  function startAutoScroll(opts) {
    opts.runningInterval = interval = setInterval(function() {
        _handleNav(opts, true);
      }, opts.autoInterval * 1000);
  };

  function stopAutoScroll(opts) {
    clearInterval(opts.runningInterval);
  };

  function _handleNav(e, auto) {
    var slideWidth = $($('.slide')[0]).innerWidth() + 20
      , pos = parseInt($('#slides').css('margin-left'))
      , max = $('#slides').width() - $('#slide-viewer').width()
      , forward = ($(this).attr('id') == "next" || auto)
      , $active = $('.pager.active')
      , id = $active.data('id');

    if(!auto) {
      stopAutoScroll(e.data);
      startAutoScroll(e.data);
    }

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

  function _handlePage(e) {
    var slideWidth = $($('.slide')[0]).innerWidth() + 20
      , pos = parseInt($('#slides').css('margin-left'))
      , curr = $('.pager.active').removeClass('active').data('id')
      , to = $(this).addClass('active').data('id');

    stopAutoScroll(e.data);
    startAutoScroll(e.data);

    $('#slides').animate({'margin-left': pos + ((curr - to) * slideWidth)});
  };

  function _handleHovers(e) {
    stopAutoScroll(e.data);
    $(this).animate({
      'left': $(this).parents(e.data.slideTag).position().left - $(this).parent().position().left + 30
    });
  };

  function _handleOut(e) {
    startAutoScroll(e.data);
    $(this).animate({
      'left': 0
    });
  };

})( jQuery );

