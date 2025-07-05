import { Container } from "@mui/material"
import AppBar from "~/components/AppBar/AppBar"
import BoardBar from "./BoardBar/BoardBar"
import BoardContent from "./BoardContent/BoardContent"
// import { mockData } from "~/apis/mockdata"
import { useEffect, useState } from "react"
import { 
  fetchBoardDetailsAPI, 
  createNewColumnAPI, 
  createNewCardAPI, 
  updateBoardDetailsAPI, 
  updateColumnDetailsAPI,
  moveCardToDifferentColumnAPI,
  deleteColumnAPI } from "~/apis"
import { isEmpty } from "lodash"
import { generatePlaceholderCard } from "~/utils/formatter"
import mapOrder from '~/utils/sorts'
import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { toast } from 'react-toastify'

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '68676bf998e8dcf8cb7e9d31'
    fetchBoardDetailsAPI(boardId).then((board) => {
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
      
      setBoard(board)
    })
  }, [])

  //Call api tao moi column va lam lai du lieu state board
  const createNewColumn = async (newColumnData) => {
    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds= [generatePlaceholderCard(createdColumn)._id]

    // Cap nhat state board
    const newBoard = {
      ...board
    }
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    setBoard(newBoard)
  }

  const createNewCard = async (newCardData) => {
    const createdCard = await createNewCardAPI({
      ...newCardData,
      boardId: board._id
    })
    const newBoard = {...board}
    const columnToUpdate = newBoard.columns.find(column => column._id === createdCard.columnId)
    if(columnToUpdate){
      columnToUpdate.cards.push(createdCard)
      columnToUpdate.cardOrderIds.push(createdCard._id)
    }
    setBoard(newBoard)
  }

  //Call api va xu ly keo tha Column khi dragEnd
  const moveColumns = (dndOrderedColumns) => {
    const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
    const newBoard = {...board}
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnsIds

    setBoard(newBoard)

    //Call API
    updateBoardDetailsAPI(newBoard._id, {columnOrderIds: newBoard.columnOrderIds})
  }

  //Khi keo tha card trong cung 1 column
  const moveCardInTheSameColumn = (dndOrderedCards, dndOrderedCardIds, columnId) => {
    const newBoard = {...board}
    const columnToUpdate = newBoard.columns.find(column => column._id === columnId)
    if(columnToUpdate){
      columnToUpdate.cards = dndOrderedCards
      columnToUpdate.cardOrderIds = dndOrderedCardIds
    }
    setBoard(newBoard)

    // Filter out placeholder card IDs before sending to API
    const filteredCardOrderIds = dndOrderedCardIds.filter(id => !id.includes('placeholder-card'))

    // Call API
    updateColumnDetailsAPI(columnId, {cardOrderIds: filteredCardOrderIds})
  }

  //Khi keo card giua 2 column khac nhau
  //B1: Cap nhat column ban dau (xoa _id card ban dau ra khoi mang)
  //B2: Cap nhat cardOrderIds cua column dich duoc keo den
  //B3: Cap nhat lai columnId cho card da keo
  const MoveCardToDifferentColumn = (currentCardId, prevColumnId, nextColumnId, dndOrderedColumns) => {
    const newBoard = {...board}
    const dndOrderedColumnIds = dndOrderedColumns.map(column => column._id)
    newBoard.columns = dndOrderedColumns
    newBoard.columnOrderIds = dndOrderedColumnIds
    setBoard(newBoard)

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
      nextCardOrderIds,
    })
  }

  // Xoa column va card ben trong no
  const deleteColumn = (columnId) => {
    const newBoard = {...board}
    newBoard.columns = newBoard.columns.filter(c => c._id !== columnId)
    newBoard.columnOrderIds = newBoard.columnOrderIds.filter(_id => _id !== columnId)

    setBoard(newBoard)
    deleteColumnAPI(columnId).then(res => {
      toast.success(res?.deleteResult)
    })
  }

  if(!board){
    return (
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center',
        justifyContent: 'center', 
        gap: 2, 
        width: '100vw', height: '100vh' }}>
        <CircularProgress />
        <Typography>Loading...</Typography>
      </Box>
    )
  }

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={board}/>
        <BoardContent 
          createNewColumn={createNewColumn}
          moveColumns={moveColumns}
          createNewCard={createNewCard}
          moveCardInTheSameColumn={moveCardInTheSameColumn}
          MoveCardToDifferentColumn={MoveCardToDifferentColumn}
          deleteColumn={deleteColumn}
          board={board}/>
      </Container>
    </>
  )
}

export default Board
