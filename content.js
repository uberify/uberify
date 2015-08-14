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

// Messaging
// Long-Lived Connections
var port = chrome.runtime.connect({name: "addresses"});

port.onMessage.addListener(function(msg) {
  console.log(msg)
});

var contentID = chrome.runtime.id;

// Fetch addresses and send it to bacgkround
// var addresses = document.getElementsByTagName('address')
// var addrArr = Array.prototype.slice.call(addresses);

// addrArr.forEach(function(addr){
//   port.postMessage({data: addr.innerText});
// })


var uberButton= $('<button id="trigger-overlay" class="uberButton trigger-overlay">Call Uber</button>');
$("address").after(uberButton);
$(".uberButton").each(function () {
  $(this).click(function () {
    var addr = $(this).prev("address")[0].innerText;
    port.postMessage({data: addr})
    //buttonClicked(addr);
  });
});



});



