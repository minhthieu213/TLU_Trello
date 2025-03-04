import Box from '@mui/material/Box'
import ModeSelect from '../../components/ModeSelect'
import AppsIcon from '@mui/icons-material/Apps'
import { ReactComponent as TrelloIcon } from '~/assets/trello.svg'
import SvgIcon from '@mui/material/SvgIcon'
import { Typography } from '@mui/material'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone'
import Badge from '@mui/material/Badge'
import Tooltip from '@mui/material/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import LibraryAddIcon from '@mui/icons-material/LibraryAdd'
import InputAdornment from '@mui/material/InputAdornment'
import SearchIcon from '@mui/icons-material/Search'
import CloseIcon from '@mui/icons-material/Close'

import Workspaces from './Menu/Workspaces'
import Recent from './Menu/Recent'
import Templates from './Menu/Templates'
import Starred from './Menu/Starred'
import Profile from './Menu/Profile'

import { useState } from 'react'

function AppBar() {
  const [searchValue, setSearchValue] = useState('')

  const handleSearchValue = (e) => {
    setSearchValue(e.target.value)
  }

  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.appBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#2c3e50' : '#1655c0'),
      '&::-webkit-scrollbar-track': { m: 2 }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <AppsIcon sx={{ color: 'white' }}/>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'white' }}>
          <SvgIcon component={TrelloIcon} fontSize='small' inheritViewBox />
          <Typography variant='span' sx={{ fontSize: '1.2rem', fontWeight: 'bold' }}>Trello</Typography>
        </Box>
        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
          <Workspaces/>
          <Recent />
          <Starred />
          <Templates />
          <Button 
            sx={{ color: 'white', border: 'none', '&:hover': { border: 'none' } }} 
            startIcon={<LibraryAddIcon />} 
            variant="outlined">Create</Button>
        </Box>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <TextField 
          id="outlined-search" 
          label="Search" 
          type="text" 
          size='small' 
          value={searchValue}
          onChange={handleSearchValue}
          InputProps={{
            startAdornment:(
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'white', cursor: 'pointer' }}/>
              </InputAdornment>
            ),
            endAdornment:(
              <CloseIcon onClick={() => setSearchValue('')} fontSize='small' sx={{ color: searchValue ? 'white' : 'transparent', cursor: searchValue ? 'pointer' : 'auto' }}/>
            ),
          }}
          sx={{ 
            minWidth: 120,
            maxWidth: 170,
            '& label': { color: 'white' },
            '& input': { color: 'white' },
            '& label.Mui-focused': { color: 'white' },
            '& .MuiOutlinedInput-root': { 
              '& fieldset': {
                borderColor: 'white'
              },
              '&:hover fieldset': {
                borderColor: 'white'
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white'
              }
             }
          }}/>
        <ModeSelect />

        <Tooltip title="Notifications" sx={{ cursor: 'pointer' }}>
          <Badge color="secondary" variant="dot">
            <NotificationsNoneIcon sx={{ color: 'white' }}/>
          </Badge>
        </Tooltip>

        <Tooltip title="Notification" sx={{ cursor: 'pointer' }}>
          <HelpOutlineIcon sx={{ color: 'white' }}/>
        </Tooltip>
        <Profile />
      </Box>
    </Box>
  )
}

export default AppBar
