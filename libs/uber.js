
// here we define an object called "Uber" which will be used as a helper object to authenticate and make uber api calls
var defaultCorsHeaders = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "application/json"
};

console.log('I am loaded');
//var uberPort = chrome.runtime.connect(contentID, {name: "uber"});

var storage = window.localStorage.getItem('oauth2_token');
//console.log(storage);


var Uber = (function() {
  var access_token = null;
  var api = {
    // we are using chrome.identity.launchWebAuthFlow (makes oauth2 easier for chrome extensions)
    // the authorize method will call a callback (passing in a boolean indicating if auth was successful)
    // it will also set the access_token on the Uber object
    authorize: function(clientID, scope, callback) {
      access_token = null;
      var redirectURL = chrome.identity.getRedirectURL();
      chrome.identity.launchWebAuthFlow(
        {
          interactive: true,
          url: "https://login.uber.com/oauth/authorize?client_id=" + 
            clientID + "&redirect_uri=" + redirectURL + "&scope=" + scope
        }, 
        function(responseURL) {
          console.log(responseURL);
          if (responseURL) {
            // if we have made it this far, we need to grab the authorization code from the url
            // EXAMPLE: https://your-redirect-uri/?code=AUTHORIZATION_CODE
            // then we can exchange the code for an access token

            // extract AUTHORIZATION_CODE
            var getParameterByName = function(name) {
              var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
              return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
            };
            var auth_code = getParameterByName('code'); // haven't fully tested this function yet...

            // POST request to exchange auth code for access token
            $.ajax({
              url: "https://login.uber.com/oauth/token",
              type: "POST",
              data: {
                // uber docs also show a client_secret being posted... I don't know if we need that
                client_id: 'TODO',
                grant_type: 'authorization_code',
                redirect_uri: redirectURL,
                code: auth_code
              },
              sucess: function(data) {
                access_token = data.access_token;

                // TODO: data also includes a refresh_token... this is used to obtain a fresh access_token (access_token expires in 30 days)

                // call the callback passing in true if we got the access_token
                callback(true);
              }
            });
          }
          else {
            // we didn't get a responseURL so call the callback passing in false
            callback(false);
          }
        }
      );
    },
    
    // Once authenticated we will have the access token in the Uber object.
    // Here we define a helper function for making uber api calls
    call: function (method, successCallback, errorCallback) {
      // when in production url should start with 'https://api.uber.com/v1/'
      // for now we will use sandbox
      var url = 'https://sandbox-api.uber.com/v1/' + method;
      //defaultCorsHeaders['Authorization'] = 'Bearer ' + window.oauth2.getToken();
      var token = window.localStorage.oauth2_token;
      console.log(token);

      Ajax.ajaxSend(url, "json",
        function (status, response) {
          if (response.error) {
            var err = response.error;
            if (response.error.message)
              err = response.error.message;
            if (errorCallback)
              errorCallback(response.error.message);
          }
          else
            successCallback(response);
        },
        //defaultCorsHeaders
        {'Authorization': 'Bearer ' + token}
      );
    }

  };
  return api;
})();
