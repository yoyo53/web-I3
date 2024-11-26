-- Peuplement de la table users
INSERT INTO users (name, firstname, email, hashed_password) VALUES
('Doe', 'John', 'john.doe@example.com', 'hashed_password_1'),
('Smith', 'Alice', 'alice.smith@example.com', 'hashed_password_2'),
('Johnson', 'Bob', 'bob.johnson@example.com', 'hashed_password_3');

-- Peuplement de la table students
INSERT INTO students (studentID, student_number) VALUES
(2, 10001), -- Alice Smith est une étudiante
(3, 10002); -- Bob Johnson est un étudiant

-- Peuplement de la table teachers
INSERT INTO teachers (teacherID, teacher_number) VALUES
(1, 20001); -- John Doe est aussi un enseignant

-- Peuplement de la table classes
INSERT INTO groups (name) VALUES
('Math 101'),
('History 202');

-- Peuplement de la table students_classes pour la relation entre les étudiants et les classes
INSERT INTO students_classes (studentID, classID) VALUES
(2, 1), -- Alice Smith est dans Math 101
(3, 2); -- Bob Johnson est dans History 202

-- Peuplement de la table survey_templates
INSERT INTO survey_templates DEFAULT VALUES;

-- Peuplement de la table surveys
INSERT INTO surveys (moduleID, survey_templateID) VALUES
(1, 1);

-- Peuplement de la table question_type
INSERT INTO question_type (question_type) VALUES
('text'), ('radio'), ('checkbox'), ('score') ON CONFLICT DO NOTHING;

-- Peuplement de la table questions
INSERT INTO questions (question_typeID, survey_templateID, question_text) VALUES
(1, 1, 'What is your favorite color?'),
(2, 1, 'Do you like ice cream?');

-- Peuplement de la table options
INSERT INTO options (optionID, questionID, option_text) VALUES
(1, 1, 'Red'),
(2, 1, 'Blue'),
(3, 2, 'Yes'),
(4, 2, 'No');

-- Peuplement de la table survey_answers
INSERT INTO survey_answers (surveyID, studentID) VALUES
(1, 2), -- Réponse d'Alice Smith
(1, 3); -- Réponse de Bob Johnson

-- Peuplement de la table answer_questions
INSERT INTO answer_questions (survey_answerID, questionID, answer_text) VALUES
(1, 1, 'Red'), -- Réponse d'Alice Smith à la première question
(2, 2, 'Yes'); -- Réponse de Bob Johnson à la deuxième question

INSERT INTO subjects (name) VALUES
('Mathematics'),
('History'),
('Science');

-- Peuplement de la table modules
INSERT INTO modules (teacherid, groupid, subjectid) VALUES
((SELECT teacherid FROM teachers WHERE teacher_number = 12345), (SELECT groupid FROM groups WHERE name = 'Math 101'), (SELECT subjectid FROM subjects WHERE name = 'Mathematics')),
((SELECT teacherid FROM teachers WHERE teacher_number = 12345), (SELECT groupid FROM groups WHERE name = 'History 202'), (SELECT subjectid FROM subjects WHERE name = 'History'));