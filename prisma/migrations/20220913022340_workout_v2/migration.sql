/*
  Warnings:

  - A unique constraint covering the columns `[name,creatorName]` on the table `Workout` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Workout_name_creatorName_key" ON "Workout"("name", "creatorName");
