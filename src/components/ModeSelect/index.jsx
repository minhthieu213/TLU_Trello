import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightness from '@mui/icons-material/SettingsBrightness'
import { useColorScheme } from '@mui/material/styles';

import Box from '@mui/material/Box'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (e) => {
    setMode(e.target.value)
  }
  return (
    <Select value={mode} onChange={handleChange}>
      <MenuItem value="light">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <LightModeIcon fontSize='small' /> Light
        </div>
      </MenuItem>
      <MenuItem value="dark">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <DarkModeOutlinedIcon fontSize='small' /> Dark
        </Box>
      </MenuItem>
      <MenuItem value="system">
        <Box sx={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <SettingsBrightness fontSize='small' /> System
        </Box>
      </MenuItem>
    </Select>
  )
}

export default ModeSelect
