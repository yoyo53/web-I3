-- DROP ALL TABLES
-- DROP TABLE IF EXISTS answer_questions;
-- DROP TABLE IF EXISTS survey_answers;
-- DROP TABLE IF EXISTS options;
-- DROP TABLE IF EXISTS questions;
-- DROP TABLE IF EXISTS question_type;
-- DROP TABLE IF EXISTS surveys;
-- DROP TABLE IF EXISTS subjects;
-- DROP TABLE IF EXISTS students_classes;
-- DROP TABLE IF EXISTS classes;
-- DROP TABLE IF EXISTS teachers;
-- DROP TABLE IF EXISTS students;
-- DROP TABLE IF EXISTS admins;
-- DROP TABLE IF EXISTS users;


-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
    userID SERIAL PRIMARY KEY,
    name VARCHAR(25),
    firstname VARCHAR(25),
    email VARCHAR(50) UNIQUE,
    hashed_password VARCHAR(255)
);

-- Création de la table admins, héritant de users
CREATE TABLE IF NOT EXISTS admins (
    adminID SERIAL PRIMARY KEY,
    FOREIGN KEY (adminID) REFERENCES users(userID)
);

-- Création de la table students, héritant de users
CREATE TABLE IF NOT EXISTS students (
    studentID SERIAL PRIMARY KEY,
    student_number INT UNIQUE,
    FOREIGN KEY (studentID) REFERENCES users(userID)
);

-- Création de la table teachers, héritant de users
CREATE TABLE IF NOT EXISTS teachers (
    teacherID SERIAL PRIMARY KEY,
    teacher_number INT UNIQUE,
    FOREIGN KEY (teacherID) REFERENCES users(userID)
);

-- Création de la table classes
CREATE TABLE IF NOT EXISTS classes (
    classID SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

-- Création de la table students_classes pour la relation entre les étudiants et les classes
CREATE TABLE IF NOT EXISTS students_classes (
    studentID INT,
    classID INT,
    FOREIGN KEY (studentID) REFERENCES students(studentID),
    FOREIGN KEY (classID) REFERENCES classes(classID)
);

-- Création de la table subjects
CREATE TABLE IF NOT EXISTS subjects (
    subjectID SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

-- Création de la table surveys
CREATE TABLE IF NOT EXISTS surveys (
    surveyID SERIAL PRIMARY KEY,
    teacherID INT,
    classID INT,
    subjectID INT,
    FOREIGN KEY (teacherID) REFERENCES teachers(teacherID),
    FOREIGN KEY (classID) REFERENCES classes(classID),
    FOREIGN KEY (subjectID) REFERENCES subjects(subjectID),
    UNIQUE (teacherID, classID, subjectID)
);

-- Création de la table question_type
CREATE TABLE IF NOT EXISTS question_type (
    question_typeID SERIAL PRIMARY KEY, 
    question_type VARCHAR(50) UNIQUE
);

INSERT INTO question_type (question_type) VALUES ('text'), ('radio'), ('checkbox'), ('score') ON CONFLICT DO NOTHING;

-- Création de la table questions
CREATE TABLE IF NOT EXISTS questions (
    questionID SERIAL PRIMARY KEY,
    question_typeID INT,
    surveyID INT,
    question_text TEXT,
    FOREIGN KEY (surveyID) REFERENCES surveys(surveyID),
    FOREIGN KEY (question_typeID) REFERENCES question_type(question_typeID)
);

-- Création de la table options pour les choix de réponses
CREATE TABLE IF NOT EXISTS options (
    optionID INT,
    questionID INT,
    option_text TEXT,
    FOREIGN KEY (questionID) REFERENCES questions(questionID),
    PRIMARY KEY (optionID, questionID)
);

-- Création de la table survey_answers pour stocker les réponses aux enquêtes
CREATE TABLE IF NOT EXISTS survey_answers (
    survey_answerID SERIAL PRIMARY KEY,
    surveyID INT,
    studentID INT,
    FOREIGN KEY (surveyID) REFERENCES surveys(surveyID),
    FOREIGN KEY (studentID) REFERENCES students(studentID)
);

-- Création de la table answer_questions pour stocker les réponses aux questions
CREATE TABLE IF NOT EXISTS answer_questions (
    survey_answerID INT,
    questionID INT,
    answer_text TEXT,
    FOREIGN KEY (questionID) REFERENCES questions(questionID),
    FOREIGN KEY (survey_answerID) REFERENCES survey_answers(survey_answerID),
    PRIMARY KEY (survey_answerID, questionID)
);