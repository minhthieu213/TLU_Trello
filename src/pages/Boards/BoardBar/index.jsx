import Box from '@mui/material/Box'
import DashboardIcon from '@mui/icons-material/Dashboard'
import Chip from '@mui/material/Chip'
import VpnLockIcon from '@mui/icons-material/VpnLock'
import AddToDriveIcon from '@mui/icons-material/AddToDrive'
import BoltIcon from '@mui/icons-material/Bolt'
import Avatar from '@mui/material/Avatar'
import AvatarGroup from '@mui/material/AvatarGroup'
import { Tooltip } from '@mui/material'
import Button from '@mui/material/Button'
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import FilterListIcon from '@mui/icons-material/FilterList';

const BOARD_CHIP_STYLE = {
  color: 'white',
  backgroundColor: 'transparent',
  border: 'none',
  paddingX: '5px',
  borderRadius: '4px',
  '.MuiSvgIcon-root':{
    color: 'white'
  },
  '&:hover':{
    bgcolor: 'primary.50'
  }
}

function BoardBar() {
  return (
    <Box px={2} sx={{
      width: '100%',
      height: (theme) => theme.trello.boardBarHeight,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 2,
      overflowX: 'auto',
      borderBottom: '1px solid white',
      bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2')
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Chip 
          sx={BOARD_CHIP_STYLE}
          icon={<DashboardIcon />} 
          label="Dashboard" 
          clickable/>

        <Chip 
          sx={BOARD_CHIP_STYLE}
          icon={<VpnLockIcon />} 
          label="Public/ Private Workspace" 
          clickable/>

        <Chip 
          sx={BOARD_CHIP_STYLE}
          icon={<AddToDriveIcon />} 
          label="Add To Google Drive" 
          clickable/>

        <Chip 
          sx={BOARD_CHIP_STYLE}
          icon={<BoltIcon />} 
          label="Automation" 
          clickable/>

        <Chip 
          sx={BOARD_CHIP_STYLE}
          icon={<FilterListIcon />} 
          label="Filter" 
          clickable/>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Button 
        sx={{ color: 'white', borderColor: 'white', '&:hover': { borderColor: 'white' }}}
        variant="outlined" 
        startIcon={<PersonAddIcon />}>Invite</Button>
        <AvatarGroup
         max={4} 
         sx={{ 
          gap: '10px', 
          '& .MuiAvatar-root': { width: 34, height: 34, fontSize: 16, border: 'none' }}}>
          <Tooltip title="Minh Thieu">
            <Avatar alt="Minh Thieu" src="https://avatars.githubusercontent.com/u/190623775?v=4" />
          </Tooltip>
          <Tooltip title="Meo Meo">
            <Avatar alt="Remy Sharp" src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/e5bbd0140562f1c6f20e625dd63ce652~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&nonce=37194&refresh_token=6db9ff7f47626ce8645c714ac4a9238a&x-expires=1741190400&x-signature=tplbxQVMDq4nNSSuFpy9p0HDzB8%3D&idc=sg1&ps=13740610&shcp=81f88b70&shp=a5d48078&t=4d5b0474" />
          </Tooltip>
          <Tooltip title="Mi Mi">
            <Avatar alt="Remy Sharp" src="https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/06776eacaf08b929377ae52f21347dbe~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&nonce=44643&refresh_token=9285bb649a55de70de205632ef154bf0&x-expires=1741190400&x-signature=CK9nglMb1XfkZgVb6xokoqvHdRc%3D&idc=sg1&ps=13740610&shcp=81f88b70&shp=a5d48078&t=4d5b0474" />
          </Tooltip>
          <Tooltip title="Minh Thieu">
            <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/190623775?v=4" />
          </Tooltip>
          <Tooltip title="Minh Thieu">
            <Avatar alt="Remy Sharp" src="https://avatars.githubusercontent.com/u/190623775?v=4" />
          </Tooltip>
        </AvatarGroup>
      </Box>
    </Box>
  )
}

export default BoardBar