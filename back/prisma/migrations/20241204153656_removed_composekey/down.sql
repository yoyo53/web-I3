-- AlterTable
ALTER TABLE "options" DROP CONSTRAINT "options_pkey",
ADD CONSTRAINT "options_pkey" PRIMARY KEY ("optionID", "questionID");

