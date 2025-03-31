import { serial, varchar , text} from "drizzle-orm/pg-core";
import { pgTable } from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mock_interview", {
    id:serial("id").primaryKey().notNull(),
    jsonMockResp : text('jsonMockResp').notNull(),
    jobPosition : varchar('jobPosition', { length: 255 }).notNull(),
    jobDesc : varchar('jobDesc', { length: 255 }).notNull(),
    jobExperience : varchar('jobExperience', { length: 255 }).notNull(),
    createdBy : varchar('createdBy', { length: 255 }).notNull(),
    createdAt:varchar('createdAt').notNull(),
    mockId :varchar('mockId').notNull()

})