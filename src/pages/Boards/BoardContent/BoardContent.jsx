import Box from '@mui/material/Box'
import ListColumn from './ListColumn/ListColumn'

import {DndContext, closestCorners, MouseSensor, TouchSensor, PointerSensor, useSensor, useSensors} from '@dnd-kit/core'
import mapOrder from '~/utils/sorts'
import { useEffect, useState } from 'react'
import {arrayMove} from '@dnd-kit/sortable';
import { restrictToFirstScrollableAncestor } from '@dnd-kit/modifiers'

function BoardContent({ board }) {


  // Yeu cau di chuyen it nhat 10px thi moi kich hoat event, fix loi khi click kich hoat event
  const mouseSensor = useSensor(MouseSensor, {
    activationConstraint: {
      distance: 10,
  }})
 
  // Cam ung thi delay 250ms va dung sai (do chenh lenh 5px) thi moi kich hoat event
  const touchSensor = useSensor(TouchSensor, {
    activationConstraint: {
      delay: 250,
      tolerance: 500
  }})

  const sensors = useSensors(mouseSensor, touchSensor)

  const [orderedColumns, setOrderedColumns] = useState([])
  
  useEffect(() => {
    setOrderedColumns(mapOrder(board?.columns, board?.columnOrderIds, '_id'))
  }, [board])

  const handleDragEnd = (event) => {
    console.log("Handle drag end: ",event)
    const {active, over} = event

    // Kiem tra neu keo ra ngoai keo linh tinh tranh loi
    if(!over) { return }

    // Kiem tra vi tri keo tha khac vi tri ban dau
    if( active.id !== over.id){
      // Lay ra vi tri cu tu active
      const oldIndex = orderedColumns.findIndex(c => c?._id === active.id)
      // Lay ra vi tri moi tu over
      const newIndex = orderedColumns.findIndex(c => c?._id === over.id)

      const dndOrderedColumns = arrayMove(orderedColumns, oldIndex, newIndex) //Sap xep lai vi tri sau khi keo tha
      const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)

      console.log(dndOrderedColumns)
      console.log(dndOrderedColumnsIds)

      // set lai state sau khi sap xep
      setOrderedColumns(dndOrderedColumns)
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd} collisionDetection={closestCorners} sensors={sensors} modifiers={[restrictToFirstScrollableAncestor]}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumn columns={orderedColumns}/>
      </Box>
    </DndContext>
  )
}

export default BoardContent