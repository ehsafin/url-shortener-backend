-- CreateTable
CREATE TABLE "Url" (
    "shortCode" TEXT NOT NULL,
    "originalUrl" TEXT NOT NULL,
    "expirationTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Url_pkey" PRIMARY KEY ("shortCode")
);
