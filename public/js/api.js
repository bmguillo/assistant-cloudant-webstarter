// The Api module is designed to handle all interactions with the server

var Api = (function() {
  var requestPayload; //stores input to Watson Assistant server
  var responsePayload;//stores response from Watson Assistant server
  var messageEndpoint = '/api/message';

  // Publicly accessible methods defined
  return {
    sendRequest: sendRequest,

    // The request/response getters/setters are defined here to prevent internal methods
    // from calling the methods without any of the callbacks that are added elsewhere.
    getRequestPayload: function() {
      return requestPayload; //data sent with the request to Watson Assistant server with POST data
    },
    setRequestPayload: function(newPayloadStr) {
      requestPayload = JSON.parse(newPayloadStr);
    },
    getResponsePayload: function() {
      return responsePayload;//data response from Watson Assistance service
    },
    setResponsePayload: function(newPayloadStr) {
      responsePayload = JSON.parse(newPayloadStr);
    }
  };

  // Send a message request to the Watson Assistant server
  function sendRequest(text, context) {
    // Build request payload
    var payloadToWatson = {};
    if (text) {
      payloadToWatson.input = {
        text: text
      };
    }
    if (context) {
      payloadToWatson.context = context;
    }


    // Built http request with XML constructor
    var http = new XMLHttpRequest();
    //part of web api that specifies the HTTP request method to use POST etc.
    http.open('POST', messageEndpoint, true);
    //part of web api that sets the content-type header value and application/json as the body
    http.setRequestHeader('Content-type', 'application/json');
    //part of the web api and it calls the event handler whenever the readyState changes
    http.onreadystatechange = function() {
      if (http.readyState === 4 && http.status === 200 && http.responseText) {
        Api.setResponsePayload(http.responseText);
      }
    };

    var params = JSON.stringify(payloadToWatson);
    // Stored in variable (publicly visible through Api.getRequestPayload)
    // to be used throughout the application
    if (Object.getOwnPropertyNames(payloadToWatson).length !== 0) {
      Api.setRequestPayload(params);
    }

    // Send request
    http.send(params);
  }
}());
