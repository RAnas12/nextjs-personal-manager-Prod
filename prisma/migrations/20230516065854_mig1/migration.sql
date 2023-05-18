/*
  Warnings:

  - A unique constraint covering the columns `[apiId,workoutId]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Exercise_apiId_workoutId_key` ON `Exercise`(`apiId`, `workoutId`);
