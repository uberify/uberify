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
            alert(msg.data)
        });
    }
});