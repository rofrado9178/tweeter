$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").keyup(function (event) {
    const tweetCount = this.value.length;
    const maxChar = 140;
    const counterId = $("#tweet-count");
    const tweetSubmit = $(".tweet-logo");
    counterId.text(maxChar - tweetCount);
    console.log();
    if (tweetCount > maxChar) {
      counterId.addClass("count-color");
      tweetSubmit.prop("disabled", true);
      tweetSubmit.addClass("tweet-submit");
    } else {
      counterId.removeClass("count-color");
      tweetSubmit.prop("disabled", false);
      tweetSubmit.removeClass("tweet-submit");
    }
  });
});
