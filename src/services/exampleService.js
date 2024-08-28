/* eslint-disable indent */
/* eslint-disable no-useless-catch */
import { boardModel } from '~/models/boardModel'
import { slugify } from '~/utils/formatter'

//trong service phai cos return
const creactNew = async(reqbody) => {
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

export const boardService = { creactNew }