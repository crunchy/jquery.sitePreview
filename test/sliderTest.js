describe("siteSlider", function() {
  jasmine.getFixtures().fixturesPath = 'fixtures';

  beforeEach(function() {
    loadFixtures("basic-slider.html");
  });

  it("should create a generic slider", function() {
    $('#site-preview').siteSlider();

    spyOnEvent($('.slide img').first(), 'mouseover');

    expect($('#site-preview').width()).toEqual(800);
    expect($('#site-preview').height()).toEqual(200);
    expect($('.pager').length).toEqual(2);
    expect($('.pager.active').data('id')).toEqual(1);

    $('.slide img').first().mouseover();
    expect('mouseover').toHaveBeenTriggeredOn($('.slide img').first());

    waits(500);
    runs(function() {
      expect($('.slide img').first().css('left')).toEqual('30px');
    });
  });

  it("should allow slide navigation", function() {
    $('#site-preview').siteSlider();

    spyOnEvent($('#next'), 'click');
    spyOnEvent($('#prev'), 'click');

    runs(function() {
      $('#next').click();
      expect('click').toHaveBeenTriggeredOn($('#next'));
      expect($('.pager.active').data('id')).toEqual(2);
    });

    // need a delay because of the limiter
    waits(500);

    runs(function() {
      $('#prev').click();
      expect('click').toHaveBeenTriggeredOn($('#prev'));
      expect($('.pager.active').data('id')).toEqual(1);
    });
  });

  it("should loop slides when moving forward", function() {
    $('#site-preview').siteSlider();
    runs(function() {
      $('#next').click();
      expect($('.pager.active').data('id')).toEqual(2);
    });

    // need a delay because of the limiter
    waits(500);

    runs(function() {
      $('#next').click();
    });

    waits(500);

    runs(function() {
      $('#next').click();
      //should flip back around to 1
      expect($('.pager.active').data('id')).toEqual(1);
    });
  });

  it("should allow setting of slider options", function() {
    $('#site-preview').siteSlider({width: 1000, height: 400, auto: false, autoInterval: 1, expandImage: false});

    expect($('#site-preview').width()).toEqual(1000);
    expect($('#site-preview').height()).toEqual(400);
    expect($('.pager.active').data('id')).toEqual(1);

    $('.slide img').first().mouseover();

    waits(1500);

    runs(function() {
      // should be no change since active is disabled
      console.log($('.pager'));

      expect($('.pager.active').data('id')).toEqual(1);
      expect($('.slide img').first().css('left')).toEqual('auto');
    });
  });

  it("should auto scroll", function() {
    $('#site-preview').siteSlider({autoInterval: 1});

    waits(1500);
    runs(function() {
      expect($('.pager.active').data('id')).toEqual(2);
    });
  });
});
