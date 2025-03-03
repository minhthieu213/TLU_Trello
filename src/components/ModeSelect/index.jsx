import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined'
import SettingsBrightness from '@mui/icons-material/SettingsBrightness'
import { useColorScheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import { FormControl, InputLabel } from '@mui/material'

function ModeSelect() {
  const { mode, setMode } = useColorScheme()

  const handleChange = (e) => {
    setMode(e.target.value)
  }
  return (
    <FormControl size='small'>
      <InputLabel id="label-select-dark-light-mode">Mode</InputLabel>
      <Select 
        labelId="label-select-dark-light-mode" 
        value={mode} 
        onChange={handleChange} 
        label= "Mode"
        size='small'>
        <MenuItem value="light">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <LightModeIcon fontSize='small' /> Light
          </Box>
        </MenuItem>
        <MenuItem value="dark">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <DarkModeOutlinedIcon fontSize='small' /> Dark
          </Box>
        </MenuItem>
        <MenuItem value="system">
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsBrightness fontSize='small' /> System
          </Box>
        </MenuItem>
      </Select>
    </FormControl>
  )
}

export default ModeSelect
