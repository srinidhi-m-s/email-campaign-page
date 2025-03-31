ALTER TABLE "brands" ALTER COLUMN "smtp_access_key" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "brands" ALTER COLUMN "smtp_secret_key" SET DATA TYPE varchar(100);--> statement-breakpoint
ALTER TABLE "brands" ALTER COLUMN "smtp_host" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "brands" ALTER COLUMN "smtp_username" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "brands" ALTER COLUMN "smtp_password" SET DATA TYPE varchar(50);--> statement-breakpoint
ALTER TABLE "brands" DROP COLUMN "smtp_ssl";