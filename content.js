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
  console.log("content - Got here", msg)
  var divText = $('<div>'+msg+'</div>');
  $('body').append(divText);
  
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


});




