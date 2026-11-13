/*
  Warnings:

  - You are about to drop the `Ping` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Ping`;

-- CreateTable
CREATE TABLE `shows` (
    `id` INTEGER NOT NULL,
    `name` VARCHAR(255) NOT NULL,
    `start_date` DATETIME(3) NULL,
    `end_date` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `countries` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,

    UNIQUE INDEX `countries_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `halls` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `hall_no` VARCHAR(20) NOT NULL,

    UNIQUE INDEX `halls_hall_no_key`(`hall_no`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `exhibitors` (
    `id` INTEGER NOT NULL,
    `company_name` VARCHAR(255) NOT NULL,
    `logo_url` VARCHAR(512) NULL,
    `user_id` VARCHAR(64) NULL,
    `booth_no` VARCHAR(30) NULL,
    `exhibitor_type` VARCHAR(100) NULL,
    `sponsorship` VARCHAR(100) NULL,
    `show_id` INTEGER NULL,
    `country_id` INTEGER NULL,
    `hall_id` INTEGER NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `exhibitors` ADD CONSTRAINT `exhibitors_show_id_fkey` FOREIGN KEY (`show_id`) REFERENCES `shows`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exhibitors` ADD CONSTRAINT `exhibitors_country_id_fkey` FOREIGN KEY (`country_id`) REFERENCES `countries`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exhibitors` ADD CONSTRAINT `exhibitors_hall_id_fkey` FOREIGN KEY (`hall_id`) REFERENCES `halls`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
