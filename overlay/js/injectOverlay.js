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

  // console.log('fooL');
  //
  var grid = '<div class="overlay-container"><div><h1>Let\'s go <span>Nick</span>!</h1></div>\
  <table class="reference" style="width:100%">\
  <tbody><tr>\
    <td>uberX</td>\
    <td>8$</td>\
    <td>0.73 miles</td>\
    <td><button>Call</button></td>\
  </tr>\
  <tr>\
    <td>uberXL</td>\
    <td>12$</td>\
    <td>0.73 miles</td>\
    <td><button>Call</button></td>\
  </tr>\
  </tbody></table>\
  </div>' ;

  // $( "body" ).append( "<button id='trigger-overlay'>Open Overlay</button>");

  $( "body" ).wrapInner( "<div class='container' />");
  $( "body" ).append( "<div class='overlay overlay-scale'><button type='button' class='overlay-close'>Close</button></div>");
  $( '.overlay').append(grid);
})





