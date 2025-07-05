import { useState } from 'react'
import ListCard from './ListCard/ListCard'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import AddCardIcon from '@mui/icons-material/AddCard'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Button from '@mui/material/Button'
import { Tooltip, Typography } from '@mui/material'
import theme from '~/theme'
import TextField from "@mui/material/TextField"
import CloseIcon from "@mui/icons-material/Close"
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import { toast } from 'react-toastify'
import { useConfirm } from "material-ui-confirm";

function Column({ column, createNewCard, deleteColumn }) {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
    id: column._id,
    data: {...column}
  })

  const DndKitColumnStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    height: '100%',
  }

  const orderedCards = column.cards
  const [openNewCardForm, setOpenNewCardForm] = useState(false)
  const toggleOpenCardForm = () => setOpenNewCardForm(!openNewCardForm)
  const [newCardTitle, setNewCardTitle] = useState('')

  const addNewCard = async () => {
    if(!newCardTitle) {
      toast.error("Please enter card title!", {position: 'bottom-right'})
      return
    } 
    
    const newCardData =  {
      title: newCardTitle,
      columnId: column._id,
    }

    createNewCard(newCardData)

    toggleOpenCardForm()
    setNewCardTitle('')
  }

  const confirmDeleteColumn = useConfirm()
  const handleDeleteColumn = () => {
    confirmDeleteColumn({
      title: 'Delete column?',
      description: 'This action will permanently delete your Column and its Cards! Are you sure?',
      confirmationText: "Yes",
      cancellationText: 'No',
      buttonOrder: ['confirm', 'cancel'],
      dialogProps: {maxWidth: 'xs'},
      allowClose: false,
      confirmationButtonProps: {color: 'error'},
      cancellationButtonProps: {color: 'inherit'}
    }) .then(() => {
      deleteColumn(column._id)
    }).catch(() => {})
  }

  return (
    <div ref={setNodeRef} style={DndKitColumnStyle} {...attributes}>
      <Box
        {...listeners}
        sx={{
          minWidth: '300px',
          maxWidth: '300px',
          bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : '#ebecf0' ),
          ml: 2,
          borderRadius: '6px',
          height: 'fit-content',
          maxHeight: (theme) => `calc(${theme.trello.boardContentHeight} - ${theme.spacing(5)})`
      }}>
        {/* Header column */}
        <Box sx={{
          height: theme.trello.headerColumnHeight,
          p: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Typography
            sx={{ fontWeight: 'bold', cursor: 'pointer' }}
          >{column?.title}</Typography>
          <Tooltip title="More options">
            <MoreVertIcon
              id="basic-button-workspaces"
              aria-controls={open ? 'basic-menu-workspaces' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
              sx={{
                '&:hover': { bgcolor: '#dfe4ea' },
                color: 'text.primary',
                cursor: 'pointer',
                borderRadius: '6px'
              }}
            />
          </Tooltip>
          <Menu
            id="basic-menu-workspaces"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button-workspaces'
            }}
          >
            <MenuItem  onClick={toggleOpenCardForm} sx={{
              '&:hover': { color: 'success.light', '& .addCardIcon': {color: 'success.light'}}
            }}>
              <ListItemIcon><AddCardIcon className='addCardIcon' fontSize="small" /></ListItemIcon>
              <ListItemText>Add new card</ListItemText>
            </MenuItem>
            <MenuItem onClick={handleDeleteColumn} sx={{
              '&:hover': { color: 'warning.dark', '& .deleteCardIcon': {color: 'warning.dark'}}
            }}>
              <ListItemIcon>
                <DeleteOutlineIcon className='deleteCardIcon' fontSize="small" />
              </ListItemIcon>
              <ListItemText>Remove column</ListItemText>
            </MenuItem>
          </Menu>
        </Box>

        {/* List card */}
        <ListCard cards={orderedCards}/>
        {/* Box Footer */}
        <Box sx={{
          height: theme.trello.foooterColumnHeight,
          p: 2
        }}>
          {!openNewCardForm
          ?<Box sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
          }}>
              <Button startIcon={<AddCardIcon/>} onClick={toggleOpenCardForm}>Add new card</Button>
              <Tooltip title="Drag to move">
                <DragHandleIcon sx={{ cursor: 'pointer' }}/>
              </Tooltip>
            </Box>
          : <Box sx ={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              gap: 1
          }}>            
            <TextField
              id="outlined-search"
              label="Enter card title..."
              type="text"
              size="small"
              variant='outlined'
              autoFocus
              data-no-dnd="true"
              value={newCardTitle}
              onChange={(e) =>setNewCardTitle(e.target.value)}
              sx={{
                "& label": {  color: (theme) => theme.palette.primary.main },
                "& input": { 
                  color: (theme) => theme.palette.primary.main,
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#333643' : 'white')
                 },
                "& label.Mui-focused": { color: (theme) => theme.palette.primary.main },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: (theme) => theme.palette.primary.main
                  },
                  "&:hover fieldset": {
                    borderColor: (theme) => theme.palette.primary.main
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: (theme) => theme.palette.primary.main
                  },
                  '&MuiOutlinedInput-input': {
                    borderRadius: 1
                  }
                }
              }}
            />
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1}}>
              <Button variant='contained' color='success' size='small' onClick={addNewCard}
              sx={{
                boxShadow: 'none',
                border: '0.5px solid',
                borderColor: (theme) => theme.palette.success.main,
                '&:hover': {bgcolor: (theme) => theme.palette.success.main}
              }}>Add</Button>
              <CloseIcon
                onClick={toggleOpenCardForm}
                fontSize="small"
                sx={{
                  color: (theme) => theme.palette.warning.light ,
                  cursor:"pointer",
                }}
              />
            </Box>
          </Box>
          }
        </Box>
      </Box>
    </div>
  )
}

export default Column