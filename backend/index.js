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
    password: 'vasantha@123',
    database: 'TIMESHEET',
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

// var valuesNestedArray  = [];

// for(var v in values ) {
//   valuesNestedArray.push([values[v]]);
// }

// var sql = "INSERT IGNORE INTO technologies (technologyname) values ?";
// connection.query(sql, [valuesNestedArray], function(err) {
//     if (err) throw err;   
// });

//Insert data in Timesheet table
app.post('/tbl_fact_timesheet', (req, res) => {

//var tsdata = new Map([req.body]);
 // var tsdata = [req.body];

  const items = req.body;

  mysqlConnection.query(
`INSERT INTO tbl_fact_timesheet(week_no, date, emp_name, project_name, task_name, hours, p_type) VALUES ?`,
[items.map(item => [item.week_no, item.date, item.emp_name, item.project_name, item.task_name, item.hours, item.p_type])],
    (error, results) => {}
);
// var query = `INSERT INTO tbl_fact_timesheet(week_no, date, emp_name, project_name, task_name, hours, p_type) VALUES ?`;
// var values = [['?','2000-03-02','?','?','?','6','?']];
// mysqlConnection.query(query, [tsdata], function(err){
//     if(err){ 
//         console.log(err)
//     }
// })

//var sql = `INSERT INTO contacts (f_name, l_name, email, message, created_at) VALUES ("${f_name}", "${l_name}", "${email}", "${message}", NOW())`;

//     var valuesNestedArray  = [];

//     for(var v in tsdata ) {
//       valuesNestedArray.push([tsdata[v]]);
//     }
//     var sql = "INSERT INTO tbl_fact_timesheet (ts_id, week_no, date, emp_name, project_name, task_name, hours, p_type) values((@ts_id), (@week_no), (@date), (@emp_name), (@project_name), (@task_name), (@hours), (@Sp_type))";
//    //var sql = `INSERT INTO tbl_fact_timesheet (ts_id, week_no, date, emp_name, project_name, task_name, hours, p_type) VALUES(("${ts_id}"), ("${week_no}"), ("${date}"), ("${emp_name}"), ("${project_name}"), ("${task_name}"), ("${hours}"), ("${p_type}"))`;

    //  var sql = "SET @ts_id = ?;SET @week_no = ?;SET @date = ?;SET @emp_name = ?;SET @project_name = ?;SET @task_name = ?;SET @hours = ?;SET @p_type = ?; \
    //  CALL TimeSheetAddOrEdit(@ts_id, @week_no, @date, @emp_name, @project_name, @task_name, @hours, @p_type);";
//    mysqlConnection.query(sql, [valuesNestedArray.ts_id, valuesNestedArray.week_no, valuesNestedArray.date, valuesNestedArray.emp_name, valuesNestedArray.project_name, valuesNestedArray.task_name, valuesNestedArray.hours, valuesNestedArray.p_type],function(err) {
//     if (err) throw err;   
      
//     })
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
