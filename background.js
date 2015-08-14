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

  $('#clearToken').on('click', function(){
    window.oauth2.clearToken();
    console.log('clear');
    window.close();
  })

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

var sendMe = {};
var productID;
// Messaging
// Long-Lived Connections
chrome.runtime.onConnect.addListener(function(port) {
    if(port.name == "addresses"){
        port.onMessage.addListener(function(msg) {
            getUser();
            convertAddress(msg.data);
            console.log("Destination selected: ", msg.data);
        });

    } else if (port.name == "popover"){
        port.onMessage.addListener(function(msg) {
                sendMe['Profile'] = msg;
            });            
    } else if (port.name == "rideSelected"){
        port.onMessage.addListener(function(msg) {
                productID = msg;
                console.log("BG got", msg);
                requestRide();
            });            
    }

});

function sendmsg(msg){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
      chrome.tabs.sendMessage(tabs[0].id, sendMe, function(response) {});  
  });
}

var token = window.localStorage.oauth2_token;
var uberServerToken = 'omqAWb8jjzXpuyw-ae1DRHo5GvJ6zpfFyTxVfTCe';
var userLatitude, userLongitude;


navigator.geolocation.watchPosition(function(position) {
    // Browser latitude and longitude
    
    userLatitude = position.coords.latitude;
    userLongitude = position.coords.longitude;
    console.log("Got Your Geo position as: "+userLatitude+" Lat "+ userLongitude+" Lng");
});


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

        var addr = {
            start_latitude: userLatitude,
            start_longitude: userLongitude,
            end_latitude: lat,
            end_longitude: lng
        }
        sendMe['Coords']=addr;

        var data = result["prices"];
        // console.log("Option 1: ", data[0]);
        // console.log("Option 2: ", data[1]);

        sendMe['Prices']=data;
        sendmsg();


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
            //alert("You can get there in " + Math.ceil(shortest.duration / 60.0) + " MIN" );
            //$("#time").html("IN " + Math.ceil(shortest.duration / 60.0) + " MIN");
          }
        }
    }
  });
}

var status, requestID, driver, eta, mapURL;

function requestRide(){

    var mydata = sendMe['Coords'];
    mydata.product_id=productID;

  $.ajax({
        url: "https://sandbox-api.uber.com/v1/requests",
        type: 'POST',
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + token
        },
        data: JSON.stringify(mydata),
        success: function(result) {
            status = result.status;
            requestID = result.request_id;
            driver = result.driver;
            eta = result.eta + " min";
            getMap(requestID);
            console.log("Ride Request Result", result);
        }
    });
}

function getMap(id){
  console.log("Called Get Map");
  $.ajax({
        url: "https://sandbox-api.uber.com/v1/requests/"+id+"/map",
        type: 'GET',
        contentType: "application/json",
        headers: {
            Authorization: "Bearer " + token
        },
        success: function(result) {
          console.log("Get map successful");
            mapURL=result.href;
            getPopup();

        }
    });
}

function getPopup(){
  //event.preventDefault();
  window.open(mapURL, "popupWindow", "width=1200,height=1200,scrollbars=yes");

}
