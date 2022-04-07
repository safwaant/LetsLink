const client = require('../initDB');

client.connect().finally(() => client.end);