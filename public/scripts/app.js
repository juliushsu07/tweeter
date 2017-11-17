const tweetMaxLength = 140;

let createTweetElement = function(tweet) {
  return $(`
              <article class="tweet">
                <header><img src="${tweet.user.avatars.small}">
                  <h2>${tweet.user.name}</h2><span>${tweet.user.handle}</span>
                </header>
                <p>${tweet.content.text}</p>
                <footer>
                  <P>${tweet.created_at} days ago</P>
                  <ul>
                    <li> <img src="/images/comment.png"> </li>
                    <li> <img src="/images/retweet.png"> </li>
                    <li> <img src="/images/like.png"> </li>
                  </ul>
                </footer>
              </article>`
            )
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

    $.ajax({
    url: '/tweets',
    method: 'POST',
    data: text,
    success: function(data) {
              if(text !== null && text !== "" && text.length <= tweetMaxLength){
                renderTweets(data);
                $('.tweets').empty();
                loadTweets();
              } else{
                alert('Tweet cannt be empty or exceed 140 words!');
              }
    },
    error: function() {
      alert('Tweet cannot be empty!');
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



