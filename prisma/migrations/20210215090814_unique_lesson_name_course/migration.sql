/*
  Warnings:

  - The migration will add a unique constraint covering the columns `[name,courseId]` on the table `lesson`. If there are existing duplicate values, the migration will fail.

*/
-- DropForeignKey
ALTER TABLE "course" DROP CONSTRAINT "course_languageId_fkey";

-- DropForeignKey
ALTER TABLE "lesson" DROP CONSTRAINT "lesson_courseId_fkey";

-- DropForeignKey
ALTER TABLE "sentence" DROP CONSTRAINT "sentence_lessonId_fkey";

-- DropForeignKey
ALTER TABLE "translation" DROP CONSTRAINT "translation_languageId_fkey";

-- DropForeignKey
ALTER TABLE "translation" DROP CONSTRAINT "translation_sentenceId_fkey";

-- AlterTable
ALTER TABLE "course" ALTER COLUMN "languageId" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lesson_name_course_key" ON "lesson"("name", "courseId");

-- AddForeignKey
ALTER TABLE "course" ADD FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "lesson" ADD FOREIGN KEY ("courseId") REFERENCES "course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sentence" ADD FOREIGN KEY ("lessonId") REFERENCES "lesson"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD FOREIGN KEY ("languageId") REFERENCES "language"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "translation" ADD FOREIGN KEY ("sentenceId") REFERENCES "sentence"("id") ON DELETE CASCADE ON UPDATE CASCADE;
