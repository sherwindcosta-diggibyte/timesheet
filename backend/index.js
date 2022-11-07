const mysql = require('mysql2');
const express = require('express');
var app = express();
const bodyparser = require('body-parser');
//const db = require('../util/database');

const cors = require("cors");

var corsoption = {
    origin:"http://localhost:4200"
};
app.use(cors(corsoption));

app.use(bodyparser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");    
    next();
  });

var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'timesheet',
    multipleStatements: true
});

mysqlConnection.connect((err) => {
    if (!err)
        console.log('DB connection succeded.');
    else
        console.log('DB connection failed \n Error : ' + JSON.stringify(err, undefined, 2));
});


app.listen(8000, () => console.log('Express server is runnig at port no : 8000'));


// router.post('/', function(req, res) {
// });



// Get Timesheet table
app.get('/tbl_fact_timesheet', (req, res) => {
    mysqlConnection.query('SELECT * FROM tbl_fact_timesheet', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});


//Get all Employees
app.get('/tbl_dim_master_data', (req, res) => {
    mysqlConnection.query('SELECT * FROM tbl_dim_master_data', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

//Get all Projects
app.get('/tbl_dim_project', (req, res) => {
    mysqlConnection.query('SELECT * FROM tbl_dim_project', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    }) 
});


//Get Timesheet table 
app.get('/tbl_fact_timesheet/:id', (req, res) => {
    mysqlConnection.query('SELECT * FROM tbl_fact_timesheet WHERE ts_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});

app.get('/hours', (req, res) => {
    mysqlConnection.query('Select hours, emp_name from tbl_fact_timesheet', (err, rows, fields) => {
        if (!err)
            res.send(rows);
        else
            console.log(err);
    })
});



//Delete Timesheet
app.delete('/tbl_fact_timesheet/:id', (req, res) => {
    mysqlConnection.query('DELETE FROM tbl_fact_timesheet WHERE ts_id = ?', [req.params.id], (err, rows, fields) => {
        if (!err)
            res.send('Deleted successfully.');
        else
            console.log(err);
    })
});


//Insert data in Timesheet table
app.post('/tbl_fact_timesheet', (req, res) => {
    let tsdata = req.body;

    var sql = "SET @ts_id = ?;SET @week_no = ?;SET @date = ?;SET @emp_name = ?;SET @project_name = ?;SET @task_name = ?;SET @hours = ?;SET @p_type = ?; \
    CALL TimeSheetAddOrEdit(@ts_id, @week_no, @date, @emp_name, @project_name, @task_name, @hours, @p_type);";
    mysqlConnection.query(sql, [tsdata.ts_id, tsdata.week_no, tsdata.date, tsdata.emp_name, tsdata.project_name, tsdata.task_name, tsdata.hours, tsdata.p_type], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Inserted data : '+ tsdata.ts_id);
            });
        else
            console.log(err);
    })
});


//Update data in Timesheet table
app.put('/tbl_fact_timesheet/:id', (req, res) => {
    let tsdata = req.body;

    var sql = "SET @ts_id = ?;SET @week_no = ?;SET @date = ?;SET @emp_name = ?;SET @project_name = ?;SET @task_name = ?;SET @hours = ?;SET @p_type = ?; \
    CALL TimeSheetAddOrEdit(@ts_id, @week_no, @date, @emp_name, @project_name, @task_name, @hours, @p_type);";
    mysqlConnection.query(sql, [tsdata.ts_id, tsdata.week_no, tsdata.date, tsdata.emp_name, tsdata.project_name, tsdata.task_name, tsdata.hours, tsdata.p_type], (err, rows, fields) => {
        if (!err)
            rows.forEach(element => {
                if(element.constructor == Array)
                res.send('Updated data : '+ tsdata.ts_id);
            });
        else
            console.log(err);
    })


});

app.get('/hoursOfEmployee/:emp_name', (req, res) => {

    mysqlConnection.query('SELECT sum(hours) as hours FROM tbl_fact_timesheet WHERE emp_name = ?',[req.params.emp_name], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
app.get('/hoursOfType/:p_type', (req, res) => {

    mysqlConnection.query('SELECT sum(hours) as hours FROM tbl_fact_timesheet WHERE p_type = ?',[req.params.p_type], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
app.get('/hoursOfProject/:project_name', (req, res) => {

    mysqlConnection.query('SELECT sum(hours) as hours FROM tbl_fact_timesheet WHERE project_name = ?',[req.params.project_name], (err, rows, fields) => {

        if (!err)

            res.send(rows);

        else

            console.log(err);

    })

});
