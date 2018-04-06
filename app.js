/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 //by requiring dotenv in the source the .env file is scanned and merged in
// process.env runtime variables
var dotenv = require('dotenv').config();
//javascript directive indicating undeclared variables must not be used
'use strict';

// the fs module is for interacting with file system
const fs = require('fs');
//existsSync checks if the local.env file exists in Node.js
if (fs.existsSync('local.env')) {
  console.log('Get configuration information from local.env');
  require('dotenv').config({ path: 'local.env' });
}
//checks if workspace_id exists
 var workspace_id = process.env.WATSON_ASSISTANT_WORKSPACE_ID;
 if (!workspace_id) {
     console.log('workspace_id is not defined.');
     return;
 }

// Creates new Watson Assistant Service Wrapper /instance of the service
//requiring the WDC conversation/assistant module in WDC SDK which calls v1.js,
//path needs to be in node_modules folder in same level as this file
var Conversation = require('watson-developer-cloud/conversation/v1');
// If unspecified here, the env variables will be checked,
//then the WDC SDK VCAP_SERVICES environment proerty
var conversation = new Conversation({
    version_date: process.env.WATSON_VERSION_DATE,
    version: process.env.WATSON_SERVICEVERSION,
    username: process.env.WATSON_ASSISTANT_USERNAME,
    password: process.env.WATSON_ASSISTANT_PASSWORD,
    url: process.env.WATSON_ASSISTANT_API
});

// initialize wrapper for Cloudant
// If CLOUDANT_DBNAME is set, store it in credential variable
// andthen VCAP_SERVICES (username/pw) parse to JSON  log in using VCAP_SERVICES
//by parsing it to JSON
var record_log = false;
if ( process.env.CLOUDANT_DB_NAME ) {
   var credential;
   if (process.env.VCAP_SERVICES){
      var env = JSON.parse(process.env.VCAP_SERVICES);
       credential = env['cloudantNoSQLDB'][0]['credentials'];
    }
    record_log = true;//variable for saving records to Cloudant later
    //requires the cloudant_lib.js file to initialize database
    const Cloudant_lib = require('./cloudant_lib');
    var cloudant = new Cloudant_lib({
        cloudantUrl: process.env.CLOUDANT_URL,
        cloudantDbName: process.env.CLOUDANT_DB_NAME,
        initializeDatabase: true
    });
}

const express = require('express'); // app server
const bodyParser = require('body-parser'); // parser for post requests
const path = require('path');
const app = express();

// If you forget to tell Express to use your router it wont work so this loads
// UI from the public folder
app.use(express.static('./public'));
app.use(bodyParser.json());

// Endpoint to be called from the client side
//final address will be xxx.mybluemix.net + api/message
//workspace_id, context and input are stored in payload variable
//method used to post data to a server/ app ie forms or chatbox input on webpage
app.post('/api/message', function(req, res) {
  var payload = {
    workspace_id: workspace_id,
    context: req.body.context || {},
    input: req.body.input || {}
  };
  // Send the input to the conversation service stored in payload
  conversation.message(payload, function(err, data) {
    if (err) {// if server is down receive 500, port should be in code
      return res.status(err.code || 500).json(err);
    }
    return res.json(updateMessage(payload, data));
  });
});

// default path for which index*.html will get loaded
var debug_mode = 'false';
// if we are loading external CSS, Jascript or images this is needed and it will
//look in the public folder
var default_path = path.join(__dirname, 'public');
// debug_mode='true' for index_prod.html and debug_mode='false' for index_prod.html
if ( debug_mode && debug_mode === 'true' ) {
    default_path = path.join(default_path, 'index_debug.html');
} else {
    default_path = path.join(default_path, 'index_prod.html');
}
console.log( "debug_mode: " + debug_mode );//prints to the console the value of debug_mode
console.log( default_path );

//we render our index*.html file here and send it to the browser
app.get('/', function(req, res) {
    res.sendFile(default_path);
});

// Lists on this port if VCAP_APP_PORT is set (how to use IBM Cloud)
var port = process.env.VCAP_APP_PORT || 3000;

app.listen(port, function() {
  // prints out the server running message and port to the console
  console.log('Server running on port: %d', port);
});

/**
 * Updates the response text using the intent confidence
 * @param  {Object} input The request to the Conversation service
 * @param  {Object} response The response from the Conversation service
 * @return {Object}          The response with the updated message
 */

// Search dummy data
const student_list = {
    '12345': {name: 'Kathy', age: 20},
    '54321': {name: 'Bob', age: 18},
    '11111': {name: 'Sandy', age: 19}
};

function updateMessage(input, response) {
    var output = response.output;
// Compares the external request with output action
    if ( output && output.action && output.action.command ) {
// Processing when the external cooperation request is "query_student_name_by_id"
        if ( output.action.command === "query_student_name_by_id" ) {
// Get student_id from output parameter
            var student_id = output.action.student_id;
// Dummy search by stub. In fact, it is API call for retrieval
            var student = student_list[student_id];
// In case of normal termination, save student.name retrieved by search in the
//context variable
            if ( student ) {
                response.context.student_name = student.name;
                console.log( "OK student_name: " + student.name);
// When the search result can not be obtained
            } else {
                console.log( "NG student_id: " + student_id);
            }
        }
    }
//Save log to Cloudant if variable is set to true
    if ( record_log ) {
        cloudant.record_log( response, function( err, msg ) {
            if ( err ) { console.log(err); }
            else { console.log(msg); }
        });
    }
    return response;
}
