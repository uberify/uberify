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

// Check if token is on localstorage
if (localStorage.getItem['oauth2_token'] !== undefined) {
  chrome.browserAction.setIcon({
    path : {
        "19": "icons/19x19-active.png",
        "38": "icons/38x38-active.png"
      }
  })
}

window.addEventListener('storage', function(storageEvent){
  if(storageEvent.key === 'oauth2_token' && storageEvent.newValue !== null) {
    chrome.browserAction.setIcon({
      path : {
          "19": "icons/19x19-active.png",
          "38": "icons/38x38-active.png"
        }
    })
  } else {
    chrome.browserAction.setIcon({
      path : {
          "19": "icons/19x19.png",
          "38": "icons/38x38.png"
        }
    })
  }
}, false);

// Storing currentPosition on localStorage
navigator.geolocation.getCurrentPosition(function(position) {
  localStorage.setItem('currentPosition', [position.coords.latitude, position.coords.longitude])
  // console.log(localStorage.getItem('currentPosition'));
});

// Icon badges
// chrome.browserAction.setBadgeBackgroundColor({ color: [31, 186, 214, 255] });
// chrome.browserAction.setBadgeText({text: "1"});


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
            convertAddress(msg);
            //console.log(window.localStorage);
        });
    }

});

function getPriceEstimates(start_latitude, start_longitude, end_latitude, end_longitude) {
  var method = 'estimates/price?start_latitude=' + start_latitude + '&start_longitude=' + start_longitude + '&end_latitude=' +
    end_latitude + '&end_longitude=' + end_longitude;

  Uber.call(method, function(response) {
    console.log(response.data);
  });
}

var start = {Lat: 37.419938, Long: -122.083479};

function buttonClicked(addr){
  var inputAddress=addr;
  if ((inputAddress!=null)&&(inputAddress!="")){
    var addr = [start.Lat, start.Long];
    addr.concat(convertAddress(inputAddress));
    port.postMessage({data: addr})
  } else {
    displayError("Address can not be empty");

  }
}

function convertAddress(stringAddress){
  //this function convert stringAddress into lat lng
  geocoder = new google.maps.Geocoder();
  var address = stringAddress;
  geocoder.geocode( { 'address': address}, function(results, status) {
    if (status == google.maps.GeocoderStatus.OK) {
      //displayMap(37.419938, -122.083479, "Atom Cafe, Charleston Road, Mountain View, CA");
      dLat=results[0].geometry.location.lat();
      dLng=results[0].geometry.location.lng();
      console.log("Geocoder Lat", dLat);
      console.log("Geocoder Lat", dLng);
      //getPriceEstimates(start.Lat, start.Long, dLat, dLng);
      return [dLat, dLng];
    } else {
      displayError('Geocode was not successful for the following reason: ' + status);
    }
  });
}