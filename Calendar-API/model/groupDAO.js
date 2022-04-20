const client = require('../initDB');
class GroupDAO{
    constructor(){
        this.client = client;
    }
    
    addGroupDay(day){
        
    }

    getAllGroupAvailDays(){
      const sql = `SELECT * FROM GroupAvailableDays`;
      return this.client.query(sql);
    }
}

module.exports = GroupDAO;

