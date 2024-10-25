const express = require('express');
const mysql = require('mysql2/promise'); 
const cors = require('cors');


const dbConfig = {
    host: 'localhost',
    user: 'user', // replace with your MySQL username
    password: 'pass', // replace with your MySQL password
    database: 'testdb', // replace with your MySQL database name
    port: 3306 // default MySQL port
};
// Create a connection pool
const pool = mysql.createPool(dbConfig);

async function create_stud(rno, firstname, lastname, password, contact)
{
    const query = 'INSERT INTO student (rno, firstname, lastname, password, contact) VALUES (?, ?, ?, ?, ?)';
    
    await pool.query(query, [rno, firstname, lastname, password, contact], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error.stack);
            return;
        }
        else
            console.log(`values Inserted`);
    });
}

async function delete_stud(rno, password)
{
    const passQuery = await pool.query('select password from student where rno=?',[rno]);
    const realPass = passQuery[0][0].password
    
    if(password == realPass)
    {
        const query = "DELETE FROM student where rno = ?;"
    
        await pool.query(query, [rno], (error, results) => {
            if (error) {
                console.error('Error inserting data:', error.stack);
                return;
            }
        });
    }
    else
    {
        console.log("wrong password");
    }

}

// Students can update their contact number
async function update_stud(rno, contact)
{

    const query = "UPDATE student SET contact = ? WHERE rno = ?;"
    
    await pool.query(query, [contact,rno], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error.stack);
            return;
        }
    });

    console.log("updated");


}


async function view_stud(rno)
{

    const query = "SELECT * from student WHERE rno = ?;"
    
    const data = await pool.query(query, [rno], (error, results) => {
        if (error) {
            console.error('Error inserting data:', error.stack);
            return;
        }
    });

    return data[0][0];

}


const app = express();
app.use(express.json())
app.use(cors())

app.get('/',async (req,res)=>{
    const rno = await req.query.rno;
    const data = await view_stud(rno);
    console.log(rno);
    console.log(data);
    res.json({
        data
    });
})

app.post('/',async (req,res)=>{
    const rno = req.body.rno;
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const password = req.body.password;
    const contact = req.body.contact;

    create_stud(rno, firstname, lastname, password, contact);

    res.send("created student");
    
});


app.put('/',async (req,res)=>{
    const rno = req.body.rno;
    const contact = req.body.contact;

    update_stud(rno, contact);

    res.send("updated student");
    
});



app.delete('/',async (req,res)=>{
    const rno = req.body.rno;
    const password = req.body.password;

    delete_stud(rno, password);

    res.send("deleted student");
    
});




app.listen(3000,()=>{
    console.log("app is running at 3000");
});

