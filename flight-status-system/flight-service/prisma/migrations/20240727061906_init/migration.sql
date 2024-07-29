-- CreateTable
CREATE TABLE "Flight" (
    "id" SERIAL NOT NULL,
    "flightNumber" TEXT NOT NULL,
    "airline" TEXT NOT NULL,
    "departureAirport" TEXT NOT NULL,
    "arrivalAirport" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "departureTime" TIMESTAMP(3) NOT NULL,
    "arrivalTime" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL,
    "gate" TEXT,
    "terminal" TEXT,
    "scheduledDepartureTime" TIMESTAMP(3) NOT NULL,
    "scheduledArrivalTime" TIMESTAMP(3) NOT NULL,
    "elapsedTime" INTEGER,
    "aircraftType" TEXT,
    "baggageClaim" TEXT,
    "remarks" TEXT,
    "lastUpdated" TIMESTAMP(3) NOT NULL,
    "isInternational" BOOLEAN NOT NULL DEFAULT false,
    "boardingTime" TIMESTAMP(3),

    CONSTRAINT "Flight_pkey" PRIMARY KEY ("id")
);
