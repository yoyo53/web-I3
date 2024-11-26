-- DROP ALL TABLES
-- DROP TABLE IF EXISTS answer_questions CASCADE ;
-- DROP TABLE IF EXISTS survey_answers CASCADE;
-- DROP TABLE IF EXISTS options CASCADE;
-- DROP TABLE IF EXISTS questions CASCADE;
-- DROP TABLE IF EXISTS question_type CASCADE;
-- DROP TABLE IF EXISTS surveys CASCADE;
-- DROP TABLE IF EXISTS survey_templates CASCADE;
-- DROP TABLE IF EXISTS students_classes CASCADE;
-- DROP TABLE IF EXISTS classes CASCADE;
-- DROP TABLE IF EXISTS teachers CASCADE;
-- DROP TABLE IF EXISTS students CASCADE;
-- DROP TABLE IF EXISTS admins CASCADE;
-- DROP TABLE IF EXISTS users CASCADE;
-- DROP TABLE IF EXISTS modules CASCADE;
-- DROP TABLE IF EXISTS subjects CASCADE;

-- Création de la table users
CREATE TABLE IF NOT EXISTS users (
    userID SERIAL PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    firstname VARCHAR(25) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    hashed_password VARCHAR(255) NOT NULL
);

-- Création de la table admins, héritant de users
CREATE TABLE IF NOT EXISTS admins (
    adminID SERIAL PRIMARY KEY,
    FOREIGN KEY (adminID) REFERENCES users(userID)
);

-- Création de la table students, héritant de users
CREATE TABLE IF NOT EXISTS students (
    studentID SERIAL PRIMARY KEY,
    student_number INT UNIQUE NOT NULL,
    FOREIGN KEY (studentID) REFERENCES users(userID)
);

-- Création de la table teachers, héritant de users
CREATE TABLE IF NOT EXISTS teachers (
    teacherID SERIAL PRIMARY KEY,
    teacher_number INT UNIQUE NOT NULL,
    FOREIGN KEY (teacherID) REFERENCES users(userID)
);

-- Création de la table classes
CREATE TABLE IF NOT EXISTS classes (
    classID SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

-- Création de la table students_classes pour la relation entre les étudiants et les classes
CREATE TABLE IF NOT EXISTS students_classes (
    studentID INT NOT NULL,
    classID INT NOT NULL,
    FOREIGN KEY (studentID) REFERENCES students(studentID),
    FOREIGN KEY (classID) REFERENCES classes(classID)
);

-- Création de la table subjects
CREATE TABLE IF NOT EXISTS subjects (
    subjectID SERIAL PRIMARY KEY,
    name VARCHAR(50)
);

-- Création de la table modules
CREATE TABLE IF NOT EXISTS modules (
    moduleID SERIAL PRIMARY KEY,
    teacherID INT NOT NULL,
    classID INT NOT NULL,
    subjectID INT NOT NULL,
    FOREIGN KEY (teacherID) REFERENCES teachers(teacherID),
    FOREIGN KEY (classID) REFERENCES classes(classID),
    FOREIGN KEY (subjectID) REFERENCES subjects(subjectID),
    UNIQUE (teacherID, classID, subjectID)
);

-- Création de la table survey_templates
CREATE TABLE IF NOT EXISTS survey_templates (
    survey_templateID SERIAL PRIMARY KEY
);

-- Création de la table surveys
CREATE TABLE IF NOT EXISTS surveys (
    surveyID SERIAL PRIMARY KEY,
    moduleID INT NOT NULL,
    survey_templateID INT NOT NULL,
    FOREIGN KEY (moduleID) REFERENCES modules(moduleID),
    FOREIGN KEY (survey_templateID) REFERENCES survey_templates(survey_templateID)
);


-- Création de la table question_type
CREATE TABLE IF NOT EXISTS question_type (
    question_typeID SERIAL PRIMARY KEY, 
    question_type VARCHAR(50) UNIQUE NOT NULL
);

INSERT INTO question_type (question_type) VALUES ('text'), ('radio'), ('checkbox'), ('score') ON CONFLICT DO NOTHING;

-- Création de la table questions
CREATE TABLE IF NOT EXISTS questions (
    questionID SERIAL PRIMARY KEY,
    question_typeID INT NOT NULL,
    survey_templateID INT NOT NULL,
    question_text TEXT,
    FOREIGN KEY (survey_templateID) REFERENCES survey_templates(survey_templateID),
    FOREIGN KEY (question_typeID) REFERENCES question_type(question_typeID)
);

-- Création de la table options pour les choix de réponses
CREATE TABLE IF NOT EXISTS options (
    optionID INT NOT NULL,
    questionID INT NOT NULL,
    option_text TEXT,
    FOREIGN KEY (questionID) REFERENCES questions(questionID),
    PRIMARY KEY (optionID, questionID)
);

-- Création de la table survey_answers pour stocker les réponses aux enquêtes
CREATE TABLE IF NOT EXISTS survey_answers (
    survey_answerID SERIAL PRIMARY KEY,
    surveyID INT NOT NULL,
    studentID INT NOT NULL,
    FOREIGN KEY (surveyID) REFERENCES surveys(surveyID),
    FOREIGN KEY (studentID) REFERENCES students(studentID)
);

-- Création de la table answer_questions pour stocker les réponses aux questions
CREATE TABLE IF NOT EXISTS answer_questions (
    survey_answerID INT NOT NULL,
    questionID INT NOT NULL,
    answer_text TEXT NOT NULL,
    FOREIGN KEY (questionID) REFERENCES questions(questionID),
    FOREIGN KEY (survey_answerID) REFERENCES survey_answers(survey_answerID),
    PRIMARY KEY (survey_answerID, questionID)
);

INSERT INTO users (name, firstname, email, hashed_password) VALUES ('Augustin', 'Jacques', 'jacques.augustin@efrei.net','password');
INSERT INTO teachers (teacherid, teacher_number) VALUES ('9', '123');
SELECT users.name AS lastname, users.firstname AS firstname,subjects.name AS subject,groups.name AS group FROM surveys JOIN modules USING (moduleid) JOIN subjects USING (subjectid) JOIN groups USING (groupid) JOIN teachers USING (teacherid) JOIN users ON users.userid = teachers.teacherid;