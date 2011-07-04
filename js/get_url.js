chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
    if (request.method == "getUrl")
      sendResponse({data: "http://blahblah.com"});
    else
      sendResponse({}); // snub them.
});