/*
  Warnings:

  - You are about to drop the column `arrivalAirport` on the `Flight` table. All the data in the column will be lost.
  - You are about to drop the column `departureAirport` on the `Flight` table. All the data in the column will be lost.
  - Added the required column `arrivalAirportCode` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `arrivalAirportName` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureAirportCode` to the `Flight` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departureAirportName` to the `Flight` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Flight" DROP COLUMN "arrivalAirport",
DROP COLUMN "departureAirport",
ADD COLUMN     "arrivalAirportCode" TEXT NOT NULL,
ADD COLUMN     "arrivalAirportName" TEXT NOT NULL,
ADD COLUMN     "departureAirportCode" TEXT NOT NULL,
ADD COLUMN     "departureAirportName" TEXT NOT NULL;
