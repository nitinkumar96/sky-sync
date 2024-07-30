-- AlterTable
ALTER TABLE "Passenger" ADD COLUMN     "emailNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "pushNotification" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "reminders" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "smsNotification" BOOLEAN NOT NULL DEFAULT true;
