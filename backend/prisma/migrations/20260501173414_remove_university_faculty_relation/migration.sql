/*
  Warnings:

  - You are about to drop the column `universityId` on the `Faculty` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Faculty" DROP CONSTRAINT "Faculty_universityId_fkey";

-- AlterTable
ALTER TABLE "Faculty" DROP COLUMN "universityId";
