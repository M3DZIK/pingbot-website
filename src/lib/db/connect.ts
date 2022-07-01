import { connect } from 'mongoose'

const { MONGODB_URI } = process.env

export default async function dbConnect() {
  return await connect(MONGODB_URI as string)
}
