// Messaging
// One-Time Requests
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

// Fetch addresses and send it to bacgkround
var addresses = document.getElementsByTagName('address')
var addrArr = Array.prototype.slice.call(addresses);

addrArr.forEach(function(addr){
  port.postMessage({data: addr.innerText});
})