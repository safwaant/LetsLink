---
--- Debugging output statemeents for initial setup of the database
---
\qecho Creating Database for Calendar...\qecho \qecho 
SELECT 
  current_database();
CREATE DATABASE Calendar;
\c Calendar 

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
-- Data for Name: Color; Type: TABLE DATA; Schema: public; Owner: postgres
--

CREATE TABLE Color (
  Number_People INTEGER UNIQUE NOT NULL, 
  Hex_Value VARCHAR(7) UNIQUE NOT NULL, 
  Color_Name VARCHAR(20) UNIQUE NOT NULL,
  PRIMARY KEY (Number_People),
  CONSTRAINT Valid_Number CHECK (Number_People <= 4)  
);

CREATE TABLE GroupAvailableDays (
  ID SERIAL NOT NULL, 
  Group_Code INT NOT NULL, 
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

COPY Person (Id, Person_Name, Person_Password) 
FROM stdin (FORMAT 'csv');
1,Lucas,example1
2,Omar,example2
3,Veronika,example3
4,Safwaan,example4
5,Neil,example5
\.

COPY PersonAvailableDays (ID, Person_AvailableDay, Person_ID)
FROM STDIN (FORMAT 'csv');
1,2022-02-21,1 
2,2022-02-22,1 
3,2022-02-23,1 
4,2022-02-24,1 
5,2022-02-21,2 
6,2022-02-22,2 
7,2022-02-23,2 
8,2022-02-26,3 
9,2022-02-27,3 
10,2022-02-28,3 
11,2022-03-01,3 
12,2022-02-21,3 
13,2022-02-22,4 
14,2022-02-21,4 
15,2022-02-26,4 
16,2022-03-06,4 
17,2022-03-07,4 
18,2022-02-23,5 
19,2022-02-24,5 
20,2022-02-21,5 
21,2022-02-22,5 
\.

COPY CalendarGroup (Group_Code, Group_Name, Creator_Name, Group_Start, Group_End, Member_Count)
FROM stdin (FORMAT 'csv');
1,VeronikaGroup,Veronika,2022-02-21,2022-03-02,4
2,NeilGroup,Neil,2008-11-12,2022-02-26,1
\.

COPY Color(Number_People, Hex_Value, Color_Name) 
FROM stdin (FORMAT 'csv');
1,#FFFF00,Yellow
2,#9acd32,YellowGreen
3,#00FF00,Green
\.

COPY GroupMembers (Group_Code, PersonID) 
FROM stdin (FORMAT 'csv');
1,1
1,2
1,3
1,4
2,5
\.


COPY GroupAvailableDays (ID, Group_Code, Available_Day, Num_People) 
FROM stdin (FORMAT 'csv');
1,1,2022-02-21,3
2,1,2022-02-22,3
3,1,2022-02-23,2
4,1,2022-02-24,1
5,1,2022-02-26,2
6,1,2022-02-27,1
7,1,2022-02-28,1
8,1,2022-03-01,1
9,1,2022-03-06,1
10,1,2022-03-07,1
\.


COPY AvailableDaysJoin (Group_Avail_ID, Person_Avail_ID) 
FROM stdin (FORMAT 'csv');
1,1
1,2
1,3
1,4
2,5
\.

\qecho Finished creating the database . . . 
\c postgres
DROP DATABASE Calendar;