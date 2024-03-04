/*
  Warnings:

  - The primary key for the `userMovies` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `usersId` on the `userMovies` table. All the data in the column will be lost.
  - Added the required column `id` to the `userMovies` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `userMovies` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `userMovies` DROP FOREIGN KEY `userMovies_usersId_fkey`;

-- AlterTable
ALTER TABLE `userMovies` DROP PRIMARY KEY,
    DROP COLUMN `usersId`,
    ADD COLUMN `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD COLUMN `userId` VARCHAR(191) NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AddForeignKey
ALTER TABLE `userMovies` ADD CONSTRAINT `userMovies_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
