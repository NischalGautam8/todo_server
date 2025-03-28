import dotenv from 'dotenv'
import express from 'express'
import mongoose from 'mongoose'
import http from "http"
import userrouter from './routes/userrouter'
import taskrouter from './routes/todorouter'
import cors from 'cors'
import isAuthenticated from './middleware/auth'
dotenv.config()
const app = express()
app.use(cors({
  origin: 'http://localhost:5173', // Your Svelte app's URL
  credentials: true
}))
// Add these middleware before your routes
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routes
app.use('/api/user', userrouter)
app.use('/api/todo', taskrouter)

const httpserver = http.createServer(app)

const MONGODB_URI = process.env.MONGODB_URI
if (!MONGODB_URI || !MONGODB_URI.startsWith('mongodb')) {
  console.error('Invalid MONGODB_URI:', MONGODB_URI)
  process.exit(1)
}

const start = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    httpserver.listen(8000, () => {
      console.log("connected to the database & listening to port")
    })
  } catch (err) {
    console.error('MongoDB connection error:', err)
    process.exit(1)
  }
}

  start();
