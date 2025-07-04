import cors from 'cors'
import express from 'express'
import exitHook from 'async-exit-hook'
import {CONNECT_DB, GET_DB, CLOSE_DB} from '~/config/mongodb'
import {env}  from '~/config/environment'
import { APIs_V1 } from './routes/v1'
import { errorHandlingMiddleware } from './middlewares/errorHandlingMiddleware'
import { corsOptions } from './config/cors'

const START_SERVER = () => {

  const app = express()

  app.use(cors(corsOptions))

  app.use(express.json())
  app.use('/v1', APIs_V1)
  
  // Middleware xu ly loi tap trung
  app.use(errorHandlingMiddleware)


  app.listen(env.APP_PORT, env.APP_HOST, () => {

    console.log(`Hello Minh, BackEnd server running succesfully at ${ env.APP_HOST }:${ env.APP_PORT }/`)
  })
  console.log('Server running in mode:', env.BUILD_MODE)


  exitHook(() => {
    CLOSE_DB()
  })
}

(async () => {
  try{
    console.log("Connecton to ....")
    await CONNECT_DB()
    console.log("Connected !")
    START_SERVER()
  }catch(error){
    console.error(error)
    process.exit(0)
  }
})()

// CONNECT_DB()
//   .then(() => console.log("Connected to MongoDB!")) 
//   .then(() => START_SERVER())
//   .catch(error => {
//     console.error(error)
//     process.exit(0)
//   })