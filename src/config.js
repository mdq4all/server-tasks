import { config } from 'dotenv'
config()

export default {
    mongoDBuri: process.env.MONGO_URI
}