-- CreateTable
CREATE TABLE "Booking" (
    "id" SERIAL NOT NULL,
    "passengerId" INTEGER NOT NULL,
    "flightId" INTEGER NOT NULL,
    "pnr" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Booking_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Booking_pnr_key" ON "Booking"("pnr");
