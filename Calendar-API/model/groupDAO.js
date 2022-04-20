const client = require("../initDB");
class GroupDAO {
  constructor() {
    this.client = client;
  }

  getDaysToMeet(groupCode){
    const sql =
    `SELECT available_day, num_people 
    FROM GroupAvailableDays 
    WHERE (group_code = $1) 
    ORDER BY num_people Desc`;
    return this.client.query(sql, [groupCode]);
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
  

  getAllGroupData(){
    const sql = `SELECT * FROM CalendarGroup`;
    return this.client.query(sql);
  }
}

module.exports = GroupDAO;
