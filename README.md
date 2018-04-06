# Webstarter/Boilerplate web app in IBM Cloud connected to IBM Cloudant with Watson Assistant embedded (Watson Discovery under construction)
[![Build Status](https://travis-ci.org/watson-developer-cloud/assistant-with-discovery.svg?branch=master)](http://travis-ci.org/watson-developer-cloud/assistant-with-discovery)

This application demonstrates how you can combine the [Watson Assistant](https://console.bluemix.net/docs/services/conversation/index.html#about) and [Discovery](http://www.ibm.com/watson/developercloud/doc/discovery/#overview) services to allow a user to execute commands/ask questionsusing plain English or natural language understanding. 

First, users pose a questions to the Watson Assistant service. Short tail answers are routed to Watson Assistant if it is able to confidently answer it does. (not yet implemented) If it is not able to adequately answer the Watson Discovery app executes a call to Discovery, for long tail answers.

## How the app works

The app uses two Watson services and a Cloud Foundry service: Watson Assistant, Watson Discovery & Cloudant 

This web app is built from the node.js SDK webstarter within IBM Cloud connected to Cloudant.

It has a cognitive conversational interface that the Watson Assistant service provides that consists of the end user asking questions/giving commands to the cognitive car example workspace and powers the basic Q&A using intents(questions/commands), entities(keywords used to further clarify & categorize intents), relationships and natural language 

The Watson Discovery service searches and ranks responses for other questions, Watson Assistant cannot answer and uses Cloudant NoSQL DB for storage of chat and API calls


## Getting Started locally

<img src="readme_images/deploy-locally.png"></img>

### Before you begin

-  Ensure that you have a [Github account](https://github.com/) in order to fork/clone and create your own repositories.
-  Ensure that you have an [IBM Cloud account](https://console.bluemix.net/). Part of this deployment is local but you must still use IBM Cloud.
-  Download [IBM Cloud CLI](https://console.bluemix.net/docs/cli/reference/bluemix_cli/get_started.html#getting-started) to push changes to your app to IBM Cloud using Cloud Foundry commands in project folder
-  Ensure you download the [WDC SDK](https://console.bluemix.net/docs/services/watson/running-node-examples.html#running-examples-from-the-node-js-sdk) for nodejs modules in project folder & other code examples
-  Ensure that you have [installed nodejs](https://nodejs.org/)
-  Ensure you have downloaded a text editor like [Atom](https://atom.io/)


<a name="returnlocal">
</a>

### Create the services 

1. In IBM Cloud via UI, create a [Watson Assistant Service](https://console.bluemix.net/catalog/services/watson-assistant-formerly-conversation/) instance or programmatically using IBM Cloud CLI

  * Ensure you have [service credentials](https://console.bluemix.net/services/conversation/cee5f30d-88a9-4327-93c0-d7c4d9b067c5?paneId=credentials&ace_config=%7B%22region%22%3A%22us-south%22%2C%22orgGuid%22%3A%2262531d4d-5672-449d-b0ec-56f8ff84e9ad%22%2C%22spaceGuid%22%3A%227fb1a1b4-8c0c-460c-9656-70517b3abb92%22%2C%22redirect%22%3A%22https%3A%2F%2Fconsole.bluemix.net%2Fdashboard%2Fapps%2F%22%2C%22bluemixUIVersion%22%3A%22v6%22%2C%22crn%22%3A%22crn%3Av1%3Abluemix%3Apublic%3A%3Aus-south%3As%2F7fb1a1b4-8c0c-460c-9656-70517b3abb92%3Acee5f30d-88a9-4327-93c0-d7c4d9b067c5%3Acf-service-instance%3A%22%2C%22id%22%3A%22cee5f30d-88a9-4327-93c0-d7c4d9b067c5%22%7D&env_id=ibm%3Ayp%3Aus-south) created for your Watson Assistant service and make note of [username/password/API gateway](https://github.com/bmguillo/assistant-cloudant-webstarter/blob/master/public/img/watsonapi.png) you will need it later.
  
  * [Create a workspace](https://watson-assistant.ng.bluemix.net/us-south/cee5f30d-88a9-4327-93c0-d7c4d9b067c5/workspaces), like I did use the [workspace sample](https://github.com/bmguillo/assistant-cloudant-webstarter/blob/master/public/img/workspace%20sample.png) or [import a workspace](https://github.com/bmguillo/assistant-cloudant-webstarter/blob/master/public/img/import%20ws.png) and jot down the [workspaceid](https://github.com/bmguillo/assistant-cloudant-webstarter/blob/master/public/img/workspace.png)
  A workspace is a container for all the artifacts that define the behavior of your service (ie: intents, entities and chat    flows). 
  * Import or create new intents and entitities

2. In IBM Cloud, [create a Discovery Service instance](https://console.bluemix.net/registration/?target=/catalog/services/discovery/).
  * Ensure you have service credentials created for your Watson Discovery instance.
  *  [Create a data collection and jot down the Collection Id, Configuration Id and Environment Id]. 
  * [Ingest the documents into a new Discovery collection].
 
 
 ### Create a sample web app via IBM Cloud using nodejs SDK Boilerplate & connect to services(Cloudant, Watson Assistant & Watson Discovery)
 3. Create a sample app using the nodejs SDK boilerplate and connect Watson Assistant, Watson Discovery & Cloudant to it via UI (pic)
 ### Building/Running locally the project
 4. Clone/Fork my repository as a base for your own project and to save it locally https://github.com/bmguillo/assistant-cloudant-webstarter then do the following after
    cd into this project's root directory
    Copy the value for the VCAP_SERVICES environment variable from the application running in IBM Cloud and paste it in a vcap-local.json file
    Run npm install to install the app's dependencies will be located in package*.json
    Run node app.js to build/start the app
    

 * Access the running app in a browser at webappname.mybluemix.net
 


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
