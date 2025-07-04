import { Container } from "@mui/material"
import AppBar from "~/components/AppBar/AppBar"
import BoardBar from "./BoardBar/BoardBar"
import BoardContent from "./BoardContent/BoardContent"
// import { mockData } from "~/apis/mockdata"
import { useEffect, useState } from "react"
import { fetchBoardDetailsAPI, createNewColumnAPI, createNewCardAPI } from "~/apis"
import { isEmpty } from "lodash"
import { generatePlaceholderCard } from "~/utils/formatter"

function Board() {
  const [board, setBoard] = useState(null)

  useEffect(() => {
    const boardId = '68676bf998e8dcf8cb7e9d31'
    fetchBoardDetailsAPI(boardId).then((board) => {
        // Xu ly keo tha card vao mot column rong
        board.columns.forEach(column => {
          if(isEmpty(column.cards)){
            column.cards = [generatePlaceholderCard(column)]
            column.cardOrderIds= [generatePlaceholderCard(column)._id]
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

  return (
    <>
      <Container disableGutters maxWidth={false} sx={{ height: "100vh" }}>
        <AppBar />
        <BoardBar board={board}/>
        <BoardContent 
          createNewColumn={createNewColumn}
          createNewCard={createNewCard}
          board={board}/>
      </Container>
    </>
  )
}

export default Board
