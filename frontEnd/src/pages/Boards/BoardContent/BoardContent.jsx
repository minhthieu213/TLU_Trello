import Box from '@mui/material/Box'
import ListColumn from './ListColumn/ListColumn'
import Card from './ListColumn/Column/ListCard/Card/Card'
import Column from './ListColumn/Column/Column'

import {
  DndContext, 
  closestCorners, 
  // closestCenter,
  // MouseSensor, 
  // TouchSensor,
  useSensor, 
  useSensors, 
  DragOverlay, 
  defaultDropAnimationSideEffects,
  pointerWithin,
  // rectIntersection,
  getFirstCollision} from '@dnd-kit/core'
import {MouseSensor, TouchSensor} from '~/customLibraries/dndKitSensors'
import { useEffect, useState, useCallback, useRef } from 'react'
import {arrayMove} from '@dnd-kit/sortable'
import { cloneDeep, isEmpty } from 'lodash'
import { generatePlaceholderCard } from '~/utils/formatter'

const ACTIVE_DRAG_ITEM_TYPE = {
  COLUMN: 'ACTIVE_DRAG_ITEM_TYPE_COLUMN',
  CARD: 'ACTIVE_DRAG_ITEM_TYPE_CARD',
}

function BoardContent({ 
  board, 
  createNewColumn, 
  moveColumns, 
  createNewCard, 
  moveCardInTheSameColumn, 
  MoveCardToDifferentColumn,
  deleteColumn
}) {


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

  // Cung 1 thoi diem chi co mot phan tu duoc keo card hoac column
  const [activeDragItemId, setActiveDragItemId] = useState(null)
  const [activeDragItemType, setActiveDragItemType] = useState(null)
  const [activeDragItemData, setActiveDragItemData] = useState(null)
  const [oldColumnDraggingCard, setOldColumnDraggingCard] = useState(null)

  // Id Diem va cham cuoi cung 
  const lastOverId = useRef(null)
  
  useEffect(() => {
    setOrderedColumns(board.columns)
  }, [board])

  // Tim column theo cardId
  const findColumnByCardId = (cardId) => {
    return orderedColumns.find(column => column.cards.map(card => card._id)?.includes(cardId))
  }

  // Bat dau keo
  const handleDragStart = (event) => {
    // console.log("Hanlde drag start: ", event)
    setActiveDragItemId(event?.active?.id)
    setActiveDragItemType(event?.active?.data?.current?.columnId ? ACTIVE_DRAG_ITEM_TYPE.CARD : ACTIVE_DRAG_ITEM_TYPE.COLUMN)
    setActiveDragItemData(event?.active?.data?.current)

    // Neu ma keo card moi set gia tri oldColumn (card moi co columnId)
    if(event?.active?.data?.current?.columnId){
      setOldColumnDraggingCard(findColumnByCardId(event?.active?.id))
    }
  }

  // Cap nhat lai state trong truong hop card di chuyen giua 2 column khac nhau
  const moveCardBetwweenDifferentColumns = (
    overColumn, overCardId, activeColumn, active, over, activeDraggingCardData, activeDraggingCardId, triggerFrom
  ) => {
    setOrderedColumns(prevColumns => {
        // Tim vi tri cua overCard noi ma activeCard sap duoc tha
        const overCardIndex = overColumn?.cards.findIndex(card => card._id === overCardId)

        // Tinh toan vi tri moi cho card
        let newCardIndex 
        const isBelowOverItem =
          active.rect.current.translated &&
          active.rect.current.translated.top >
          over.rect.top + over.rect.height

        const modifier = isBelowOverItem ? 1 : 0;

        newCardIndex = overCardIndex >= 0 ? overCardIndex + modifier : overColumn?.cards.length + 1;

        const nextColumns = cloneDeep(prevColumns)
        const nextActiveColumn = nextColumns.find(column => column._id === activeColumn._id)
        const nextOverColumn = nextColumns.find(column => column._id === overColumn._id)

        if(nextActiveColumn){

          // Xoa card active khoi column ban dau
          nextActiveColumn.cards = nextActiveColumn.cards.filter(card => card._id !== activeDraggingCardId)

          // Them placeholder card neu column rong
          if(isEmpty(nextActiveColumn.cards)){
            nextActiveColumn.cards = [generatePlaceholderCard(nextActiveColumn)]
          }

          // Cap nhat lai mang thu tu card cho chuan
          nextActiveColumn.cardOrderIds = nextActiveColumn.cards.map(card => card._id)
        }

        if(nextOverColumn){
          // Kiem tra xem card dang keo co o overcolumn chua neu co thi xoa no di
          nextOverColumn.cards = nextOverColumn.cards.filter(card => card._id !== activeDraggingCardId)

          const rebuild_activeDraggingCardData = {
            ... activeDraggingCardData,
            columnId: nextOverColumn._id
          }
          // Them card vao vi tri moi
          nextOverColumn.cards = nextOverColumn.cards.toSpliced(newCardIndex, 0, rebuild_activeDraggingCardData)

          // Xoa placeholdercard neu no dang ton tai
          nextOverColumn.cards = nextOverColumn.cards.filter(card => !card.FE_placeholderCard)

          nextOverColumn.cardOrderIds = nextOverColumn.cards.map(card => card._id)
        }

        if(triggerFrom === 'handleDragEnd'){
          MoveCardToDifferentColumn(activeDraggingCardId, oldColumnDraggingCard._id, nextOverColumn._id, nextColumns)
        }

        return nextColumns

      })
  }

  // Trong qua trinh keo
  const hanldeDragOver = (event) => {
    // Doi voi column thi khong lam gi ca
    if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

    // Xu ly doi voi card
    // console.log("Hanlde drag over: ", event)
    const {active, over} = event

    if(!active || !over) return

    const { id: activeDraggingCardId, data: { current: activeDraggingCardData}} = active
    const { id: overCardId} = over

    // Tim 2 column drag
    const activeColumn = findColumnByCardId(activeDraggingCardId)
    const overColumn = findColumnByCardId(overCardId)

    if(!activeColumn || !overColumn) return

    // Xu ly khi keo tha giua 2 column khac nhau 
    if(activeColumn._id !== overColumn._id){
      moveCardBetwweenDifferentColumns(overColumn, overCardId, activeColumn, active, over, activeDraggingCardData, activeDraggingCardId, 'hanldeDragOver')
    }
  }

  // Ket thuc keo
  const handleDragEnd = (event) => {
    // console.log("Handle drag end: ",event)
    const {active, over} = event

    // Kiem tra neu keo ra ngoai keo linh tinh tranh loi
    if(!active || !over) return 

    // Xu ly keo tha card
    if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD){
      if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) return

      // Xu ly doi voi card
      // console.log("Hanlde drag over: ", event)


      const { id: activeDraggingCardId, data: { current: activeDraggingCardData}} = active
      const { id: overCardId} = over

      // Tim 2 column drag
      const activeColumn = findColumnByCardId(activeDraggingCardId)
      const overColumn = findColumnByCardId(overCardId)

      if(!activeColumn || !overColumn) return

      // Keo tha card giua 2 column khac nhau
      if(oldColumnDraggingCard._id !== overColumn._id){
        moveCardBetwweenDifferentColumns(overColumn, overCardId, activeColumn, active, over, activeDraggingCardData, activeDraggingCardId, 'handleDragEnd')
      }
      // Keo tha card trong 1 cot
      else{
        // Lay ra vi tri cu tu oldColumnDraggingCard
        const oldCardIndex = oldColumnDraggingCard?.cards?.findIndex(c => c?._id === activeDragItemId)
        // Lay ra vi tri moi tu over
        const newCardIndex = overColumn?.cards?.findIndex(c => c?._id === overCardId)
        // Keo tha card trong 1 column tuong tu keo tha column
        const dndOrderedCards = arrayMove(oldColumnDraggingCard?.cards, oldCardIndex, newCardIndex)

        const dndOrderedCardIds = dndOrderedCards.map(card => card._id)

        setOrderedColumns(prevColumns => {
          const nextColumns = cloneDeep(prevColumns)

          // Tim toi column dang tha (cung la cai dang keo)
          const targetColumn = nextColumns.find(column => column._id === overColumn._id)
          targetColumn.cards = dndOrderedCards
          targetColumn.cardOrderIds = dndOrderedCardIds
          return nextColumns
        })

        moveCardInTheSameColumn(dndOrderedCards, dndOrderedCardIds, oldColumnDraggingCard._id)
      }
    }

    // Xu ly keo tha column
    if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN){
      // Kiem tra vi tri keo tha khac vi tri ban dau
      if( active.id !== over.id){
        // Lay ra vi tri cu tu active
        const oldColumnIndex = orderedColumns.findIndex(c => c?._id === active.id)
        // Lay ra vi tri moi tu over
        const newColumnIndex = orderedColumns.findIndex(c => c?._id === over.id)

        const dndOrderedColumns = arrayMove(orderedColumns, oldColumnIndex, newColumnIndex) //Sap xep lai vi tri sau khi keo tha
        // const dndOrderedColumnsIds = dndOrderedColumns.map(c => c._id)
        moveColumns(dndOrderedColumns)
        // set lai state sau khi sap xep
        setOrderedColumns(dndOrderedColumns)
      }
    }

    // Set la gia tri sau khi keo tha
    setActiveDragItemId(null)
    setActiveDragItemType(null)
    setActiveDragItemData(null)
    setOldColumnDraggingCard(null)
  }

  //Animation khi tha phan tu
  const customDropAnimation = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: '0.5',
        },
      },
    }),
  };

  const collisionDetectionStrategy = useCallback((args) => {
    // closestCorners thuật toán phát hiện góc gần nhất chỉ tối ưu cho kéo thả column phát hiện va chạm
    if(activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN){
      return closestCorners({...args})
    }

    // Tim cac diem giao nhau, va cham
    const pointerIntersections = pointerWithin(args)

    if(!pointerIntersections?.length) return
    // Thuat toan phat hien va cham tra ve 1 mang cac va cham
    // const intersections = pointerIntersections.length > 0 ? pointerIntersections : rectIntersection(args)
    // Tim overId đầu tiên trong cac intersection
    let overId = getFirstCollision(pointerIntersections, 'id')

    if(overId){
      const checkColumn = orderedColumns.find(column => column._id === overId)

      if(checkColumn){
        overId = closestCorners(
          {...args,
            droppableContainers: args.droppableContainers
            .filter(container => {
              return (container.id !== overId) && (checkColumn?.cardOrderIds?.includes(container.id))
            })
          }
        )[0]?.id
      }

      lastOverId.current = overId
      return [{ id: overId }]
    }

    return lastOverId.current ? [{ id: overId }] : []
  }, [activeDragItemType, orderedColumns])

  return (
    <DndContext 
      onDragStart={handleDragStart} 
      onDragOver={hanldeDragOver}
      onDragEnd={handleDragEnd}
      collisionDetection={collisionDetectionStrategy} sensors={sensors}>
      <Box sx={{
        bgcolor: (theme) => (theme.palette.mode === 'dark' ? '#34495e' : '#1976d2'),
        width: '100%',
        height: (theme) => theme.trello.boardContentHeight,
        p: '10px 0'
      }}>
        <ListColumn columns={orderedColumns} createNewColumn={createNewColumn} createNewCard={createNewCard} deleteColumn={deleteColumn}/>
        <DragOverlay dropAnimation={customDropAnimation}>
          {!activeDragItemType && null}
          {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.COLUMN) && <Column column={activeDragItemData}/>}
          {( activeDragItemType === ACTIVE_DRAG_ITEM_TYPE.CARD) && <Card card={activeDragItemData}/>}
        </DragOverlay>
      </Box>
    </DndContext>
  )
}

export default BoardContent