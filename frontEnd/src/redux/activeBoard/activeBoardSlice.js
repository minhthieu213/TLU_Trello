import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import authorizedAxiosInstance from '~/utils/authorizeAxios'
import { API_ROOT } from "~/utils/constant"
import mapOrder from '~/utils/sorts'
import { isEmpty } from 'lodash'
import { generatePlaceholderCard } from "~/utils/formatter"

const initialState = {
  currentActiveBoard: null
}

export const fetchBoardDetailsAPI = createAsyncThunk(
    'activeBoard/fetchBoardDetailsAPI',
    async (boardId) => {
        const response = await authorizedAxiosInstance.get(`${API_ROOT}/v1/boards/${boardId}`)
        return response.data
    }
)

export const activeBoardSlice = createSlice({
  name: 'activeBoard',
  initialState,
  // Noi xu ly du lieu dong bo
  reducers: {
    updateCurrentActiveBoard: (state, action) => {
      const Board = action.payload

      state.currentActiveBoard = Board
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchBoardDetailsAPI.fulfilled, (state, action) => {
        let board = action.payload

        board.columns = mapOrder(board.columns, board.columnOrderIds, '_id')
        // Xu ly keo tha card vao mot column rong
        board.columns.forEach(column => {
            if(isEmpty(column.cards)){
                column.cards = [generatePlaceholderCard(column)]
                column.cardOrderIds= [generatePlaceholderCard(column)._id]
            }else{
                column.cards = mapOrder(column.cards, column .cardOrderIds, '_id')
            }
        })

        state.currentActiveBoard = board
    })
  }
})


export const { updateCurrentActiveBoard } = activeBoardSlice.actions


export const selectCurrentActiveBoard = (state) => {
    return state.activeBoard.currentActiveBoard
}

// export default activeBoardSlice.reducer
export const activeBoardReducer = activeBoardSlice.reducer