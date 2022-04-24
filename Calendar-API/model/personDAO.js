const client = require('../initDB');

class PersonDAO {
    constructor(){
        this.client = client;
    }

    getAllPersons(){
        const sql =
        `SELECT * FROM person`;
        return this.client.query(sql);
    }

    getPersonFromName(){
        const sql = 
        ``;
        return this.client.query(sql, );
    }
}

module.exports = PersonDAO;