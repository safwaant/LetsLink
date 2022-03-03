# Testing Documentation

## **Creating the Database**

### Connect to the Postgres

* Once you have connected find the local path of `calendardb.sql` on your computer
* Example: `D:/LetsLink/calendardatabase.sql`

* After doing so run the following command on postgres
* `\i '<filepath>'`


## **API Testing Utlizing Curl**
### GET APIs
#### Windows

* GET: `curl --request GET 'http://localhost:3000/api/v1/meeting'-v`

#### Linux

* GET: `curl http://localhost:3000/api/v1/login`