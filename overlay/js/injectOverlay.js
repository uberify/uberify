// WebFontConfig = {
//     google: { families: [ 'Lato:400,300,100,700:latin' ] }
//   };
//   (function() {
//     var wf = document.createElement('script');
//     wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
//       '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
//     wf.type = 'text/javascript';
//     wf.async = 'true';
//     var s = document.getElementsByTagName('script')[0];
//     s.parentNode.insertBefore(wf, s);
//   })();


$(function(){

  // function parseResult (msg){
  //   alert("Inside Parse");
  //   var coords = msg.Coords;
  //   var prices = msg.Prices;
  // }

  // console.log('fooL');
  //

var grid = '<div class="overlay-container"><h1>Choose your Ride!</h1></div>' ;

  // $( "body" ).append( "<button id='trigger-overlay'>Open Overlay</button>");

  $( "body" ).wrapInner( "<div class='container' />");
  $( "body" ).append( "<div class='overlay overlay-scale'><button type='button' class='overlay-close'>Close</button></div>");
  $( '.overlay').append(grid);
})





