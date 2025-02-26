import * as dotenv from 'dotenv'
dotenv.config()

export const config = (key) => {
  return process.env[key]
}
