-- DropForeignKey
ALTER TABLE "admins" DROP CONSTRAINT "admins_adminID_fkey";

-- DropForeignKey
ALTER TABLE "students" DROP CONSTRAINT "students_studentID_fkey";

-- DropForeignKey
ALTER TABLE "teachers" DROP CONSTRAINT "teachers_teacherID_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_groupID_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_subjectID_fkey";

-- DropForeignKey
ALTER TABLE "modules" DROP CONSTRAINT "modules_teacherID_fkey";

-- DropForeignKey
ALTER TABLE "surveys" DROP CONSTRAINT "surveys_moduleID_fkey";

-- DropForeignKey
ALTER TABLE "surveys" DROP CONSTRAINT "surveys_survey_templateID_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_question_typeID_fkey";

-- DropForeignKey
ALTER TABLE "questions" DROP CONSTRAINT "questions_survey_templateID_fkey";

-- DropForeignKey
ALTER TABLE "options" DROP CONSTRAINT "options_questionID_fkey";

-- DropForeignKey
ALTER TABLE "survey_answers" DROP CONSTRAINT "survey_answers_studentID_fkey";

-- DropForeignKey
ALTER TABLE "survey_answers" DROP CONSTRAINT "survey_answers_surveyID_fkey";

-- DropForeignKey
ALTER TABLE "answer_questions" DROP CONSTRAINT "answer_questions_questionID_fkey";

-- DropForeignKey
ALTER TABLE "answer_questions" DROP CONSTRAINT "answer_questions_survey_answerID_fkey";

-- DropForeignKey
ALTER TABLE "_groupsTostudents" DROP CONSTRAINT "_groupsTostudents_A_fkey";

-- DropForeignKey
ALTER TABLE "_groupsTostudents" DROP CONSTRAINT "_groupsTostudents_B_fkey";

-- DropTable
DROP TABLE "users";

-- DropTable
DROP TABLE "admins";

-- DropTable
DROP TABLE "students";

-- DropTable
DROP TABLE "teachers";

-- DropTable
DROP TABLE "groups";

-- DropTable
DROP TABLE "subjects";

-- DropTable
DROP TABLE "modules";

-- DropTable
DROP TABLE "survey_templates";

-- DropTable
DROP TABLE "surveys";

-- DropTable
DROP TABLE "question_types";

-- DropTable
DROP TABLE "questions";

-- DropTable
DROP TABLE "options";

-- DropTable
DROP TABLE "survey_answers";

-- DropTable
DROP TABLE "answer_questions";

-- DropTable
DROP TABLE "_groupsTostudents";

