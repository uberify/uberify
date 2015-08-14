// Messaging
// One-Time Requests

$(document).ready(function(){

  window.addEventListener("load", function() {
    chrome.extension.sendMessage({
      type: "dom-loaded",
      data: {
        myProperty: "something"
      }
    });
  }, true);


chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  var coords = msg.Coords;
  var prices = msg.Prices;



  for (var i=0; i<prices.length; i++){
    var id = prices[i].product_id;
    var string =  "<tr class='priceRow'>\
                  <td>" +prices[i].display_name+"</td>\
                  <td>$"+prices[i].high_estimate+"</td>\
                  <td>" +prices[i].distance+"miles</td>\
                 <td><button class='callButton' id="+id+">Call</button></td>\
                  </tr>";
    $('.results').append(string);
  }

    $(".callButton").each(function () {
      $(this).click(function () {
        var id = "" + (this.id);
        console.log("ID: ", id);
        var port = chrome.runtime.connect({name: "rideSelected"});
        port.postMessage(id);

      });
    });


});



var uberButton= $('<button id="trigger-overlay" class="uberButton trigger-overlay">Call Uber</button>');
$("address").after(uberButton);
$(".uberButton").each(function () {
  $(this).click(function () {
    var port = chrome.runtime.connect({name: "addresses"});
    var addr = $(this).prev("address")[0].innerText;
    port.postMessage({data: addr})
    //buttonClicked(addr);

  });
});
var table = '<table class="reference" style="width:100%"><tbody class="results">'
$('.overlay-container').append(table);


});




