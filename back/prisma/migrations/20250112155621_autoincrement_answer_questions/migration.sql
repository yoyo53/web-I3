/*
  Warnings:

  - The primary key for the `answer_questions` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "answer_questions" DROP CONSTRAINT "answer_questions_pkey",
ADD COLUMN     "answer_questionID" SERIAL NOT NULL,
ADD CONSTRAINT "answer_questions_pkey" PRIMARY KEY ("answer_questionID");
