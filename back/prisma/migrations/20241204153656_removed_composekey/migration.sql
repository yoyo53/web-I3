/*
  Warnings:

  - The primary key for the `options` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "options" DROP CONSTRAINT "options_pkey",
ADD CONSTRAINT "options_pkey" PRIMARY KEY ("optionID");
