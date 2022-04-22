const client = require("../initDB");
class GroupDAO {
  constructor() {
    this.client = client;
  }

  insertNewGroup(groupInfo){
    const sql = 
    `INSERT INTO calendargroup 
      (group_code, group_name, creator_name, group_start, group_end, member_count) 
    VALUES ($1, $2, $3, 
    TO_DATE($4,'YYYY-MM-DD'),
    TO_DATE($5,'YYYY-MM-DD'), $6)`;
    const params = 
    [
     parseInt(groupInfo.group_code),
     groupInfo.group_name, 
     groupInfo.creator_name, 
     groupInfo.start_date, 
     groupInfo.end_date, 
     parseInt(groupInfo.max_members)
    ]; 
    try{
      this.client.query(sql, params);
      return `Successful Insert of ${params[1]} group`;
    }catch(err){
      return `Failed Insert of ${params[1]} group`;
    }
  }

  getGroupMembers(groupCode){
    const sql = 
    `SELECT P.Person_Name 
    FROM Person P 
    JOIN GroupMembers G ON (G.personid = P.id) 
    WHERE (G.Group_Code = $1)`;
    return this.client.query(sql, [groupCode]);
  }

  getAllGroupData(){
    const sql = `SELECT * FROM CalendarGroup`;
    return this.client.query(sql);
  }
}

module.exports = GroupDAO;
