/*
  Warnings:

  - Added the required column `handle` to the `CreatorMatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `platform` to the `CreatorMatch` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CreatorMatch" ADD COLUMN     "handle" TEXT NOT NULL,
ADD COLUMN     "platform" TEXT NOT NULL;
