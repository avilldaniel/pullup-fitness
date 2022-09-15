/*
  Warnings:

  - You are about to drop the column `creatorName` on the `Workout` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name,creatorEmail]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `creatorEmail` to the `Workout` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Workout" DROP CONSTRAINT "Workout_creatorName_fkey";

-- DropIndex
DROP INDEX "Workout_name_creatorName_key";

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "creatorName",
ADD COLUMN     "creatorEmail" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Workout_name_creatorEmail_key" ON "Workout"("name", "creatorEmail");

-- AddForeignKey
ALTER TABLE "Workout" ADD CONSTRAINT "Workout_creatorEmail_fkey" FOREIGN KEY ("creatorEmail") REFERENCES "AppUser"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
