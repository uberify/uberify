$(function(){
  //console.log('fooL');

  //$( "body" ).append( "<button id='trigger-overlay'>Open Overlay</button>");
  $( "body" ).wrapInner( "<div class='container' />");
  $( "body" ).append( "<div class='overlay overlay-contentscale'><button type='button' class='overlay-close'>Close</button></div>");
})