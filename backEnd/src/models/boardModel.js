import Joi from 'joi'
import { ObjectId, ReturnDocument } from 'mongodb'
import { GET_DB } from '~/config/mongodb'
import { OBJECT_ID_RULE, OBJECT_ID_RULE_MESSAGE } from '~/utils/validators'
import { BOARD_TYPES } from '~/utils/constants'
import { columnModel } from './columnModel'
import { cardModel } from './cardModel'

const BOARD_COLLECTION_NAME = 'boards'
const BOARD_COLLECTION_SCHEMA = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict(),
    slug: Joi.string().required().min(3).trim().strict(),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    columnOrderIds: Joi.array().items(Joi.string().pattern(OBJECT_ID_RULE).message(OBJECT_ID_RULE_MESSAGE)).default([]),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updateAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
})

const INVALID_UPDATE_FIELDS = ['_id', 'createdAt']

const validateBeforeCreate = async (data) => {
    return await BOARD_COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false})
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdBoard = await GET_DB().collection(BOARD_COLLECTION_NAME).insertOne(validData)
        return createdBoard
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (id) => {
    try {
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOne({
            _id: new ObjectId(id)
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const getDetails = async (id) => {
    try {
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).aggregate([
            { $match: {
                _id: new ObjectId(id),
                _destroy: false
            }},
            { $lookup: {
                from: columnModel.COLUMN_COLLECTION_NAME,
                localField: '_id',
                foreignField: 'boardId',
                as: 'columns'
            }},
            {$lookup: {
                from: cardModel.CARD_COLLECTION_NAME,
                localField: '_id',
                foreignField: 'boardId',
                as: 'cards'
            }}
        ]).toArray()
        return result[0] || null
    } catch (error) {
        throw new Error(error)
    }
}

// Them 1 phan tu vao cuoi mang
const pushColumnOrderIds = async (column) => {
    try {
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(column.boardId)},
            {$push: {
                columnOrderIds: new ObjectId(column._id)
            }},
            {ReturnDocument: 'after'}
        )

        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (boardId, updateData) => {
    try {
        Object.keys(updateData).forEach(fieldName => {
            if(INVALID_UPDATE_FIELDS.includes(fieldName)){
                delete updateData[fieldName]
            }
        })

        // Doi voi nhung du lieu lien quan den ObjectId MongoDb thi phai dua ve lai nhu cu
        if(updateData.columnOrderIds) {
            updateData.columnOrderIds = updateData.columnOrderIds.map(_id => (new ObjectId(_id)))
        }

        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(boardId)},
            {$set: updateData},
            {returnDocument: 'after'}
        )
        return result
    } catch (error) {
        throw new Error(error)
    }
}

// Lay columId ra khoi mang roi xoa khi column bi xoa ra khoi columnOrderIds
const pullColumnOrderIds = async (column) => {
    try {
        const result = await GET_DB().collection(BOARD_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(column.boardId)},
            {$pull: {
                columnOrderIds: new ObjectId(column._id)
            }},
            {ReturnDocument: 'after'}
        )

        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const boardModel = {
    BOARD_COLLECTION_NAME,
    BOARD_COLLECTION_SCHEMA,
    createNew,
    findOneById,
    getDetails,
    pushColumnOrderIds,
    pullColumnOrderIds,
    update
}