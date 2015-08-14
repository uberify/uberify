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

chrome.extension.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log("content - Got here", msg)
  var divText = $('<div>'+msg+'</div>');
  $('body').append(divText);
  
});


  var button= $('<button class="uberButton">Get Uber Estimates</button>');

  $("address").after(button);
  $(".uberButton").each(function () {
    
    $(this).click(function () {
      var addr = $(this).prev("address")[0].innerText;
      port.postMessage({data: addr})
    });
  });


});




