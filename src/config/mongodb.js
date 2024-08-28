import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

let viteInstance = null
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
})

export const CONNECT_DB = async() => {
    await mongoClientInstance.connect()
    viteInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

export const GET_DB = () => {
    if (!viteInstance) throw new Error('Must connect to DB first')
    return viteInstance
}


export const CLOSE_DB = async() => {
    await mongoClientInstance.close()
}