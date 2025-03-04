import { useState } from 'react'

import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import AddCardIcon from '@mui/icons-material/AddCard';
import ContentCut from '@mui/icons-material/ContentCut'
import ContentCopy from '@mui/icons-material/ContentCopy'
import ContentPaste from '@mui/icons-material/ContentPaste'
import Cloud from '@mui/icons-material/Cloud'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import DragHandleIcon from '@mui/icons-material/DragHandle'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import GroupIcon from '@mui/icons-material/Group'
import { Tooltip, Typography } from '@mui/material'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'


const HEADER_COLUMN_HEIGHT = '50px'
const FOOTER_COLUMN_HEIGHT = '56px'

function BoardContent() {
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
      width: '100%',
      height: (theme) => theme.trello.boardContentHeight,
      p: '10px 0'
    }}>
      <Box sx={{
        bgcolor: 'inherit',
        width: '100%',
        height: '100%',
        display: 'flex',
        overflowX: 'auto',
        overflowY: 'hidden',
        '&::-webkit-scrollbar-track': { m: 2 }
      }}>
        {/* Box column */}
        <Box 
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
            height: HEADER_COLUMN_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography
            sx={{ fontWeight: 'bold', cursor: 'pointer'}}
            >Column title</Typography>
            <Tooltip title="More options">
              <MoreVertIcon
                id="basic-button-workspaces"
                aria-controls={open ? 'basic-menu-workspaces' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  '&:hover': { bgcolor: '#dfe4ea'},
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
              MenuListProps={{
                'aria-labelledby': 'basic-button-workspaces'
              }}
            >
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DeleteOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          {/* List card */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} - 
            ${theme.spacing(5)} -
            ${HEADER_COLUMN_HEIGHT} -
            ${FOOTER_COLUMN_HEIGHT})`,
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da',
              borderRadius: '8px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2df'
            }
          }}>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/e5bbd0140562f1c6f20e625dd63ce652~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&nonce=37194&refresh_token=6db9ff7f47626ce8645c714ac4a9238a&x-expires=1741190400&x-signature=tplbxQVMDq4nNSSuFpy9p0HDzB8%3D&idc=sg1&ps=13740610&shcp=81f88b70&shp=a5d48078&t=4d5b0474"
                title="green iguana"
              />
              <CardContent sx={{p: 1.5, '&:last-child': {p: 1.5 }}}>
                <Typography>Minh Thieu</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size='small' startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size='small' startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Box Footer */}
          <Box sx={{
            height: FOOTER_COLUMN_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>

        <Box 
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
            height: HEADER_COLUMN_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Typography
            sx={{ fontWeight: 'bold', cursor: 'pointer'}}
            >Column title</Typography>
            <Tooltip title="More options">
              <MoreVertIcon
                id="basic-button-workspaces"
                aria-controls={open ? 'basic-menu-workspaces' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                sx={{
                  '&:hover': { bgcolor: '#dfe4ea'},
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
              MenuListProps={{
                'aria-labelledby': 'basic-button-workspaces'
              }}
            >
              <MenuItem>
                <ListItemIcon><AddCardIcon fontSize="small" /></ListItemIcon>
                <ListItemText>Add new card</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCut fontSize="small" /></ListItemIcon>
                <ListItemText>Cut</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentCopy fontSize="small" /></ListItemIcon>
                <ListItemText>Copy</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon><ContentPaste fontSize="small" /></ListItemIcon>
                <ListItemText>Paste</ListItemText>
              </MenuItem>
              <Divider />
              <MenuItem>
                <ListItemIcon>
                  <Cloud fontSize="small" />
                </ListItemIcon>
                <ListItemText>Archive column</ListItemText>
              </MenuItem>
              <MenuItem>
                <ListItemIcon>
                  <DeleteOutlineIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove column</ListItemText>
              </MenuItem>
            </Menu>
          </Box>

          {/* List card */}
          <Box sx={{
            p: '0 5px',
            m: '0 5px',
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            overflowX: 'hidden',
            overflowY: 'auto',
            maxHeight: (theme) => `calc(
            ${theme.trello.boardContentHeight} - 
            ${theme.spacing(5)} -
            ${HEADER_COLUMN_HEIGHT} -
            ${FOOTER_COLUMN_HEIGHT})`,
            '&::-webkit-scrollbar': {
              width: '8px',
              height: '8px'
            },
            '&::-webkit-scrollbar-thumb': {
              backgroundColor: '#ced0da',
              borderRadius: '8px'
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#bfc2df'
            }
          }}>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardMedia
                sx={{ height: 140 }}
                image="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/e5bbd0140562f1c6f20e625dd63ce652~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&nonce=37194&refresh_token=6db9ff7f47626ce8645c714ac4a9238a&x-expires=1741190400&x-signature=tplbxQVMDq4nNSSuFpy9p0HDzB8%3D&idc=sg1&ps=13740610&shcp=81f88b70&shp=a5d48078&t=4d5b0474"
                title="green iguana"
              />
              <CardContent sx={{p: 1.5, '&:last-child': {p: 1.5 }}}>
                <Typography>Minh Thieu</Typography>
              </CardContent>
              <CardActions sx={{ p: '0 4px 8px 4px' }}>
                <Button size='small' startIcon={<GroupIcon/>}>20</Button>
                <Button size="small" startIcon={<CommentIcon/>}>15</Button>
                <Button size='small' startIcon={<AttachmentIcon/>}>10</Button>
              </CardActions>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
            <Card sx={{ 
              cursor: 'pointer',
              boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
              overflow: 'unset'
            }}>
              <CardContent sx={{p: 1.5, '&:last-child': { p: 1.5 }}}>
                <Typography>
                  Lizard
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Box Footer */}
          <Box sx={{
            height: FOOTER_COLUMN_HEIGHT,
            p: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Button startIcon={<AddCardIcon/>}>Add new card</Button>
            <Tooltip title="Drag to move">
              <DragHandleIcon sx={{ cursor: 'pointer' }}/>
            </Tooltip>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default BoardContent