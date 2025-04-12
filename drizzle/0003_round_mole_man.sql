CREATE TABLE "campaigns" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(50) NOT NULL,
	"from_name" varchar(100),
	"from_email" varchar(200),
	"reply_to_email" varchar(200),
	"mail_content" text,
	"brand_id" integer NOT NULL,
	"total_recipients" integer DEFAULT 0,
	"total_sent" integer DEFAULT 0,
	"total_opened" integer DEFAULT 0,
	"total_clicked" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
