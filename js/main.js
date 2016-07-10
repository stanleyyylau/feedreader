// intersting thing about the bonus is that it's actually helping me code faster,
// becasue I wrote the testing specs first, so this js file is relatively simpler to code


// In MV-whatever, this the model part

var feeds = [
  {
    name:'Dafault Feed',
    url: 'https://queryfeed.net/twitter?q=%40pinkoi&title-type=user-name-both&geocode='
  }
];

// this application is relatively simple, one variable, one function, nothing more
// in MV-whatever, this is the whatever part

function loadFeed(index){
  var feed = new google.feeds.Feed(feeds[index].url);
  feed.setNumEntries(10);
  feed.load(function(result) {
    if (!result.error) {
      // after RSS finish loading, we will remove that loading image
      var $result = $('.result');
      $result.html('');
      // now let's build the feed header
      var feedHeaderDes = $('<p class="feed-des"></p>');
      feedHeaderDes.html(result.feed.description);

      var queryFeed = $('<h2></h2>');
      queryFeed.html(result.feed.title);

      var feedUrl = '<p class="feed-url"> feedUrl: <span>%data</span></p>';
      feedUrl = $(feedUrl.replace('%data',result.feed.feedUrl));

      $result.append(feedHeaderDes);
      $result.append(queryFeed);
      $result.append(feedUrl);

      // let's now loop through the entries and append them, here I use a %data - replace trick from the online-resume project
      for(var i = 0 ; i<result.feed.entries.length; i++){
          var $article = '<article> <div class="feeditem-title"> <img class="tweet-logo" src="http://placehold.it/45x45"> <span><a class="feeditem-link" href="%data-url">%data-name</a></span><br> <span class="at">%data-at</span> </div> <div class="feeditem-content"> %data-content</div> <div class="feeditem-date"> <span>%data-date</span> </div> </article>';
            $article = $article.replace('%data-url',result.feed.entries[i].link);
            // $article = $article.replace('%data-title',result.feed.entries[i].title);
            //I will split this to make the RSS feed look like twitter tweet
            var tweetArray = result.feed.entries[i].title.split(' ');
            var name = tweetArray[0];
            var at = tweetArray[1];
            console.log(result.feed.entries[i].title);
            $article = $article.replace('%data-name',name);
            $article = $article.replace('%data-at',at);
            $article = $article.replace('%data-content',result.feed.entries[i].content);
            // here i'll perform some string manipulation tricks
            var yearIndex = result.feed.entries[i].publishedDate.indexOf('2016');
            var date = result.feed.entries[i].publishedDate.substr(0, yearIndex);
            // alert(tweetDate);
            $article = $article.replace('%data-date',date);

            // let's convert $article to jquery object
            $article = $($article);
        $result.append($article);
      }

      console.log(result);
    }
  });
}

function addToFeedsArray(name, url){
  var newFeedObject = {
    name: name,
    url: url
  }

  feeds.push(newFeedObject);
}

// I got this code snipet from google's offical documentation
function initialize() {
  loadFeed(0);
}

google.load("feeds", "1");
google.setOnLoadCallback(initialize);

loadFeed(0);
