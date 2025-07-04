import express from 'express'
import { StatusCodes } from 'http-status-codes'
import { boardRoute } from './boardRoute'
import { columnRoute } from './columnRoute'
import { cardRoute } from './cardRoute'

const Router = express.Router()

Router.get('/status', (req, res) => {
    res.status(StatusCodes.OK).json({message: 'APIs v1 are ready to use'})
})

// Boards API
Router.use('/boards', boardRoute)

// Columns API
Router.use('/columns', columnRoute)

// Cards API
Router.use('/cards', cardRoute)

export const APIs_V1 = Router