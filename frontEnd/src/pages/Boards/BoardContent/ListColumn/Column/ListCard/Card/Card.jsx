import { Card as MuiCard } from '@mui/material'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import GroupIcon from '@mui/icons-material/Group'
import CommentIcon from '@mui/icons-material/Comment'
import AttachmentIcon from '@mui/icons-material/Attachment'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'

import {useSortable} from '@dnd-kit/sortable';
import {CSS} from '@dnd-kit/utilities';

function Card({ card }) {
  const shouldShowCardActions = () => {
    return !!card?.memberIds?.length || !!card?.comments?.length || !!card?.attachments?.length
  }

  const { attributes, listeners, setNodeRef, transform, transition, isDragging} = useSortable({
      id: card._id,
      data: {...card}
    })
  
  const DndKitCardStyle = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    border: isDragging ? '2px solid #2980b9' : undefined
  }

  return (
    <MuiCard ref={setNodeRef} style={DndKitCardStyle} {...listeners} {...attributes} sx={{
      cursor: 'pointer',
      boxShadow: '0 1px 1px rgba(0, 0, 0, 0.2)',
      overflow: 'unset',
      border: '1px solid transparent',
      '&:hover': {borderColor: (theme) => theme.palette.primary.main},
      display: card?.FE_placeholderCard ? 'none' : 'block'
    }}>
      {card?.cover && <CardMedia sx={{ height: 140 }} image={card?.cover} />}
      <CardContent sx={{ p: 1.5, '&:last-child': { p: 1.5 } }}>
        <Typography>{card?.title}</Typography>
      </CardContent>
      {!!shouldShowCardActions() &&
      <CardActions sx={{ p: '0 4px 8px 4px' }}>
        {!!card?.memberIds?.length &&
        <Button size='small' startIcon={<GroupIcon/>}>{card?.memberIds.length}</Button>}
        {!!card?.comments?.length &&
        <Button size='small' startIcon={<CommentIcon/>}>{card?.comments.length}</Button>}
        {!!card?.attachments?.length &&
        <Button size='small' startIcon={<AttachmentIcon/>}>{card?.attachments.length}</Button>}
      </CardActions>
      }
    </MuiCard>
  )
}

export default Card