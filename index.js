
$(function(){

  $('#oauthButton').on('click', function(){
    console.log('start');
    window.oauth2.start();
  })


  $('#getToken').on('click', function(){
    console.log(window.oauth2.getToken());
  })

  $('#clearToken').on('click', function(){
    window.oauth2.clearToken();
    console.log('clear')
  })
})