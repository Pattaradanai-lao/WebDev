// Step 1 import นำเข้าสิ่งต่างๆ เข้ามา เริ่มจากนำเข้า express และเอา express ไปเก็บไว้ใน app จะได้เรียกใช้ง่ายๆ
const express = require('express');
const app = express();
const morgan = require('morgan');
const { readdirSync } = require('fs')
const cors = require('cors')

// const authRouter = require('./routes/auth')

// middleware มีข้อมูลบอกว่าอะไรกำลังทำงานอยู่
app.use(morgan('dev'))
//ทำให้สามารถอ่านไฟล์ json ได้
app.use(express.json({limit:'20mb'}))
app.use(cors())

// app.use('/api', authRouter)
// app.use('/api', categoryRouter)


readdirSync('./routes')
.map((c)=>app.use('/api', require('./routes/' + c)))


// Step 2 Start Server
app.listen(5002, ()=> console.log('Server is running on port 5003'))