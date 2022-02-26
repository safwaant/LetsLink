\qecho Creating Database for Calendar...\qecho \qecho 
SELECT 
  current_database();
create database calendar;
\c calendar 
SELECT 
  current_database();

CREATE TABLE Person (
  ID SERIAL NOT NULL, 
  Person_Name VARCHAR(20) NOT NULL, 
  Person_Password VARCHAR(10) NOT NULL UNIQUE, 
  PRIMARY KEY (ID)
);

CREATE TABLE PersonAvailableDays (
  ID SERIAL NOT NULL, 
  Person_AvailableDay DATE NOT NULL, 
  Person_ID SERIAL NOT NULL, 
  PRIMARY KEY (ID), 
  FOREIGN KEY (Person_ID) REFERENCES Person(ID)
);

CREATE TABLE CalendarGroup (
  Group_Code INT NOT NULL UNIQUE, 
  Group_Name VARCHAR(20) NOT NULL, 
  Creator_Name VARCHAR(20) NOT NULL, 
  Group_Start DATE NOT NULL, 
  Group_End DATE NOT NULL, 
  Member_Count INT NOT NULL, 
  PRIMARY KEY (Group_Code)
);

--
-- Data for Name: attendees; Type: TABLE DATA; Schema: public; Owner: postgres
--

CREATE TABLE Color (
  Number_People INTEGER NOT NULL, 
  Hex_Value VARCHAR(6) UNIQUE NOT NULL, 
  PRIMARY KEY (Number_People),
  CONSTRAINT Valid_Number CHECK (Number_People <= 4)  
);

CREATE TABLE GroupAvailableDays (
  ID SERIAL NOT NULL, 
  Group_Code INT UNIQUE NOT NULL, 
  Available_Day DATE NOT NULL, 
  Num_People INT NOT NULL, 
  PRIMARY KEY (ID), 
  FOREIGN KEY (Group_Code) REFERENCES CalendarGroup(Group_Code), 
  FOREIGN KEY (Num_People) REFERENCES Color(Number_People),
  CONSTRAINT Valid_Number CHECK (Num_People <= 4) 
);

CREATE TABLE GroupMembers (
  Group_Code INT, 
  PersonID SERIAL, 
  PRIMARY KEY (Group_Code, PersonID), 
  FOREIGN KEY (Group_Code) REFERENCES CalendarGroup(Group_Code), 
  FOREIGN KEY (PersonID) REFERENCES Person(ID)
);

CREATE TABLE AvailableDaysJoin (
  Group_Avail_ID SERIAL NOT NULL, 
  Person_Avail_ID SERIAL NOT NULL, 
  PRIMARY KEY (Group_Avail_ID, Person_Avail_ID),
  FOREIGN KEY (Person_Avail_ID) REFERENCES PersonAvailableDays(ID), 
  FOREIGN KEY (Group_Avail_ID) REFERENCES GroupAvailableDays(ID)
);

\c postgres 
SELECT 
  current_database();
DROP 
  DATABASE calendar;
