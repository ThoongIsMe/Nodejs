import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { exampleRoutes } from './exampleRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'


const Route = express.Router()

Route.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API V1' })
})


Route.use('/example', exampleRoutes)

Route.use('/columns', columnRoute)

Route.use('/cards', cardRoute)
export const APIs_v1 = Route