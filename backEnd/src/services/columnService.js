import { columnModel } from "~/models/columnModel"
import { boardModel } from "~/models/boardModel"
import { cardModel } from "~/models/cardModel"

const createNew = async (reqBody) => {
    try {
        const newColumn = {
            ...reqBody
        }
        const createdColumn = await columnModel.createNew(newColumn)
        const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

        if(getNewColumn){
            getNewColumn.cards = []
            
            //Cap nhat mang orderIds
            await boardModel.pushColumnOrderIds(getNewColumn)
        }

        return getNewColumn
    } catch (error) {
        throw error
    }
}

const update = async (columnId, reqBody) => {
    try {
        const updateData = {
            ...reqBody,
            updatedAt: Date.now()
        }
        const updatedColumn = await columnModel.update(columnId, updateData)
        return updatedColumn
    } catch (error) {
        throw error
    }
}

const deleteColumn = async (columnId) => {
    try {
        const targetColumn = await columnModel.findOneById(columnId)
        if(!targetColumn){
            throw new ApiError(StatusCodes.NOT_FOUND, 'Column not found')
        }
        // Xoa column
        await columnModel.deleteOneById(columnId)
        // Xoa toan bo card thuoc column 
        await cardModel.deleteManyByColumnId(columnId)
        await boardModel.pullColumnOrderIds(targetColumn)

        return {deleteResult: 'Column and its cards delete successfully!'}
    } catch (error) {
        throw error
    }
}


export const columnService = {
    createNew,
    update,
    deleteColumn
}