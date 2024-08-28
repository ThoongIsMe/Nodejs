/* eslint-disable indent */
/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel'
import { slugify } from '~/utils/formatter'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
//trong service phai cos return
const creacteNew = async(reqbody) => {
    try {
        const newBoard = {
                ...reqbody,
                slug: slugify(reqbody.title)
            }
            //goi toi model xu ly luu banghi newboard trong data
        const createBoard = await boardModel.createNew(newBoard)

        // lay ban ghi sau khi goi 
        const getNewBoard = await boardModel.findOneByID(createBoard.insertedId.toString())

        return getNewBoard
    } catch (error) {
        throw error
    }
}

const getDetails = async(boardId) => {
    try {
        const board = await boardModel.getDetails(boardId)
        if (!board) { throw new ApiError(StatusCodes.NOT_FOUND, 'not found') }
        return board

    } catch (error) {
        throw error
    }

}

export const boardService = { creacteNew, getDetails }