-- CreateTable
CREATE TABLE `Todos` (
    `id` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `task` VARCHAR(191) NULL,
    `isCompleted` BOOLEAN NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NULL,
    `email` VARCHAR(191) NULL,
    `emailVerified` DATETIME(3) NULL,
    `password` VARCHAR(191) NULL,
    `image` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Workout` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Exercise` (
    `id` VARCHAR(191) NOT NULL,
    `apiId` VARCHAR(191) NOT NULL,
    `isCompleted` BOOLEAN NOT NULL DEFAULT false,
    `set` INTEGER NOT NULL DEFAULT 0,
    `rep` INTEGER NOT NULL DEFAULT 0,
    `weight` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `breakTimeBetweenSet` INTEGER NOT NULL DEFAULT 0,
    `workoutId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExerciseHistory` (
    `completedDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `duration` INTEGER NOT NULL DEFAULT 0,
    `set` INTEGER NOT NULL DEFAULT 0,
    `rep` INTEGER NOT NULL DEFAULT 0,
    `weight` DECIMAL(65, 30) NOT NULL DEFAULT 0,
    `breakTimeBetweenSet` INTEGER NOT NULL DEFAULT 0,
    `exerciseId` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`completedDate`, `exerciseId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Workout` ADD CONSTRAINT `Workout_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Exercise` ADD CONSTRAINT `Exercise_workoutId_fkey` FOREIGN KEY (`workoutId`) REFERENCES `Workout`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExerciseHistory` ADD CONSTRAINT `ExerciseHistory_exerciseId_fkey` FOREIGN KEY (`exerciseId`) REFERENCES `Exercise`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
