import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from './validators'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

// Define Collection (name & schema)
const COLUMN_COLLECTION_NAME = 'columns'
const COLUMN_COLLECTION_SCHEMA = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    title: Joi.string().required().min(3).max(50).trim().strict(),

    cardOrderIds: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})


const validateBeforeCreate = async(data) => {
    return await COLUMN_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })

}

const createNew = async(data) => {
    try {
        const validData = await validateBeforeCreate(data)
        if (validData.boardId && typeof validData.boardId === 'string') {
            validData.boardId = new ObjectId(validData.boardId)
        }
        const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).insertOne(validData)
        return result
    } catch (error) {
        throw new Error(`Error in createNew: ${error.message}`)
    }
}

const findOneByID = async(id) => {
    try {
        const result = await GET_DB().collection(COLUMN_COLLECTION_NAME).findOne({
            _id: new ObjectId(id)
        })
        return result
    } catch (error) {
        throw new Error(`Error in findOneByID: ${error.message}`)
    }
}

const pushCardOrderIds = async(card) => {
    try {
        const result = await GET_DB().collection(COLUMN_COLLECTION_NAME)
            .findOneAndUpdate({ _id: new ObjectId(card.columnId) }, { $push: { cardOrderIds: new ObjectId(card._id) } }, { returnDocument: 'after' });

        return result.value
    } catch (error) {
        throw new Error(`Error in pushColumnOrderIds: ${error.message}`)
    }
}


export const columnModel = {
    COLUMN_COLLECTION_NAME,
    COLUMN_COLLECTION_SCHEMA,
    createNew,
    findOneByID,
    pushCardOrderIds
}