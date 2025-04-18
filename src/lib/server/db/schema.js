import { pgTable,varchar,serial, text,boolean, integer, timestamp } from 'drizzle-orm/pg-core';
export const brands = pgTable('brands', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),
  description: varchar('description', { length: 200 }),
  fromName: varchar('from_name', { length: 30 }).notNull(),
  fromEmail: varchar('from_email', { length: 200 }).notNull(),
  toEmail: varchar('to_email', { length: 200 }).notNull(),
  smtpProvider: text('smtp_provider').notNull(),
  smtpRegion: text('smtp_region'),
  smtpAccessKey: varchar('smtp_access_key', { length: 100 }),
  smtpSecretKey: varchar('smtp_secret_key', { length: 100 }),
  smtpHost: varchar('smtp_host', { length: 50 }),
  smtpUsername: varchar('smtp_username', { length: 50 }),
  smtpPassword: varchar('smtp_password', { length: 50 }),
  smtpType: text('smtp_type'),
  smtpPort: integer('smtp_port'),
  smtpLimitHourly: integer('smtp_limit_hourly'),
  smtpLimitDaily: integer('smtp_limit_daily'),
  smtpLimitMonthly: integer('smtp_limit_monthly'),
  maxBounce: integer('max_bounce'),
  trackOpening: text('track_opening'),
  trackClicks: text('track_clicks'),
  gdpr: text('gdpr').default('no'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const campaigns = pgTable('campaigns', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull(),         
  fromName: varchar('from_name', { length: 100 }),           
  fromEmail: varchar('from_email', { length: 200 }),         
  replyToEmail: varchar('reply_to_email', { length: 200 }),  
  mailContent: text('mail_content'),                    
  brandId: integer('brand_id').notNull(),                  
  
  totalRecipients: integer('total_recipients').default(0),   
  totalSent: integer('total_sent').default(0),
  totalOpened: integer('total_opened').default(0),
  totalClicked: integer('total_clicked').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
  isArchived: boolean('is_archived').default(false)
});