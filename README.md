# Webstarter Boilerplate web app in IBM Cloud connected to IBM Cloudant & Watson Assistant embedded (Discovery under construction)
[![Build Status](https://travis-ci.org/watson-developer-cloud/assistant-with-discovery.svg?branch=master)](http://travis-ci.org/watson-developer-cloud/assistant-with-discovery)

This application demonstrates how you can combine the [Watson Assistant](https://console.bluemix.net/docs/services/conversation/index.html#about) and [Discovery](http://www.ibm.com/watson/developercloud/doc/discovery/#overview) services to allow IBMers to get answers to a wide range of questions to help them in their work using plain English or natural language understanding. First, users pose a questions to the Watson Assistant service. Short tail answers are routed to Watson Assistant if it is able to confidently answer, if not the app executes a call to Discovery, for long tail answers.

## How the app works


The app has a conversational interface that consists of the end user asking questions to assist in their daily work.
These questions are called intents and further categorized by entities for clarity. 
The app uses two Watson services: Watson Assistant and Discovery. 
The Watson Assistant service powers the basic Q&A using intents, relationships and natural language
The Watson Discovery service searches and ranks responses for other questions, Watson Assistant cannot answer.
Cloudant NoSQL DB for storage of chat and API calls


## Getting Started locally

<img src="readme_images/deploy-locally.png"></img>

### Before you begin

-  Ensure that you have an [IBM Cloud account][sign_up]. Part of this deployment is local but you must still use IBM Cloud.
-  Ensure that you have a https://github.com/ account in order to fork/clone and create your own repositories.
-  Ensure you have the WDC SDK for nodejs for nodejs code examples: https://console.bluemix.net/docs/services/watson/running-node-examples.html#running-examples-from-the-node-js-sdk
-  Ensure you have Eclipse & Eclipse Tools for IBM Cloud: https://marketplace.eclipse.org/content/ibm-eclipse-tools-bluemix
-  Ensure that you have installed nodejs. https://nodejs.org/
-  Download IBM Cloud CLI if you wish to use: https://console.bluemix.net/docs/cli/reference/bluemix_cli/get_started.html#getting-started


<a name="returnlocal">
</a>

### Create the services via UI

1. In IBM Cloud via UI, [create a Watson Assistant Service instance]
https://console.bluemix.net/catalog/services/watson-assistant-formerly-conversation/

  * Ensure you have service credentials created for your Watson Assistant instance. 
  ![title](https://github.com/bmguillo/assistant-with-discovery/blob/master/readme_images/watsonapi.png)
  * [Create a workspace and jot down the workspaceid] or import mine.
  A workspace is a container for all the artifacts that define the behavior of your service (ie: intents, entities and chat    flows). 
 ![title](https://github.com/bmguillo/assistant-with-discovery/blob/master/readme_images/workspace.png)
  * Import or create new intents and entitities

2. In IBM Cloud, [create a Discovery Service instance](https://console.bluemix.net/registration/?target=/catalog/services/discovery/).
  * Ensure you have service credentials created for your Watson Discovery instance.
  (pic)
  *  [Create a data collection and jot down the Collection Id, Configuration Id and Environment Id]. ![title](https://github.com/bmguillo/assistant-with-discovery/blob/master/readme_images/_.png)
  * [Ingest the documents into a new Discovery collection].
 
 
 ### Create a sample app using Boilerplate & connect to services(Cloudant & Assistant)
 3. Create a sample app using the nodejs SDK boilerplate and connect both Watson Assistant & Cloudant 
 
 4. git clone https://github.com/ibmecod/nodejs-cloudant then do the following after
    cd into this project's root directory
    Copy the value for the VCAP_SERVICES envirionment variable from the application running in Bluemix and paste it in a   vcap-local.json file
    Run npm install to install the app's dependencies
    Run npm start to start the app
    
    
    

### (Optional) Create the services via CLI
### (Optional) Import a workspace

### Building/Running locally

To build the application(UNDER CONSTRUCTION NOT YET WORKING):

1. Clone/Fork my repository as a base for your own project and to save it locally
   git clone https://github.com/bmguillo/assistant-with-discovery
   
2. Change/add your credentials in .env file for the following: 
 * Watson Assistant username, password
 * Watson Assistant workspace id
 * Watson Assistant api gateway
 * Watson Discovery username
 * Watson Discovery password
 * Watson Discovery collection id
 * Watson Discovery environment id
 * Watson Discovery api gateway
 
 

 * Access the running app in a browser at http://localhost:3000
 


---




## License

  This sample code is licensed under Apache 2.0.
  Full license text is available in [LICENSE](LICENSE).


## Open Source @ IBM

  Find more open source projects on the
  [IBM Github Page](http://ibm.github.io/).



[cloud_foundry]: https://github.com/cloudfoundry/cli
[getting_started]: https://console.bluemix.net/docs/services/watson/index.html
[Watson Assistant]: https://www.ibm.com/watson/services/conversation/
[discovery]: https://www.ibm.com/watson/services/discovery/

[docs]: http://www.ibm.com/watson/developercloud/conversation/
[sign_up]: https://console.bluemix.net/registration/
