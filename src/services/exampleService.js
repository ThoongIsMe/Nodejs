/* eslint-disable indent */
/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel'
import { slugify } from '~/utils/formatter'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import _ from 'lodash'


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

        // tao 1 cai moi k nhu ban dau
        const resBoard = _.cloneDeep(board)
            //dua card ve dng col cua no
        resBoard.columns.forEach(column => {
            column.cards = resBoard.cards.filter(card => card.columnId.toString() === column._id.toString())
        })

        delete resBoard.cards

        return resBoard

    } catch (error) {
        throw error
    }

}

export const boardService = { creacteNew, getDetails }