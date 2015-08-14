
$(function(){

  var profile; 
   // = JSON.parse(localStorage.getItem('account'));
  


  var token = oauth2.getToken();
  if (token) {
    getUser();
    $('#oauthButton').hide();
    $('#clearToken').show();
    $('.introText').hide();
    $('.name').show();
    $('.profile').show();

  } else {
    $('#oauthButton').show();
    $('#clearToken').hide();
    $('.introText').show();
    $('.name span').text('log in');
    $('.profile').hide();

  }

  
  // port.onMessage.addListener(function(msg) {
  //   console.log("message recieved "+ msg);
  // });

  $('#oauthButton').on('click', function(){
    console.log('start');
    window.oauth2.start();
    setTimeout(function(){
      window.close();
    }, 200)
  })


  // $('#getToken').on('click', function(){
  //   console.log(window.oauth2.getToken());
  //   // port.postMessage("Hi BackGround");
  // })

  $('#clearToken').on('click', function(){
    window.oauth2.clearToken();
    console.log('clear');
    window.close();
  })


  function getUser (){

      $.ajax({
          url: "https://api.uber.com/v1/me",
          headers: {
              Authorization: "Bearer " + token
          },
          success: function(result){
              // console.log("User Object: ", result);

            localStorage.setItem('account', JSON.stringify({'firstName': result.first_name, 'lastName': result.last_name, 'picture': result.picture}))
            
            profile = JSON.parse(localStorage.getItem('account'));
            var port = chrome.extension.connect({name: "popover"});
            port.postMessage(profile);
            $('.name span').text(profile.firstName);
            $('.profile').attr("src", profile.picture);
                
          }
      });
  };





})