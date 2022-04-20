const client = require('../initDB');

module.exports = class ColorDAO {
    constructor(){
      this.client = client;  
    }

    getColorForDay(groupCode, date){
        const sql = 
        `SELECT G.Available_Day, C.Color_Name 
        FROM Color C 
        JOIN GroupAvailableDays G ON (C.Number_People = G.Num_People) 
        WHERE G.Available_Day = TO_DATE($1, 'YYYY-MM-DD') AND G.group_code = $2`;
        return this.client.query(sql, [date, groupCode]);
      }
}
