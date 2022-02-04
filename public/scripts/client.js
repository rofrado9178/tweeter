/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//document ready so any javascript will be executed after all html file loaded
$(document).ready(function () {
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  //function that will append new tweet to the last child of element
  const renderTweets = function (tweets) {
    $("#tweets-container").empty();
    //loop through the tweet data and append to element container
    for (const key in tweets) {
      let $tweet = createTweetElement(tweets[key]);
      $("#tweets-container").prepend($tweet);
    }
  };

  //create element of the tweet
  const createTweetElement = function (tweet) {
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
      ${escape(tweet.content.text)}
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
  const loadTweets = function () {
    $.ajax({
      url: "/tweets",
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
    const serializeData = $(this).serialize();
    const tweetLength = $("#tweet-text").val().length;
    //text that will be print on error message
    const exceedChar = `<p>
    <i class="fas fa-exclamation-triangle"></i> Your tweet cannot exceed
    more than 140 characters
    <i class="fas fa-exclamation-triangle"></i>
  </p>`;
    const emptyString = ` <p>
  <i class="fas fa-exclamation-triangle"></i> Your tweet cannot be an
  empty characters
  <i class="fas fa-exclamation-triangle"></i>
</p>`;
    //show error message if textarea is empty string or exceed max chars
    const warning = function (addclass) {
      $("#warning").slideUp(1000, function () {
        $("#warning").empty();
        $("#warning").append(addclass);
      });
      $("#warning").slideDown(1500);
    };

    if (tweetLength > 140) {
      warning(exceedChar);
    } else if ($("#tweet-text").val() === "") {
      warning(emptyString);
    }
    //if condtion is true
    else {
      $.post("/tweets", serializeData, function (data) {
        $("#tweet-text").val("").empty();
        $("#tweet-count").val(140);
        $("#warning").slideUp();
        loadTweets();
      });
    }
  });

  //toogle write post effect ---- stretch
  $(".write-tweet").click(function () {
    $(".new-tweet").toggle("slow");
    $("#tweet-text").focus();
  });
});
