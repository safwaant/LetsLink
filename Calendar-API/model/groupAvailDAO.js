const client = require("../initDB");
class GroupCalDAO {
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

  addGroupCalDay(){
   const sql2 = 
   `INSERT INTO GroupAvailableDays (num_people, available_day, group_code)
   SELECT 1, TO_DATE($1,'YYYYMMDD'), Table1.group_code
   FROM (SELECT group_code
   FROM person
   JOIN groupmembers ON (groupmembers.personid = person.id)
   WHERE Person.id = $2
   ) AS Table1
   ON CONFLICT (group_code, available_day) DO
   UPDATE SET num_people = groupavailabledays.num_people + 1;`
   
  }
}

module.exports = GroupCalDAO;
