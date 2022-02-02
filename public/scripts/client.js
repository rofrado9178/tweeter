/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// const tweetsData = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": "https://i.imgur.com/73hZDYK.png",
//       "handle": "@SirIsaac",
//     },
//     "content": {
//       "text":
//         "If I have seen further it is by standing on the shoulders of giants",
//     },
//     "created_at": 1643552739858,
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": "https://i.imgur.com/nlhLi3I.png",
//       "handle": "@rd",
//     },
//     "content": {
//       "text": "Je pense , donc je suis",
//     },
//     "created_at": 1643639139858,
//   },
// ];

//document ready so any javascript will be executed after all html file loaded
$(document).ready(function () {
  //function that will append new tweet to the last child of element
  const renderTweets = function (tweets) {
    //loop through the tweet data and append to element container
    for (const key in tweets) {
      let $tweet = createTweetElement(tweets[key]);
      $("#tweets-container").append($tweet);
    }
  };

  //create element of the tweet
  const createTweetElement = (tweet) => {
    let $tweet = `
  <article>
  <div class="tweet-container">
    <header>
      <div class="name">
        <img src="${tweet.user.avatars}" alt="avatar" />
        <p>${tweet.user.name}</p>
      </div>
      <p class="username">${tweet.user.handle}</p>
    </header>
    <p class="tweet-content">
      ${tweet.content.text}
    </p>
    <div class="tweet-border"></div>
    <footer>
      <p>${timeago.format(tweet.created_at)}</p>
      <ul class="tweet-icons">
        <li><i class="fas fa-flag"></i></li>
        <li><i class="fas fa-retweet"></i></li>
        <li><i class="fas fa-heart"></i></li>
      </ul>
    </footer>
  </div> 
</article>
  
  `;
    return $tweet;
  };

  //send get request from tweets path and render it
  const loadTweets = () => {
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: "GET",
      success: function (data) {
        renderTweets(data);
      },
      error: function (err) {
        return err;
      },
    });
  };
  loadTweets();

  //post new tweet with submit request
  $("#submit-tweet").submit(function (event) {
    event.preventDefault();

    //condition check if tweet is empty or more than max char
    const data = $(this).serialize();
    if (data !== "" || data !== null || data.length > 140) {
      return alert("Cannot Submit tweet");
    }
    //if condtion is true
    $.ajax({
      url: "http://localhost:8080/tweets",
      type: "POST",
      data: data,
      success: function (data) {
        console.log(data);
      },
      error: function (err) {
        return err;
      },
    });
  });
});
