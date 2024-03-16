/* PORT = 5432, database name on server = 'talentgift' */

CREATE TYPE REPORT_TYPE AS ENUM ('company', 'survey'); /* Custom type used for another table */




CREATE TABLE USERS(
    UID SERIAL NOT NULL,  /* Unique uid for each user */
    DateModified DATE NOT NULL,  /* Stores the date the last time user updated name */
    FirstName VARCHAR(255),
    LastName VARCHAR(255),
    Email VARCHAR(255),
    Password VARCHAR(255),
    OID INTEGER, 
    Manager BOOLEAN,
    Role VARCHAR(255),  /* Manager or Employee etc. */
    CriticalPositions INTEGER[],
    Notifications BOOLEAN NOT NULL, /* sets whether survey notifications are activated for user */
    PRIMARY KEY (UID)

);


CREATE TABLE ORGANIZATIONS(
    OID SERIAL NOT NULL, /* STORES ORGANIZATION UNIQUE ID'S */
    MID INTEGER, /* STORES ORGANIZATION MANAGER ID */
    ORGNAME VARCHAR(255) NOT NULL, /* STORES ORGANIZATION NAME */
    PRIMARY KEY (OID),
    FOREIGN KEY (MID) REFERENCES USERS(UID),
    ON DELETE CASCADE
);




/* Answers stored in the following format: Answer[i]= 'answer1 & answer2 & answer3..' */

CREATE TABLE SURVEYS( /* Relational Table */
    SID SERIAL NOT NULL, /* UNIQUE SURVEY ID */
    OID INTEGER, /* Used to know to which employees this must be released to */
    ReleaseDate DATE NOT NULL,
    DueDate DATE NOT NULL,
    NumQuestions INTEGER NOT NULL,
    Questions TEXT[],
    Answers TEXT[][], /* Possible Answers set by Manager */
    Visibility BOOLEAN NOT NULL ,  /* Survey Visibility */
    PRIMARY KEY (SID),
    FOREIGN KEY (OID) REFERENCES ORGANIZATIONS(OID),

);


CREATE TABLE PASS_LINKS(
    UID INTEGER,
    EMAIL VARCHAR(255),
    TOKEN TEXT,
    EXPIRATION DATE,
    PRIMARY KEY(UID)
);




CREATE TABLE ANSWERS( /* STORES SURVEY ANSWERS */
    SID INTEGER NOT NULL, /* Survey to which answers correspond to */
    UserID INTEGER, /* User who answered this survey */
    OID INTEGER,
    Answers TEXT[],
    PRIMARY KEY (SID,UserID),
    FOREIGN KEY (SID) REFERENCES SURVEYS(SID),

);

/* For each answer set, meanings are stored here for each surver */
/* Stored in the following format: MEANINGS[i]= 'meaning1 & meaning2...' */
CREATE TABLE ANSWER_MEANINGS( 
    SID INTEGER,
    MEANINGS TEXT[] /* meanings for each answer set in all questions */
);




CREATE TABLE ManagerReports(
    TID  SERIAL NOT NULL,   /* STORES the id of the employee who took the survey*/
    OID INTEGER, /* Organization that owns the report (for data integrity) */
    Type REPORT_TYPE NOT NULL, /* Type of report */
    MID INTEGER, /* Manager ID */
    SID INTEGER, /* Survey ID the report pertains to if Type = survey (this field can be null) */
    


    /* More info to be added later */

    PRIMARY KEY (TID,SID),
    FOREIGN KEY (OID) REFERENCES ORGANIZATIONS(OID),
    FOREIGN KEY (MID) REFERENCES USERS(UID),
    FOREIGN KEY (SID) REFERENCES SURVEYS(SID)
    
);





CREATE TABLE UserReports(
    UID INTEGER NOT NULL, /* User who took the report */
    OID INTEGER, /* Organiation ID */
    SID INTEGER,  /* Survey ID to which the report pertains */

    /* More Information to be added */
    
    PRIMARY KEY (UID,SID),
    FOREIGN KEY (OID) REFERENCES ORGANIZATIONS(OID),
    FOREIGN KEY (SID) REFERENCES SURVEYS(SID)
    ON DELETE CASCADE
);


CREATE TABLE OTLinks(

    TOKEN TEXT NOT NULL, /* this is the one time link */
    UID INTEGER,
    EMAIL VARCHAR(255),
    MANAGER BOOLEAN,
    EXPIRATION DATE,
    PRIMARY KEY (TOKEN)
)



ALTER TABLE USERS 
ADD CONSTRAINT org_foreign_key FOREIGN KEY (OID) 
REFERENCES ORGANIZATIONS(OID) ON DELETE SET NULL;
