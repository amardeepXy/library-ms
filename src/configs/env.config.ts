import "dotenv/config";

export const envConfig = {
  PORT: String(process.env.PORT),
  staffAccessTokenSecret: String(process.env.STAFF_ACCESS_TOKEN_SECRET),
  memberAccessTokenSecret: String(process.env.MEMBER_ACCESS_TOKEN_SECRET)
}
