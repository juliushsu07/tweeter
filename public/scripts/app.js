// serialized adds 5 characters "text=" to the max length of the tweet.
const tweetSerializedMaxLength = 145;

let createTweetElement = function(tweet) {
  return $(`
              <article class="tweet">
                <header><img src="${escape(tweet.user.avatars.small)}">
                  <h2>${escape(tweet.user.name)}</h2><span>${escape(tweet.user.handle)}</span>
                </header>
                <p>${escape(tweet.content.text)}</p>
                <footer>
                  <P>${escape(moment(tweet.created_at).fromNow())}</P>
                  <ul>
                    <li> <img src="/images/comment.png"> </li>
                    <li> <img src="/images/retweet.png"> </li>
                    <li> <img src="/images/like.png"> </li>
                  </ul>
                </footer>
              </article>`
            )
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

let renderTweets = function(tweets) {
  // loops through tweets
  for (tweet of tweets) {
    // calls createTweetElement for each tweet
    let $tweet = createTweetElement(tweet);
    // takes return value and appends it to the tweets container
    $('.tweets').prepend($tweet);
  }
}

let loadTweets = function() {
  $.ajax({
    url: '/tweets',
    method: 'GET',
    success: function(data) {
      renderTweets(data);
    }
  });
}

let submitNewTweet = function() {
  $('form').submit(function(event) {
    event.preventDefault();

    let text = $(this).serialize();

    if(text.length > tweetSerializedMaxLength){

      alert('Tweet cannt exceed 140 words!');
      return;
    }
      $.ajax({
      url: '/tweets',
      method: 'POST',
      data: text,
      success: function(data) {
                renderTweets(data);
                $('.tweets').empty();
                loadTweets();
      },
      error: function(emptyErr) {
        alert('Tweet cannt be empty!', emptyErr);
      }
      });
  });
}

let hoverCompose = function() {
  let button = $('button')
  button.hover(function(){
    $(this).find('img').attr('src','/images/compose_black.png')
  })
  button.mouseleave(function(){
    $(this).find('img').attr('src','/images/compose_green.png')
  })
  button.click(function(){
    $('.new-tweet').toggle("fast",function(){
    })
  });
}

$(() => {
  hoverCompose();
  loadTweets();
  submitNewTweet();
})



