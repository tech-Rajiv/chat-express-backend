-- CreateEnum
CREATE TYPE "MemberRole" AS ENUM ('ADMIN', 'MEMBER');

-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "groupAvatar" TEXT,
ADD COLUMN     "groupBio" TEXT,
ADD COLUMN     "groupName" TEXT,
ADD COLUMN     "isGroup" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "RoomMember" ADD COLUMN     "role" "MemberRole" NOT NULL DEFAULT 'MEMBER';

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
