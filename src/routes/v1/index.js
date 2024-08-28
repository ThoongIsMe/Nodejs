import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { exampleRoutes } from './exampleRoute'

const Route = express.Router()

Route.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({ message: 'API V1' })
})


Route.use('/example', exampleRoutes)
export const APIs_v1 = Route