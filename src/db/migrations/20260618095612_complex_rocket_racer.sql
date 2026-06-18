CREATE TYPE "public"."status" AS ENUM('active', 'inactive', 'pending');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('admin', 'manager', 'bartender', 'waiter', 'customer');--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text,
	"phone" text,
	"role" "role" DEFAULT 'customer',
	"date_of_birth" date,
	"age_verified_at" date,
	"metadata" jsonb,
	"status" "status" DEFAULT 'pending',
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
