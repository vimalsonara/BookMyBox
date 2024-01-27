CREATE TABLE `booking` (
	`id` text NOT NULL,
	`boxId` text NOT NULL,
	`customerName` text NOT NULL,
	`userId` text NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`boxId`) REFERENCES `box`(`id`) ON UPDATE no action ON DELETE no action
);
