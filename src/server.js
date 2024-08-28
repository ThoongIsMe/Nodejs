/* eslint-disable no-console */
import express from 'express'
import AsyncExitHook from 'async-exit-hook'
import { CONNECT_DB, CLOSE_DB } from '~/config/mongodb'
import { env } from './config/environment'
import { APIs_v1 } from '~/routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import cors from 'cors'
import { corsOptions } from './config/cors'

const START_SERVER = () => {
    const app = express()

    app.use(cors(corsOptions))

    //enable req.body json dataa
    app.use(express.json())

    //use api v1
    app.use('/v1', APIs_v1)

    //middlewares xu ly tap trung
    app.use(errorHandlingMiddleware)


    app.listen(env.APP_PORT, env.APP_HOST, () => {
        console.log(`Hello Dev, I am running at http://${ env.APP_HOST }:${ env.APP_PORT }`)
    })

    AsyncExitHook(() => {
        CLOSE_DB()
    })
}

//IIFE
(async() => {
    try {
        await CONNECT_DB()
        console.log('Connected MongoDB Cloud Atlas')
        START_SERVER()
    } catch (err) {
        console.error(err)
        process.exit(0)
    }
})()