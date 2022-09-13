/*
  Warnings:

  - You are about to drop the column `creatorId` on the `Workout` table. All the data in the column will be lost.
  - Added the required column `creatorName` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_creatorId_fkey";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "creatorId",
ADD COLUMN     "creatorName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_creatorName_fkey" FOREIGN KEY ("creatorName") REFERENCES "AppUser"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
