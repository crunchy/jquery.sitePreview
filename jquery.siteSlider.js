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
      for(var i=0; i < $slides.length; i++) {
        $(options.paginateTag).append("<a href='#' data-id="+i+" class='pager'>.</a>");
      }

      $slides.find('img').bind('mouseover', options, _handleHovers);
      $slides.find('img').bind('mouseout', options, _handleOut);
    });
  };

  function _handleHovers(e) {
    $(this).animate({
      'left': $(this).parents('.slide').position().left - $(this).parent().position().left
    });
  };

  function _handleOut(e) {
    $(this).animate({
      'left': 0
    });
  };

})( jQuery );

