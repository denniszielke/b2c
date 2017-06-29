var request = require('request');
var AuthenticationContext = require('adal-node').AuthenticationContext;

var tenantID = "xxx.onmicrosoft.com";
var clientName = "";
var clientID = "";
var policyName = "";
var clientSecret = "";
var identityMetadata = "https://login.microsoftonline.com/" + tenantID + "/v2.0/.well-known/openid-configuration/";
var webApi = "";

var adal = require('adal-node').AuthenticationContext;

var resource = '00000002-0000-0000-c000-000000000000';
var stringTemplate = "https://login.microsoftonline.com/tfp/"+ tenantID+ "/" + policyName + "/v2.0/.well-known/openid-configuration";

var context = new AuthenticationContext(identityMetadata);
context.acquireTokenWithClientCredentials(resource, clientID, clientSecret, function(err, tokenResponse) {
  if (err) {
    console.log('well that didn\'t work: ' + err.stack);
  } else {
    console.log(tokenResponse);
    webApi = "https://graph.windows.net/"+ tenantID +"/users?api-version=1.6";

    request.get({
        headers: {'Authorization' : 'Bearer ' + tokenResponse.accessToken},
        url:     webApi
    }, function(error, response, body){
        console.log("error: " + error);
        console.log("body: " + body);
        console.log("reponse: " + JSON.stringify(response));
        console.log("inside callback completed");        
    });
  }
});