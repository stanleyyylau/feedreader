$(function(){

  // the first test suite will check if feeds array is defined and have at least one value
  describe('Feeds array', function(){
    it('are defined', function(){
      expect(feeds).toBeDefined();
    });

    it('not empty', function(){
      expect(feeds.length).not.toBe(0);
    });

    it('made of objects with name and url property', function(){
      expect(feeds[0].name).toBeDefined();
      expect(feeds[0].url).toBeDefined();
      expect(feeds[0].name).not.toBe('');
      expect(feeds[0].url).not.toBe('');
    });

  });

  // new function for second code submit
  describe('additional function', function(){
    it('addToFeedsArray function are define', function(){
      expect(addToFeedsArray).toBeDefined();
    });

    it('can add url and new to feeds array', function(){
      addToFeedsArray('Jasmine Test Feed', 'https://queryfeed.net/twitter?q=javascript&title-type=user-name-both&geocode=');
      expect(feeds[feeds.length-1].name).toBe('Jasmine Test Feed');
      expect(feeds[feeds.length-1].url).toBe('https://queryfeed.net/twitter?q=javascript&title-type=user-name-both&geocode=');
    });
  });


  // for the second one I will check to make sure the app show the loading image before RSS feed loading finishes
  describe('Loading image', function(){
    it('was shown', function(){
      expect($('.loading')).not.toBe(0);
    });
  });



}());
