// Omnibox interface
// chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
//     suggest([
//       {content: text + " one", description: "the first one"},
//       {content: text + " number two", description: "the second entry"}
//     ]);
// });
// chrome.omnibox.onInputEntered.addListener(function(text) {
//     alert('You just typed "' + text + '"');
// });

// Icon badges
chrome.browserAction.setBadgeText({text: "1"});

// Messaging
// One-Time Requests
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    switch(request.type) {
        case "dom-loaded":
            // alert(request.data.data);
        break;
    }
    return true;
});

// Messaging
// Long-Lived Connections
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name == "addresses"){
        port.onMessage.addListener(function(msg) {
            convertAddress(msg.data);
            console.log("Destination selected: ", msg.data);
        });
    }    
});

var token = window.localStorage.oauth2_token;
var uberServerToken = 'omqAWb8jjzXpuyw-ae1DRHo5GvJ6zpfFyTxVfTCe';
var userLatitude, userLongitude;

navigator.geolocation.watchPosition(function(position) {
    // Browser latitude and longitude
    
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    console.log("Got Your Geo position as: "+userLatitude+" Lat "+ userLongitude+" Lng");
});

getUser();

function convertAddress(stringAddress){
  //this function convert stringAddress into lat lng
  geocoder = new google.maps.Geocoder();
  var address = stringAddress;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      var dLat=results[0].geometry.location.lat();
      var dLng=results[0].geometry.location.lng();
      console.log("Geocoder Lat", dLat);
      console.log("Geocoder Lat", dLng);
      getEstimates(dLat, dLng);
      
    } else {
      console.log('Geocode was not successful for the following reason: ' + status);
    }
  });
}

function getUser (){
    console.log(token);

    $.ajax({
        url: "https://api.uber.com/v1/me",
        headers: {
            Authorization: "Bearer " + token
        },
        success: function(result){
            console.log(result);
        }
    });
}

function getEstimates(lat, lng) {
  $.ajax({
    url: "https://api.uber.com/v1/estimates/price",
    headers: {
        Authorization: "Token " + uberServerToken
    },
    data: {
        start_latitude: userLatitude,
        start_longitude: userLongitude,
        end_latitude: lat,
        end_longitude: lng
    },
    success: function(result) {
        var data = result["prices"];
        console.log("Option 1: ", data[0]);
        console.log("Option 2: ", data[1]);

        if (typeof data != typeof undefined) {
          // Sort Uber products by time to the user's location
          data.sort(function(t0, t1) {
            return t0.duration - t1.duration;
          });

          // Update the Uber button with the shortest time
          var shortest = data[0];
          if (typeof shortest != typeof undefined) {
            console.log("Updating time estimate...");
            console.log("You can get there in " + Math.ceil(shortest.duration / 60.0) + " MIN" );
            alert("You can get there in " + Math.ceil(shortest.duration / 60.0) + " MIN" );
            //$("#time").html("IN " + Math.ceil(shortest.duration / 60.0) + " MIN");
          }
        }
    }
  });
}