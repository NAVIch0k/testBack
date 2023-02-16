import express from 'express'
import mongoose from 'mongoose'
import router from './router.js'
import cors from 'cors'

const PORT = 5000

const app = express()

app.use(express.json())
app.use(
  cors({
    credentials: true,
    methods: ['POST', 'PUT', 'DELETE', 'GET', 'OPTIONS'],
    origin: (origin, cb) => {
      cb(null, true)
    }
  })
)
app.use('/api', router)

async function startApp() {
  try {
    mongoose.set('strictQuery', false)
    await mongoose.connect('mongodb://localhost/testDb')
    app.listen(PORT, () => console.log('server starting'))
  } catch (e) {
    console.log(e)
  }
}

startApp()
