import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'

const createNew = async(req, res, next) => {

    // Validate data model
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict(),
        description: Joi.string().required().min(3).max(256).trim().strict()
    })

    try {
        await correctCondition.validateAsync(req.body, { abortEarly: false })
            //validate dulieu xong hop le thi requet di san
        next() // Call next() if validation is successful

    } catch (error) {
        next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
    }
}

export const exampleValidation = {
    createNew
}