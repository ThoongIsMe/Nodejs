import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/exampleService'

const createNew = async(req, res, next) => {
    try {
        //dieu duong du lieu tang service
        const createdBoard = await boardService.creactNew(req.body)
        res.status(StatusCodes.CREATED).json(createdBoard)
    } catch (error) { next(error) }
}

export const exampleController = {
    createNew
}