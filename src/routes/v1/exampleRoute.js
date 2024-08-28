import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { exampleValidation } from '~/validations/exampleValidation'
import { exampleController } from '~/controllers/exampleController'


const Router = express.Router()

Router.route('/')
    .get((req, res) => {
        res.status(StatusCodes.OK).json({ message: 'API V1 get' })
    })
    .post(exampleValidation.createNew, exampleController.createNew)

Router.route('/:id')
    .get(exampleController.getDetails)
    // .pull() //update

export const exampleRoutes = Router