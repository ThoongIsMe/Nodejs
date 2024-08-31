/* eslint-disable indent */
import Joi from 'joi'
import { ObjectId, ReturnDocument } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from './validators'
import { columnModel } from '~/models/columnModel'
import { cardModel } from '~/models/cardModel'

// Define Collection (name & schema)
const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid('public', 'private').required(),
    columnOrderIds: Joi.array().items(
        Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)
    ).default([]),

    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const validateBeforeCreate = async(data) => {
    return await BOARD_COLLECTION_SCHEMA.validateAsync(data, { abortEarly: false })

}

const createNew = async(data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
        return result
    } catch (error) {
        throw new Error(`Error in createNew: ${error.message}`)
    }
}

const findOneByID = async(id) => {
    try {
        // console.log(id)
        // console.log(new ObjectId(id))

        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
            _id: new ObjectId(id)
        })
        return result
    } catch (error) {
        throw new Error(`Error in findOneByID: ${error.message}`)
    }
}

//query tong hop (aggregate) lay toan bo col va card o board (join table)
const getDetails = async(id) => {
        try {
            // const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
            //     _id: new ObjectId(id)
            // })

            const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([{
                    $match: {
                        _id: new ObjectId(id),
                        _destroy: false
                    }
                },
                {
                    $lookup: {
                        from: columnModel.COLUMN_COLLECTION_NAME,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'columns'
                    }
                },
                {
                    $lookup: {
                        from: cardModel.CARD_COLLECTION_NAME,
                        localField: '_id',
                        foreignField: 'boardId',
                        as: 'cards'
                    }
                }
            ]).toArray()
            return result[0] || null
        } catch (error) {
            throw new Error(`Error in findOneByID: ${error.message}`)
        }
    }
    // nhiem vu no la push column id vao mang cuoi mang columnOrderIds
const pushColumnOrderIds = async(column) => {
    try {
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME)
            .findOneAndUpdate({ _id: new ObjectId(column.boardId) }, { $push: { columnOrderIds: new ObjectId(column._id) } }, { returnDocument: 'after' });

        return result.value || null
    } catch (error) {
        throw new Error(`Error in pushColumnOrderIds: ${error.message}`)
    }
}

export const boardModel = {
    BOARD_COLLECTION_NAME,
    BOARD_COLLECTION_SCHEMA,
    createNew,
    findOneByID,
    getDetails,
    pushColumnOrderIds
}