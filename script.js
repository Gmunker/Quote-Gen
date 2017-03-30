$(function() {

  var $backImage = document.getElementById('backgroundImage');
  var $genBtn = $('#new-quote');
  var $tweetBtn = $('#tweetBtn');
  var $twitterDiv = $('#twitterDiv');
  var quote = "";
  
  function customEncodeURIComponent(URI) {
    return encodeURIComponent(URI).replace(/'/g, "%27");
  }
  
  function tweet(message) {
    window.open('https://twitter.com/intent/tweet?text=' + customEncodeURIComponent(message) + ' &via=Gmunker&hashtags=munkerDesigns', 'Tweet');
  }; // Twitter Share Function
  
  $tweetBtn.click(function() {
    tweet(quote);
  }); // Twitter Share Button
  
  function getRandomColor() {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  } //getRandomColor Function

  $.getJSON("http://api.flickr.com/services/feeds/photos_public.gne", function(data){
   var items = data.items, // array
       extract = [], // array
       max = 12; // number of items to remove
   for (var i=0; i<max; i++) {
     var rand = Math.floor(Math.random()*items.length); // a random index
     extract.push(items.splice(rand,1)[0]); // splice() returns an array
   };
   $backImage.src = extract;
});
  
  function getQuote() {
    $.ajax({
    headers: {
      "X-Mashape-Key": "OivH71yd3tmshl9YKzFH7BTzBVRQp1RaKLajsnafgL2aPsfP9V",
      Accept: "application/json",
      "Content-Type": "application/x-www-form-urlencoded"
    },
    url: 'https://andruxnet-random-famous-quotes.p.mashape.com/cat=',
    success: function(response) {
      var content = JSON.parse(response);
      $('#quote').html("&#8220;" + content.quote + "&#8221;");
      $('#author').html(content.author);
      quote = content.quote;
      console.log(data);
    }
    });
  }//getQuote Function
  
  $genBtn.on('click', function() {
    $('body').css("background-color", getRandomColor());
    getQuote();
  });//genBtn Click

  $('body').css("background-color", getRandomColor());
  getQuote();
});//Ready