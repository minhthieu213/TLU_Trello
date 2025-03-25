import Box from '@mui/material/Box'
import Card from './Card/card'

function ListCard({ cards }) {
  return (
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
      ${theme.trello.headerColumnHeight} -
      ${theme.trello.footerColumnHeight})`,
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
      {cards?.map(card =>
        <Card key = {card._id} card={card}/>
      )}
    </Box>
  )
}

export default ListCard