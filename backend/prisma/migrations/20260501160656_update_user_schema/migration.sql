/*
  Warnings:

  - You are about to drop the column `level` on the `User_Info` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "level" INTEGER DEFAULT 1;

-- AlterTable
ALTER TABLE "User_Info" DROP COLUMN "level";
