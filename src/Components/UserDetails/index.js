import React, { useState, useEffect } from 'react';
import Moment from 'moment';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import TableData from '../Table';

const API_HOST = "http://localhost:3004";
const INVENTORY_API_URL = `${API_HOST}/user_details`;
const INVENTORY_API_URL_UPDATE = `${API_HOST}/user_details/?_embed=attendance`;


const useStyles = makeStyles((theme)=>({
  table: {
    minWidth: 650,
  },
  root: {
    flexGrow: 1,
    marginTop:20
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
    maxWidth: 300,
  },
}));

function UserDetails() {
    const classes = useStyles();
    const [data, setData] = useState([]);
    const [attendance, setAttendance] = useState([]);
    const [userCreds, setUserCreds] = useState({});
    const [date, setDate] = useState('');
    const [taskAssigned, setTaskAssigned] = useState(-1);
    const [isVisible, setIsVisible] = useState(false);
    const [formattedDate, setFormattedDate] = useState([]);
    const [timeSheet, setTimeSheet]=useState([]);
    const [assignment, setAssignment] = useState([]);

    const fetchInventory = () => {
        fetch(`${INVENTORY_API_URL}`)
            .then(res => res.json())
            .then(json => {
                console.log('data ',json);
                setData(json);
                setAttendance(json.attendance)
                setUserCreds(json.user_credentials)
                setAssignment(json.project)
               for(var i=0; i<json.time_sheets.length; i++){
                setTimeSheet(json.time_sheets[i].task)
      
              }
            });
    }
    useEffect(() => {
        fetchInventory();

    }, []);
    
    const [inEditMode, setInEditMode] = useState({
        status: false,
        rowKey: null
    });

    const [workHours, setworkHours] = useState(null);

    /**
     *
     * @param id - The id of the product
     * @param currentworkHours- The current unit price of the product
     */
    const onEdit = ({ id, currentworkHours }) => {
        setInEditMode({
            status: true,
            rowKey: id
        })
        setworkHours(currentworkHours);
    }

    /**
     *
     * @param id
     * @param newworkHours
     */
    const updateInventory = ({ id, newworkHours }) => {
      //  console.log(id, 'id')
        fetch(`${INVENTORY_API_URL_UPDATE}/${id}`, {
            method: "PATCH",
            body: JSON.stringify({
                work_hours: newworkHours
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(response => response.json())
            .then(json => {
               // console.log('updated data', json)
                // reset inEditMode and unit price state values
                onCancel();

                // fetch the updated data
                fetchInventory();
            })
    }

    /**
     *
     * @param id -The id of the product
     * @param newworkHours- The new unit price of the product
     */
    const onSave = ({ id, newworkHours }) => {
        updateInventory({ id, newworkHours });
    }

    const onCancel = () => {
        // reset the inEditMode state value
        setInEditMode({
            status: false,
            rowKey: null
        })
        // reset the unit price state value
        setworkHours(null);
    }

    const displayTable = () => {
       // console.log('date', date);
        let newDate = [];
        let newDate1 = [];
        let j = 3;
         if(date && (taskAssigned && taskAssigned!=-1) ){
        for (var i = 0; i <= 3; i++) {
            var d = new Date(date);
            var yesterday = d.setDate(d.getDate() - i);
            const format2 = "YYYY-MM-DD";
            var dateTime2 = Moment(yesterday).format(format2);
           // console.log('yesterday', dateTime2);
            newDate[j - i] = dateTime2;
          //  console.log('new Date', newDate);
            setFormattedDate([...newDate]);
            }

        for (var i = 0; i < 3; i++) {
            var d = new Date(date);
            var dayAfter = d.setDate(d.getDate() + i + 1);
            const formatNew = "YYYY-MM-DD";
            var dateTime = Moment(dayAfter).format(formatNew);
          //  console.log('dateAfter', dateTime);
            newDate1[i] = dateTime;
          //  console.log('new Date forward', newDate1);
            if(i===2){
                setFormattedDate(prevState=>[...prevState,...newDate1]);

            }

        }
       // orgDate = [newDate + ',' + newDate1];
       // console.log('orgDate :', orgDate)
           
        
        
//console.log('formattedDate', formattedDate);
        setIsVisible(true);

           }else{
               return
           }
    }
  
    const assignedTask = (event) => {
      console.log(event.target.value);
        setTaskAssigned(event.target.value);
      };
      console.log('timesheet', timeSheet);
    return (

        <div className="container">
            <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Employee Name</TableCell>
            <TableCell align="right">ID #</TableCell>
            <TableCell align="right">Work Type</TableCell>

            <TableCell align="right">Employee Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
         
            <TableRow key={userCreds.full_name}>
              <TableCell component="th" scope="row">
                {userCreds.full_name}
              </TableCell>
              <TableCell align="right">{userCreds.user_id}</TableCell>
              <TableCell align="right">{userCreds.work_type}</TableCell>
              <TableCell align="right">{userCreds.employee_type}</TableCell>
            </TableRow>
  
        </TableBody>
      </Table>
    </TableContainer>


    <div className={classes.root}>
   
      <Grid container spacing={3}>
      
        <Grid item xs={12}>
          <Paper className={classes.paper}>
          <label style={{paddingRight:10}} >Date</label>
    <input name="date" type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)} />
          <label style={{paddingRight:10, paddingLeft:50}}>work type</label>
          <Select
          native
          value={taskAssigned ||''}
          onChange={assignedTask}
          input={<Input />}
          renderValue={(selected) => selected.join('')}   
        >
           <option value="none" selected  > 
            </option> 
          {assignment.map((item) => (
         
            <option key={item.task_name} value={item.task_name}>
              {item.task_name}
            </option>
            
          ))}
        </Select>
          <Box style={{marginLeft:50}}color="text.primary" clone>
        <Button  onClick={() => displayTable()}>display</Button>
        </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
        
           

                
           <div style={{marginTop :20}}>
            {isVisible ?
                // <table>
                //     <thead>
                //         <tr>
                //             <th>Task Assigned</th>
                //            {formattedDate.map((item)=>{
                //                console.log('item ',item)
                //                return(
                              
                //              <th style={{paddingLeft:10,}}>{item}</th>
                //                )
                //            })} 
                            
                            
                //         </tr>
                //     </thead>
                //     <tbody>
                //         { attendance.map((item,index) => {
                //          //   console.log('API date',item.date)
                //            // console.log('formattedDate[index]',formattedDate[index])
                //             return(
                //                 <tr key={item.id}>
                //                     <td>{item.task_assigned}</td>
                //                     <td>
                //                         {
                //                             inEditMode.status && inEditMode.rowKey === item.id ? (
                //                                 <input value={workHours}
                //                                     onChange={(event) => setworkHours(event.target.value)}
                //                                 />
                //                             ) : ( 
                //                                 <>
                //                                {
                                                   
                                                 
                                                   
                //                                     item.date ===formattedDate[item] ?
                //                                     item.work_hours
                //                                     :null
                                                  
                                                   
                                                
                //                                }
                //                                </>
                //                             )
                //                         }
                //                     </td>
                //                     <td>
                //                         {
                //                             inEditMode.status && inEditMode.rowKey === item.id ? (
                //                                 <React.Fragment>
                //                                     <button
                //                                         className={"btn-success"}
                //                                         onClick={() => onSave({ id: item.id, newworkHours: workHours })}
                //                                     >
                //                                         Save
                //                                     </button>

                //                                     <button
                //                                         className={"btn-secondary"}
                //                                         style={{ marginLeft: 8 }}
                //                                         onClick={() => onCancel()}
                //                                     >
                //                                         Cancel
                //                                     </button>
                //                                 </React.Fragment>
                //                             ) : (
                //                                 <button
                //                                     className={"btn-primary"}
                //                                     onClick={() => onEdit({ id: item.id, currentworkHours: item.workHours })}
                //                                 >
                //                                     Edit
                //                                 </button>
                //                             )
                //                         }
                //                     </td>
                //                 </tr>
                //          ) })
                //         }
                //     </tbody>
                // </table>
                <TableData formattedDate={formattedDate} attendance={attendance} taskAssigned={taskAssigned} timeSheet={timeSheet}/>
                : null}
                </div>
        </div>

    );

}
export default UserDetails;


