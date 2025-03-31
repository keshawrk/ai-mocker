/** @type {import('drizzle-kit').Config} */

export default({
  dialect: "postgresql",
  schema: "./src/utils/schema.js",
  dbCredentials: {
      url : 'postgresql://neondb_owner:npg_Ys6VFx4lcIME@ep-spring-wildflower-a55xs79t-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require',
  }
});
