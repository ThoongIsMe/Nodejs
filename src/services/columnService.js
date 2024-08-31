/* eslint-disable indent */
/* eslint-disable no-useless-catch */
import { columnModel } from '~/models/columnModel'
import { boardModel } from '~/models/boardModel'

const creacteNew = async(reqbody) => {
    try {
        const newColumn = {
            ...reqbody
        }
        const createColumn = await columnModel.createNew(newColumn)
        const getNewColumn = await columnModel.findOneByID(createColumn.insertedId.toString())

        if (getNewColumn) {
            // Initialize the new column's cards array
            getNewColumn.cards = []

            // Update the board to include the new column's ID in the column order
            await boardModel.pushColumnOrderIds(getNewColumn)
        }


        return getNewColumn
    } catch (error) {
        throw error
    }
}


export const columnService = { creacteNew }