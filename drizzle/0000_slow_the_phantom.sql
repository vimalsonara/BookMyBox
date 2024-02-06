CREATE TABLE `booking` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`boxId` text NOT NULL,
	`customerId` text NOT NULL,
	`price` integer NOT NULL,
	`bookingDate` text NOT NULL,
	`bookingStartTime` text NOT NULL,
	`bookingEndTime` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`boxId`) REFERENCES `box`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`customerId`) REFERENCES `customer`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `box` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`boxName` text(20) NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `customer` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`customerName` text NOT NULL,
	`customerNumber` text(10) NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
