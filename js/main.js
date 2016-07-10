// intersting thing about the bonus is that it's actually helping me code faster,
// becasue I wrote the testing specs first, so this js file is relatively simpler to code


// In MV-whatever, this the model part

var feeds = [
  {
    name:'Dafault',
    url: 'https://queryfeed.net/twitter?q=%40pinkoi&title-type=user-name-both&geocode='
  }
];

// this application is relatively simple, one variable, one function, nothing more
// in MV-whatever, this is the whatever part

function loadFeed(index){
  $('.result').html('<div class="loading"> <img src="https://www.script-tutorials.com/demos/82/images/loading.gif" alt="loading RSS feed" /> </div>');

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
            //I will split this to make the RSS feed look like twitter tweet,
            //in my second time code submit, i fix this string spliting bug, now it's safer
            var tweetArray = result.feed.entries[i].title.split(' @');
            var name = tweetArray[0];
            var at = tweetArray[1];
            at = '@' + at;
            // console.log(result.feed.entries[i].title);
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
  feedListUpdate();
}



// I got this code snipet from google's offical documentation
function initialize() {
  loadFeed(0);
}

google.load("feeds", "1");
google.setOnLoadCallback(initialize);

feedListUpdate();

function feedListUpdate(){
  var $feedList = $('.feed-list-ul')
  $feedList.html('');
  for(var i=0; i<feeds.length; i++){
    var $li = $('<li></li>');
    $li.html(feeds[i].name);
    //add click listerner, bad idea, but temp solution
    $li.attr('onclick', 'listOnClick(event)');
    $feedList.append($li);
  }
}



// this is the event listner
$('.admin-button').click(function(){
  $('.admin-content').toggleClass('visible');
});


//this one handle the add button
$('.admin-feed-add').click(function(){
  var name = $('.admin-feed-name').val();
  var url = $('.admin-feed-url').val();
  if(name !== '' && url !== ''){
    addToFeedsArray(name, url);
  }else {
    alert('input something valid');
  }
});

//when feed list is click


// I know this is a bad idea, but somehow my event listerner don't work, this is only a temp solution
function listOnClick(event){
  var elem = event.target;
  var name = elem.innerText;
  var index;

  // to find out which feed list is being click
  for (var i = 0; i < feeds.length; i++){
    if(name==feeds[i].name){
      index = i;
    }
  }
  // call to loadFeed function to load the new feed
  loadFeed(index);
  $('.admin-content').toggleClass('visible');
}
