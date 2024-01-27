CREATE TABLE `box` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`varchar` text(5),
	`userId` text,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP
);
