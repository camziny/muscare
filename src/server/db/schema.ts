import { sql } from "drizzle-orm";
import {
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
  integer,
  doublePrecision,
  text,
} from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => `${name}`);

// Define the User model
export const users = createTable(
  "users",
  {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 255 }).notNull(),
    email: varchar("email", { length: 255 }).unique().notNull(),
    password: varchar("password", { length: 255 }).notNull(),
    role: varchar("role", { length: 50 })
      .$type<"care_seeker" | "job_seeker" | "both">()
      .notNull(),
    phoneNumber: varchar("phone_number", { length: 15 }),
    address: varchar("address", { length: 255 }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (users) => ({
    emailIndex: index("email_idx").on(users.email),
  }),
);

// Define the JobSeekerProfile model
export const jobSeekerProfiles = createTable(
  "job_seeker_profiles",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
      .references(() => users.id)
      .notNull(),
    bio: text("bio"),
    experience: text("experience"),
    certifications: text("certifications"),
    availability: text("availability"),
    ratePerHour: doublePrecision("rate_per_hour"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (jobSeekerProfiles) => ({
    userIdIndex: index("user_id_idx").on(jobSeekerProfiles.userId),
  }),
);

// Define the JobListing model for Care Seekers to post jobs
export const jobListings = createTable(
  "job_listings",
  {
    id: serial("id").primaryKey(),
    careSeekerId: integer("care_seeker_id")
      .references(() => users.id)
      .notNull(),
    title: varchar("title", { length: 255 }).notNull(),
    description: text("description").notNull(),
    location: varchar("location", { length: 255 }).notNull(),
    startDate: timestamp("start_date", { withTimezone: true }).notNull(),
    endDate: timestamp("end_date", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
  },
  (jobListings) => ({
    careSeekerIdIndex: index("care_seeker_id_idx").on(jobListings.careSeekerId),
  }),
);
