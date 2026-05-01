-- CreateTable
CREATE TABLE "SocialMediaProvider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialMediaProvider_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SocialMediaAccount" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "providerId" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SocialMediaAccount_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SocialMediaAccount" ADD CONSTRAINT "SocialMediaAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SocialMediaAccount" ADD CONSTRAINT "SocialMediaAccount_providerId_fkey" FOREIGN KEY ("providerId") REFERENCES "SocialMediaProvider"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
