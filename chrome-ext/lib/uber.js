
// here we define an object called "Uber" which will be used as a helper object to authenticate and make uber api calls

var Uber = (function() {
  var access_token = null;
  var api = {
    // we are using chrome.identity.launchWebAuthFlow (makes oauth2 easier for chrome extensions)
    // the authorize method will call a callback (passing in a boolean indicating if auth was successful)
    // it will also set the access_token on the Uber object
    authorize: function(clientID, scope, callback) {
      access_token = null;
      chrome.identity.launchWebAuthFlow(
        {
          interactive: true,
          url: "https://login.uber.com/oauth/authorize?client_id=" + 
            clientID + "&redirect_uri=" + chrome.identity.getRedirectURL() + "&scope=" + scope
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
            var auth_code = getParameterByName('code');

            // TODO: POST request stuff including the AUTHORIZATION_CODE

            // TODO: grab the access_token from the response from the POST

            // TODO: set the access_token on the Uber object
            access_token = 'TODO';

            // call the callback passing in true if we got the access_token
            callback(true);
          }
          else {
            // we didn't get a responseURL so call the callback passing in false
            callback(false);
          }
        }
      );
    },

    // here we can add more Uber related methods like api calls.
    // Once authenticated we will have the access token in the Uber object
  };
  return api;
})();
