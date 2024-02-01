ALTER TABLE `booking` RENAME COLUMN `bookingTime` TO `bookingStartTime`;--> statement-breakpoint
ALTER TABLE booking ADD `bookingEndTime` text NOT NULL;