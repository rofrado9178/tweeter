$(document).ready(function () {
  // --- our code goes here ---

  //add event listener for the text area and count the characters
  $("#tweet-text").keyup(function () {
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
