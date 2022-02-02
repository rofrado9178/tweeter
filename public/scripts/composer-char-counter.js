$(document).ready(function () {
  // --- our code goes here ---
  $("#tweet-text").keyup(function (event) {
    const tweetCount = this.value.length;
    const maxChar = 140;

    $("#tweet-count").text(maxChar - tweetCount);
    console.log();
    if (tweetCount > maxChar) {
      $("#tweet-count").addClass("count-color");
    } else {
      $("#tweet-count").removeClass("count-color");
    }
  });
});
