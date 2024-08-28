import { StatusCodes } from 'http-status-codes'
import { boardService } from '~/services/exampleService'

const createNew = async(req, res, next) => {
    try {
        //dieu duong du lieu tang service
        const createdBoard = await boardService.creacteNew(req.body)
        res.status(StatusCodes.CREATED).json(createdBoard)
    } catch (error) { next(error) }
}


const getDetails = async(req, res, next) => {
    try {
        const boardId = req.params.id
        const board = await boardService.getDetails(boardId)
        res.status(StatusCodes.OK).json(board)
    } catch (error) { next(error) }
}

export const exampleController = {
    createNew,
    getDetails
}