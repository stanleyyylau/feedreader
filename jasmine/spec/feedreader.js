$(function(){

  // the first test suite will check if feeds array is defined and have at least one value
  describe('Feeds array', function(){
    it('are defined', function(){
      expect(feeds).toBeDefined();
    });

    it('not empty', function(){
      expect(feeds.length).not.toBe(0);
    });

  });

  // for the second one I will check to make sure the app show the loading image before RSS feed loading finishes
  describe('Loading image', function(){
    it('was shown', function(){
      expect($('.loading')).not.toBe(0);
    });
  });

  // there will be new content after feed loading finishes
  describe('When Feed loading is done', function(){
    // I learn this little trick from Udacity's code review, this is used to handle asynchronous request
    // what it does is before each specs, run this little function first and only after this function is done, thus passing the done argument
    // go away and run the specs below
    beforeEach(function(done) {
      loadFeed(0,function(){
        done();
      });
    });

    it('there will be new content', function(){
      expect($('article').length).not.toBe(0);

    });

  });


}());
