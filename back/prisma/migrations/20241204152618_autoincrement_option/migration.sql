-- AlterTable
CREATE SEQUENCE options_optionid_seq;
ALTER TABLE "options" ALTER COLUMN "optionID" SET DEFAULT nextval('options_optionid_seq');
ALTER SEQUENCE options_optionid_seq OWNED BY "options"."optionID";
