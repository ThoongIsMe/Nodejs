import Joi from 'joi'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from './validators'
import { ObjectId } from 'mongodb'
import { GET_DB } from '~/config/mongodb'

// Define Collection (name & schema)
const CARD_COLLECTION_NAME = 'cards'
const CARD_COLLECTION_SCHEMA = Joi.object({
    boardId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),
    columnId: Joi.string().required().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE),

    title: Joi.string().required().min(3).max(50).trim().strict(),
    description: Joi.string().optional(),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async(data) => {
    return await CARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })

}

const createNew = async(data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const idFields = ['boardId', 'columnId']
        idFields.forEach(idField => {
            if (validData[idField] && typeof validData[idField] === 'string') {
                validData[idField] = new ObjectId(validData[idField])
            }
        });

        const result = await GET_DB().collection(CARD_COLLECTION_NAME).insertOne(validData)
        return result
    } catch (error) {
        throw new Error(`Error in createNew: ${error.message}`)
    }
}

const findOneByID = async(id) => {
    try {
        const result = await GET_DB().collection(CARD_COLLECTION_NAME).findOne({
            _id: new ObjectId(id)
        })
        return result
    } catch (error) {
        throw new Error(`Error in findOneByID: ${error.message}`)
    }
}

export const cardModel = {
    CARD_COLLECTION_NAME,
    CARD_COLLECTION_SCHEMA,
    createNew,
    findOneByID
}