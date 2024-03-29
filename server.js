const express = require('express')
const app = express()
const PORT = 2121

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/',(request, response)=>{
    response.render('index.ejs', { message: "data" })
})


app.post('/addEnrollmentNo', (request, response) => {
    async function example2() {
        const mysql = require('mysql2/promise');
        const pool = mysql.createPool({ host: "127.0.0.1", user: "root", password: "debian", database: "test" });
        // execute in parallel, next console.log in 3 seconds
        let data = await Promise.all([
            pool.query(`insert into table_5(date, time, subject, present) values(current_date(), current_time(), "ADBMS", ${request.body.enrollment_no});`),
            pool.query('select * from table_5')
        ]);
        console.log(data[0])
        console.log(data[1]);
        await pool.end();
    }
    example2()
    console.log(request.body.enrollment_no)
})


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})