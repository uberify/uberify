window.onload = function () {

  // TODO: get clientID, figure out what scope we need. (scope defines what kinds of permissions we want authorized)
  Uber.authorize('TODO:clientID', 'TODO:scope',
      function (validResponseURL) {
        if (!validResponseURL) {
          console.log("error: didn't get a valid response URL");
        } else {
          // here is where we can call functions that execute Uber api calls
          getPriceEstimates('TODO: add test lat and long args here'); 
        }
        
      }
  );
};

function getPriceEstimates(start_latitude, start_longitude, end_latitude, end_longitude) {
  var method = 'estimates/price?start_latitude=' + start_latitude + '&start_longitude=' + start_longitude + '&end_latitude=' +
    end_latitude + '&end_longitude=' + end_longitude;

  Uber.call(method, function(response) {
    console.log(response.data);
  });
}