CREATE TABLE `customer` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`customerName` text NOT NULL,
	`customerNumber` text(10) NOT NULL,
	`createdAt` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
ALTER TABLE `booking` RENAME COLUMN `customerName` TO `customerId`;--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/