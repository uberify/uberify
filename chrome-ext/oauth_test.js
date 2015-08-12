window.onload = function () {

  // TODO: get clientID, figure out what scope we need. (scope defines what kinds of permissions we want authorized)
  Uber.authorize('clientID', 'scope',
      function () {
        // here is where we can call functions that execute Uber api calls
          requestRide(); // requestRide is an example function call (it isn't implemented yet)
      }
  );
};