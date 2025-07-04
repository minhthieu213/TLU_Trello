import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/apiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
    const correctCondition = Joi.object({
        title: Joi.string().required().min(3).max(50).trim().strict().messages({
            'any.required': 'Title is required',
            'string.empty': 'Title is not allowed to be empty',
            'string.min': 'Title min 3 chars',
            'string.max': 'Title max 50 chars',
            'string.min': 'Title must not have leading or trailing whitespace'
        }),
        description: Joi.string().required().min(3).max(256).trim().strict(),
        type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
    })
    try {
        console.log(req.body)
        // aborEarly trường hợp nhiều lỗi thì trả về tất cả lỗi
        await correctCondition.validateAsync(req.body, {abortEarly: false})
        next()
    } catch (error) {
        const errorMessage = new Error(error).message
        const customError = new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, errorMessage)
        next(customError)
    }
}
export const boardValidation = {
    createNew
}