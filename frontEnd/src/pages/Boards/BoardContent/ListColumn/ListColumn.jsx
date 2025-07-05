import Box from '@mui/material/Box'
import Column from './Column/Column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'
import TextField from "@mui/material/TextField"
import CloseIcon from "@mui/icons-material/Close"
import {SortableContext, horizontalListSortingStrategy} from '@dnd-kit/sortable'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { generatePlaceholderCard } from "~/utils/formatter"
import { cloneDeep } from 'lodash'
import { createNewColumnAPI } from '~/apis'
import {
  updateCurrentActiveBoard,
  selectCurrentActiveBoard } from "~/redux/activeBoard/activeBoardSlice"

import { useDispatch, useSelector } from 'react-redux'

function ListColumn({ columns }) {
  const dispatch = useDispatch()
  const board = useSelector(selectCurrentActiveBoard)
  const [openNewColumnForm, setOpenNewColumnForm] = useState(false)
  const toggleOpenColumnForm = () => setOpenNewColumnForm(!openNewColumnForm)
  const [newColumnTitle, setNewColumnTitle] = useState('')

  const addNewColumn = async () => {
    if(!newColumnTitle) {
      toast.error("Please enter column title!")
      return
    }
    const newColumnData = {
      title: newColumnTitle
    }

    const createdColumn = await createNewColumnAPI({
      ...newColumnData,
      boardId: board._id
    })

    createdColumn.cards = [generatePlaceholderCard(createdColumn)]
    createdColumn.cardOrderIds = [generatePlaceholderCard(createdColumn)._id]

    // Cap nhat state board
    const newBoard = cloneDeep(board)
    newBoard.columns.push(createdColumn)
    newBoard.columnOrderIds.push(createdColumn._id)
    dispatch(updateCurrentActiveBoard(newBoard))

    toggleOpenColumnForm()
    setNewColumnTitle('')
  }

  return (
    <SortableContext
      items={columns.map(c => c._id)}
      strategy={horizontalListSortingStrategy}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {columns?.map((column) => (
          <Column key={column._id} column={column}/>
        ))}
        {
          !openNewColumnForm
          ?<Box onClick={toggleOpenColumnForm} sx={{
            minWidth: '250px',
            maxWidth: '250px',
            bgcolor: '#ffffff3d',
            mx: 2,
            height: 'fit-content',
            borderRadius: '6px'
          }}>
            <Button sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }} startIcon={<AddIcon/>}>
              Add new column
            </Button>
          </Box>
          : <Box sx={{
            minWidth: '250px',
            maxWidth: '250px',
            bgcolor: '#ffffff3d',
            mx: 2,
            p: 1,
            height: 'fit-content',
            borderRadius: '6px',
            display: 'flex',
            gap: 1,
            flexDirection: 'column'
          }}>
            <TextField
              id="outlined-search"
              label="Enter column title..."
              type="text"
              size="small"
              variant='outlined'
              autoFocus
              value={newColumnTitle}
              onChange={(e) => setNewColumnTitle(e.target.value)}
              sx={{
                "& label": { color: "white" },
                "& input": { color: "white" },
                "& label.Mui-focused": { color: "white" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white"
                  },
                  "&:hover fieldset": {
                    borderColor: "white"
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white"
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Button className='interceptor-loading'
               variant='contained' color='success' size='small' onClick={addNewColumn}
              sx={{
                boxShadow: 'none',
                border: '0.5px solid',
                borderColor: (theme) => theme.palette.success.main,
                '&:hover': { bgcolor: (theme) => theme.palette.success.main }
              }}>Add column</Button>
              <CloseIcon
                onClick={toggleOpenColumnForm}
                fontSize="small"
                sx={{
                  color: "white",
                  cursor:"pointer",
                  '&:hover': { color: (theme) => theme.palette.warning.light }
                }}
              />
            </Box>
          </Box>
        }
      </Box>
    </SortableContext>
  )
}

export default ListColumn