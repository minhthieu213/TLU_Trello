import authorizedAxiosInstance from "~/utils/authorizeAxios"
import { API_ROOT } from "~/utils/constant"

// Boards
// export const fetchBoardDetailsAPI = async (boardId) => {
//     const response = await axios.get(`${API_ROOT}/v1/boards/${boardId}`)
//     return response.data
// }

//Update board
export const updateBoardDetailsAPI = async (boardId, updateData) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/${boardId}`, updateData)
    return response.data
}

// Column
export const createNewColumnAPI = async (newColumnData) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/columns`, newColumnData)
    return response.data
}

export const updateColumnDetailsAPI = async (columnId, updateData) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/columns/${columnId}`, updateData)
    return response.data
}

export const deleteColumnAPI = async (columnId) => {
    const response = await authorizedAxiosInstance.delete(`${API_ROOT}/v1/columns/${columnId}`)
    return response.data
}


// Card
export const createNewCardAPI = async (newCardData) => {
    const response = await authorizedAxiosInstance.post(`${API_ROOT}/v1/cards`, newCardData)
    return response.data
}

export const moveCardToDifferentColumnAPI = async (updateData) => {
    const response = await authorizedAxiosInstance.put(`${API_ROOT}/v1/boards/supports/moving_card`, updateData)
    return response.data
}