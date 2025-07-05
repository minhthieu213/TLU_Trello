import { Container } from "@mui/material"
import AppBar from "~/components/AppBar/AppBar"
import BoardBar from "./BoardBar/BoardBar"
import BoardContent from "./BoardContent/BoardContent"
// import { mockData } from "~/apis/mockdata"
import { useEffect } from "react"
import {
  updateBoardDetailsAPI,
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI
} from "~/apis"
import { cloneDeep } from "lodash"
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import {
  fetchBoardDetailsAPI,
  updateCurrentActiveBoard,
  selectCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice"

import { useDispatch, useSelector } from 'react-redux'
import { useParams } from "react-router-dom"

function Board() {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const { boardId } = useParams()

  useEffect(() => {
    // const boardId = '68676bf998e8dcf8cb7e9d31'

    dispatch(fetchBoardDetailsAPI(boardId))
  }, [dispatch, boardId])


  //Call api va xu ly keo tha Column khi dragEnd
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = { ...board }
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    dispatch(updateCurrentActiveBoard(newBoard))

    //Call API
    updateBoardDetailsAPI(newBoard._id, { columnOrderIds: newBoard.columnOrderIds })
  }

  //Khi keo tha card trong cung 1 column
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = cloneDeep(board)
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if (columnToUpdate) {
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    dispatch(updateCurrentActiveBoard(newBoard))

    // Filter out placeholder card IDs before sending to API
    const filteredCardOrderIds = dndOrderedCardIds.filter(id => !id.includes('placeholder-card'))

    // Call API
    updateColumnDetailsAPI(columnId, { cardOrderIds: filteredCardOrderIds })
  }

  //Khi keo card giua 2 column khac nhau
  //B1: Cap nhat column ban dau (xoa _id card ban dau ra khoi mang)
  //B2: Cap nhat cardOrderIds cua column dich duoc keo den
  //B3: Cap nhat lai columnId cho card da keo
  const MoveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const newBoard = { ...board }
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds

    dispatch(updateCurrentActiveBoard(newBoard))

    // Filter out placeholder card IDs before sending to API
    const prevColumn = dndOrderedColumns.find(c => c._id === prevColumnId)
    const nextColumn = dndOrderedColumns.find(c => c._id === nextColumnId)

    const prevCardOrderIds = prevColumn?.cardOrderIds?.filter(id => !id.includes('placeholder-card')) || []
    const nextCardOrderIds = nextColumn?.cardOrderIds?.filter(id => !id.includes('placeholder-card')) || []

    // Call api xu ly phia backend
    moveCardToDifferentColumnAPI({
      currentCardId,
      prevColumnId,
      prevCardOrderIds,
      nextColumnId,
      nextCardOrderIds
    })
  }


  if (!board) {
    return (
      <Box sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
        width: '100vw', height: '100vh'
      }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={board} />
        <BoardContent
          moveColumns={moveColumns}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          MoveCardToDifferentColumn={MoveCardToDifferentColumn}
          board={board} />
      </Container>
    </>
  )
}

export default Board
