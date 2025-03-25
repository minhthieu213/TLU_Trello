import Box from '@mui/material/Box'
import Column from './Column/column'
import Button from '@mui/material/Button'
import AddIcon from '@mui/icons-material/Add'

function ListColumn({ columns }) {
  return (
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
      <Box sx={{
        minWidth: '200px',
        maxWidth: '200px',
        bgcolor: '#ffffff3d',
        mx: 2,
        height: 'fit-content',
        borderRadius: '6px'
      }}>
        <Button sx={{ color: 'white', width: '100%', justifyContent: 'flex-start', pl: 2.5, py: 1 }} startIcon={<AddIcon/>}>
          Add new column
        </Button>
      </Box>
    </Box>
  )
}

export default ListColumn