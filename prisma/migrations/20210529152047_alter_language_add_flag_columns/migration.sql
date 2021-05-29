/*
  Warnings:

  - The primary key for the `course` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `language` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `lesson` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sentence` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `translation` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "language"
ADD COLUMN     "flag" TEXT DEFAULT E'',
ADD COLUMN     "shinyFlag" TEXT DEFAULT E''
