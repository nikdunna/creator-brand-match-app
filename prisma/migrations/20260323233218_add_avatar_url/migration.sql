-- AlterTable: add avatarUrl with a temporary default, backfill existing rows, then enforce NOT NULL
ALTER TABLE "CreatorMatch" ADD COLUMN "avatarUrl" TEXT;

UPDATE "CreatorMatch"
SET "avatarUrl" = 'https://api.dicebear.com/9.x/notionists/svg?seed=' || LOWER(REPLACE("name", ' ', '-'));

ALTER TABLE "CreatorMatch" ALTER COLUMN "avatarUrl" SET NOT NULL;
