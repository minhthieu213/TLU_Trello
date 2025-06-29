export const generatePlaceholderCard = (column) => {
    return {
        _id: `${column.id}-placeholder-card`,
        boardId: 'board-id-01', 
        columnId: 'column-id-04',
        FE_placeholderCard: true
    }
}