const mongodb = require('mongodb');

 class MongoDB {
    constructor(url, db, collections) {
        this.ObjectID = mongodb.ObjectID;

        this.connection = new mongodb.MongoClient(url, { useUnifiedTopology: true });
        this.connected = new Promise((resolve, reject) => {
            this.connection.connect((error, client) => {
                if (error) return reject(error);

                this.db = client.db(db);
                for (let collection of collections) this[collection] = this.db.collection(collection);

                resolve();
            });
        });
    }
}

module.exports = MongoDB;