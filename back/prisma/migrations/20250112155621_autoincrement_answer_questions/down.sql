-- AlterTable
ALTER TABLE "answer_questions" DROP CONSTRAINT "answer_questions_pkey",
DROP COLUMN "answer_questionID",
ADD CONSTRAINT "answer_questions_pkey" PRIMARY KEY ("survey_answerID", "questionID");

