import Joi from 'joi'
import { EMAIL_RULE, EMAIL_RULE_MESSAGE} from '~/utils/validators'
import { GET_DB } from '~/config/mongodb'
import { ObjectId } from 'mongodb'

const USER_ROLES = {
    CLIENT: 'client',
    ADMIN: 'admin'
}

const USER_COLLECTION_NAME = 'users'
const USER_COLLECTION_SCHEMA = Joi.object({
    email: Joi.string().required().pattern(EMAIL_RULE).message(EMAIL_RULE_MESSAGE),
    password: Joi.string().required(),
    // duoc cat ra tu email
    username: Joi.string().required().trim().strict(),
    displayName: Joi.string().required().trim().strict(),
    avatar: Joi.string().default(null),
    role: Joi.string().valid(USER_ROLES.ADMIN, USER_ROLES.CLIENT).default(USER_ROLES.CLIENT),
    isActive: Joi.boolean().default(false),
    verifyToken: Joi.string(),
    createdAt: Joi.date().timestamp('javascript').default(Date.now),
    updatedAt: Joi.date().timestamp('javascript').default(null),
    _destroy: Joi.boolean().default(false)
})

const INVALID_UPDATE_FIELDS = ['_id', 'boardId', 'createdAt']

const validateBeforeCreate = async (data) => {
    return await USER_COLLECTION_SCHEMA.validateAsync(data, {abortEarly: false})
}

const createNew = async (data) => {
    try {
        const validData = await validateBeforeCreate(data)
        const createdUser = await GET_DB().collection(USER_COLLECTION_NAME).insertOne(validData)
        return createdUser
    } catch (error) {
        throw new Error(error)
    }
}

const findOneById = async (userId) => {
    try {
        const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
            _id: new ObjectId(userId)
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const findOneByEmail = async (emailValue) => {
    try {
        const result = await GET_DB().collection(USER_COLLECTION_NAME).findOne({
            email: emailValue
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const update = async (userId, updateData) => {
    try {
        Object.keys(updateData).forEach(fieldName => {
            if(INVALID_UPDATE_FIELDS.includes(fieldName)){
                delete updateData[fieldName]
            }
        })

        // Doi voi nhung du lieu lien quan den ObjectId MongoDb thi phai dua ve lai nhu cu
        if(updateData.userId) updateData.userId = new ObjectId(updateData.userId)


        const result = await GET_DB().collection(USER_COLLECTION_NAME).findOneAndUpdate(
            { _id: new ObjectId(userId)},
            {$set: updateData},
            {returnDocument: 'after'}
        )
        return result
    } catch (error) {
        throw new Error(error)
    }
}

const deleteManyByColumnId = async (columnId) => {
    try {
        const result = await GET_DB().collection(USER_COLLECTION_NAME).deleteMany({
            columnId: new ObjectId(columnId)
        })
        return result
    } catch (error) {
        throw new Error(error)
    }
}

export const userModel = {
  USER_COLLECTION_NAME,
  USER_COLLECTION_SCHEMA,
  createNew,
  findOneById,
  findOneByEmail,
  update,
  deleteManyByColumnId
}