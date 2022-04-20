const client = require("../initDB");
class PersonCalDAO {
  constructor() {
    this.client = client;
  }

  getAllPeople(){
    const sql = `SELECT * FROM PersonAvailableDays`;
    return this.client.query(sql);
  }

  getGroupMembers(groupCode){
    const sql = `SELECT P.Person_Name FROM Person P JOIN GroupMembers G ON (G.personid = P.id) WHERE (G.Group_Code = $1)`;
    return this.client.query(sql, [groupCode]);
  }

  getGroupAvailableDays(groupCode){
    const sql = `SELECT Available_Day FROM GroupAvailableDays WHERE Group_Code = $1`;
    return this.client.query(sql, [groupCode]); 
  }

  getAllGroupAvailDays() {
    const sql = `SELECT * FROM GroupAvailableDays`;
    return this.client.query(sql);
  }

  addPersonAvailableDay() {
      
  }
}

module.exports = GroupDAO;
