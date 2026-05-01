/*
  Warnings:

  - The `level` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Level" AS ENUM ('FIRST_YEAR', 'SECOND_YEAR', 'THIRD_YEAR', 'FOURTH_YEAR', 'FIFTH_YEAR', 'GRADUATED', 'POSTGRADUATED', 'MEMBERSHIP');

-- AlterTable
ALTER TABLE "User" DROP COLUMN "level",
ADD COLUMN     "level" "Level" DEFAULT 'FIRST_YEAR';
