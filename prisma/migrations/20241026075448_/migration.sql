/*
  Warnings:

  - You are about to alter the column `title` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `summary` on the `Post` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(500)`.
  - You are about to drop the column `birthDate` on the `User` table. All the data in the column will be lost.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.

*/
-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "title" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "summary" SET DATA TYPE VARCHAR(500);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "birthDate",
ADD COLUMN     "bio" TEXT,
ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);
