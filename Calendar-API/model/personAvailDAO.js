const client = require("../initDB");
const GroupCalDAO = require("./groupAvailDAO");

let GroupCalDAO = new GroupCalDAO();

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

  //check
  addPersonAvailableDay(dayInfo) {
      const sql = 
      `INSERT INTO PersonAvailableDays (Person_AvailableDay, Person_ID) 
      VALUES (TO_DATE($1,'YYYY-MM-DD'), $2)`;
      this.client.query(sql, [dayInfo.date, dayInfo.person_id]);

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
      return this.client.query(sql2, [dayInfo.date, dayInfo.person_id]);
  }
}

module.exports = PersonCalDAO;
