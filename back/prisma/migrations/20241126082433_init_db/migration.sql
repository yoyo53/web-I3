-- CreateTable
CREATE TABLE "users" (
    "userID" SERIAL NOT NULL,
    "firstname" VARCHAR(25) NOT NULL,
    "lastname" VARCHAR(25) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "hashed_password" VARCHAR(255),

    CONSTRAINT "users_pkey" PRIMARY KEY ("userID")
);

-- CreateTable
CREATE TABLE "admins" (
    "adminID" SERIAL NOT NULL,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("adminID")
);

-- CreateTable
CREATE TABLE "students" (
    "studentID" SERIAL NOT NULL,
    "student_number" INTEGER NOT NULL,

    CONSTRAINT "students_pkey" PRIMARY KEY ("studentID")
);

-- CreateTable
CREATE TABLE "teachers" (
    "teacherID" SERIAL NOT NULL,
    "teacher_number" INTEGER NOT NULL,

    CONSTRAINT "teachers_pkey" PRIMARY KEY ("teacherID")
);

-- CreateTable
CREATE TABLE "groups" (
    "groupID" SERIAL NOT NULL,
    "name" VARCHAR(50),

    CONSTRAINT "groups_pkey" PRIMARY KEY ("groupID")
);

-- CreateTable
CREATE TABLE "subjects" (
    "subjectID" SERIAL NOT NULL,
    "name" VARCHAR(50),

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("subjectID")
);

-- CreateTable
CREATE TABLE "modules" (
    "moduleID" SERIAL NOT NULL,
    "teacherID" INTEGER NOT NULL,
    "groupID" INTEGER NOT NULL,
    "subjectID" INTEGER NOT NULL,

    CONSTRAINT "modules_pkey" PRIMARY KEY ("moduleID")
);

-- CreateTable
CREATE TABLE "survey_templates" (
    "survey_templateID" SERIAL NOT NULL,

    CONSTRAINT "survey_templates_pkey" PRIMARY KEY ("survey_templateID")
);

-- CreateTable
CREATE TABLE "surveys" (
    "surveyID" SERIAL NOT NULL,
    "moduleID" INTEGER NOT NULL,
    "survey_templateID" INTEGER NOT NULL,

    CONSTRAINT "surveys_pkey" PRIMARY KEY ("surveyID")
);

-- CreateTable
CREATE TABLE "question_types" (
    "question_typeID" SERIAL NOT NULL,
    "question_type" VARCHAR(50) NOT NULL,

    CONSTRAINT "question_types_pkey" PRIMARY KEY ("question_typeID")
);

-- CreateTable
CREATE TABLE "questions" (
    "questionID" SERIAL NOT NULL,
    "question_typeID" INTEGER NOT NULL,
    "survey_templateID" INTEGER NOT NULL,
    "question_text" TEXT,

    CONSTRAINT "questions_pkey" PRIMARY KEY ("questionID")
);

-- CreateTable
CREATE TABLE "options" (
    "optionID" INTEGER NOT NULL,
    "questionID" INTEGER NOT NULL,
    "option_text" TEXT,

    CONSTRAINT "options_pkey" PRIMARY KEY ("optionID","questionID")
);

-- CreateTable
CREATE TABLE "survey_answers" (
    "survey_answerID" SERIAL NOT NULL,
    "surveyID" INTEGER NOT NULL,
    "studentID" INTEGER NOT NULL,

    CONSTRAINT "survey_answers_pkey" PRIMARY KEY ("survey_answerID")
);

-- CreateTable
CREATE TABLE "answer_questions" (
    "survey_answerID" INTEGER NOT NULL,
    "questionID" INTEGER NOT NULL,
    "answer_text" TEXT NOT NULL,

    CONSTRAINT "answer_questions_pkey" PRIMARY KEY ("survey_answerID","questionID")
);

-- CreateTable
CREATE TABLE "_groupsTostudents" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "students_student_number_key" ON "students"("student_number");

-- CreateIndex
CREATE UNIQUE INDEX "teachers_teacher_number_key" ON "teachers"("teacher_number");

-- CreateIndex
CREATE UNIQUE INDEX "modules_teacherID_groupID_subjectID_key" ON "modules"("teacherID", "groupID", "subjectID");

-- CreateIndex
CREATE UNIQUE INDEX "question_types_question_type_key" ON "question_types"("question_type");

-- CreateIndex
CREATE UNIQUE INDEX "_groupsTostudents_AB_unique" ON "_groupsTostudents"("A", "B");

-- CreateIndex
CREATE INDEX "_groupsTostudents_B_index" ON "_groupsTostudents"("B");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_adminID_fkey" FOREIGN KEY ("adminID") REFERENCES "users"("userID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "students" ADD CONSTRAINT "students_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "users"("userID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "teachers" ADD CONSTRAINT "teachers_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "users"("userID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_groupID_fkey" FOREIGN KEY ("groupID") REFERENCES "groups"("groupID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_subjectID_fkey" FOREIGN KEY ("subjectID") REFERENCES "subjects"("subjectID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "modules" ADD CONSTRAINT "modules_teacherID_fkey" FOREIGN KEY ("teacherID") REFERENCES "teachers"("teacherID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_moduleID_fkey" FOREIGN KEY ("moduleID") REFERENCES "modules"("moduleID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "surveys" ADD CONSTRAINT "surveys_survey_templateID_fkey" FOREIGN KEY ("survey_templateID") REFERENCES "survey_templates"("survey_templateID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_question_typeID_fkey" FOREIGN KEY ("question_typeID") REFERENCES "question_types"("question_typeID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "questions" ADD CONSTRAINT "questions_survey_templateID_fkey" FOREIGN KEY ("survey_templateID") REFERENCES "survey_templates"("survey_templateID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "options" ADD CONSTRAINT "options_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "questions"("questionID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_studentID_fkey" FOREIGN KEY ("studentID") REFERENCES "students"("studentID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "survey_answers" ADD CONSTRAINT "survey_answers_surveyID_fkey" FOREIGN KEY ("surveyID") REFERENCES "surveys"("surveyID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answer_questions" ADD CONSTRAINT "answer_questions_questionID_fkey" FOREIGN KEY ("questionID") REFERENCES "questions"("questionID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "answer_questions" ADD CONSTRAINT "answer_questions_survey_answerID_fkey" FOREIGN KEY ("survey_answerID") REFERENCES "survey_answers"("survey_answerID") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_groupsTostudents" ADD CONSTRAINT "_groupsTostudents_A_fkey" FOREIGN KEY ("A") REFERENCES "groups"("groupID") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_groupsTostudents" ADD CONSTRAINT "_groupsTostudents_B_fkey" FOREIGN KEY ("B") REFERENCES "students"("studentID") ON DELETE CASCADE ON UPDATE CASCADE;
