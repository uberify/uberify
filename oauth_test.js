window.onload = function () {

  $('#oauthButton').on('click', function(){
    console.log('button clicked')
    // TODO: get clientID, figure out what scope we need. (scope defines what kinds of permissions we want authorized)
    Uber.authorize('_mSN0yG0lSdeR0ipMIDcnAIwnIbdjhG2', 'request',
        function (validResponseURL) {
          if (!validResponseURL) {
            console.log("error: didn't get a valid response URL");
          } else {
            // here is where we can call functions that execute Uber api calls
            getPriceEstimates('43.861475', '-79.316069', '43.589045', '-79.644120');
          }

        }
    );
  })

};

function getPriceEstimates(start_latitude, start_longitude, end_latitude, end_longitude) {
  var method = 'estimates/price?start_latitude=' + start_latitude + '&start_longitude=' + start_longitude + '&end_latitude=' +
    end_latitude + '&end_longitude=' + end_longitude;

  Uber.call(method, function(response) {
    console.log(response.data);
  });
}