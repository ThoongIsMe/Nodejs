/* eslint-disable indent */
/* eslint-disable no-useless-catch */
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
const creacteNew = async(reqbody) => {
    try {
        const newCard = {
            ...reqbody
        }
        const createCard = await cardModel.createNew(newCard)
        const getNewCard = await cardModel.findOneByID(createCard.insertedId.toString())
        if (getNewCard) {
            await columnModel.pushCardOrderIds(getNewCard)
        }
        return getNewCard
    } catch (error) {
        throw error
    }
}


export const cardService = { creacteNew }