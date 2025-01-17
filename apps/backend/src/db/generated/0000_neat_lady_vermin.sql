CREATE TABLE "appointments" (
	"id" serial PRIMARY KEY NOT NULL,
	"date" date NOT NULL,
	"start" time NOT NULL,
	"end" time NOT NULL
);
--> statement-breakpoint
CREATE TABLE "schedule" (
	"id" serial PRIMARY KEY NOT NULL,
	"day" varchar(20) NOT NULL,
	"start" time NOT NULL,
	"end" time NOT NULL
);
