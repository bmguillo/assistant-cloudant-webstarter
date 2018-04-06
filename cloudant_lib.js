const Cloudant = require('cloudant');
const async = require('async');
const nano = require('nano-seconds');

function CloudandStorage(options) {
    const self = this;
    const cloudant = Cloudant({
        url: options.cloudantUrl,
        plugin: 'retry',
        retryAttempts: 10,
        retryTimeout: 500
    }).db;
    let cloudantDb;

    if (!options.initializeDatabase) {
        cloudantDb = cloudant.use(options.cloudantDbName);
    } else {
        const prepareDbTasks = [];
    
        // create the db
        prepareDbTasks.push(
            (callback) => {
                console.log('Creating database...');
                cloudant.create(options.cloudantDbName, (err) => {
                    if (err && err.statusCode === 412) {
                        console.log('Database already exists');
                        callback(null);
                    } else if (err) {
                        callback(err);
                    } else {
                        callback(null);
                    }
                });
        });

        // use it
        prepareDbTasks.push(
            (callback) => {
                console.log('Setting current database to', options.cloudantDbName);
                cloudantDb = cloudant.use(options.cloudantDbName);
                callback(null);
        });

        // create design documents
        const designDocuments = require('./cloudant-designs.json');
        designDocuments.docs.forEach((doc) => {
            prepareDbTasks.push((callback) => {
                console.log('Creating', doc._id);
                cloudantDb.insert(doc, (err) => {
                    if (err && err.statusCode === 409) {
                        console.log('Design', doc._id, 'already exists');
                        callback(null);
                    } else if (err) {
                        callback(err);
                    } else {
                    callback(null);
                    }
                });
            });
        });

        async.waterfall(prepareDbTasks, (err) => {
            if (err) {
                console.log('Error in database preparation', err);
            } else {
                console.log('Database is ready.');
            }
        });
    }

    // add a new document
    self.insert = function(doc, insertCallback/* err, doc*/) {
        cloudantDb.insert(doc, (err, body) => {
            insertCallback(err, body);
        });
    };

    // get a document
    self.get = function(docId, callback/* err, media*/) {
        cloudantDb.get(docId, {
            include_docs: true
        }, callback);
    };

    self.record_log = function(response, callback) {
        var log_data = {};
        log_data['_id'] = nano.toString();
        log_data['timestamp'] = new Date();
        log_data['conversation_id'] = response.context.conversation_id;
        log_data['input'] = response.input.text;
        log_data['output'] = response.output.text[0];
        if ( response.intents.length ) {
            var intent = response.intents[0];
            log_data['intent'] = intent.intent;
            log_data['intent_confidence'] = intent.confidence;
        }
        if ( response.entities.length ) {
            var entity = response.entities[0];
            log_data['entity'] = entity.entity;
            log_data['entity_value'] = entity.value;
        }
        self.insert( log_data, callback );
    }
}

module.exports = function(options) {
  return new CloudandStorage(options);
};


