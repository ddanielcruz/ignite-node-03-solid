/*
  Warnings:

  - You are about to drop the column `password_salt` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "password_salt";
