import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function TableData(props) {
    let attendance = props.attendance;
    let formattedDate = props.formattedDate;
    let timeSheet = props.timeSheet;
    let taskAssigned = props.taskAssigned;
    console.log('taskAssigned', taskAssigned)
    //   console.log('timeSheet',timeSheet)

    const classes = useStyles();
const handleTable=(value)=>{
    console.log(value)
}
    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell>Assigned Task</StyledTableCell>
                        <StyledTableCell>Total Hours</StyledTableCell>
                        {formattedDate.map((item) => {
                            console.log('item ', item)
                            return (

                                <StyledTableCell align="right">{item}</StyledTableCell>
                            )
                        })}

                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* {timeSheet.map(row => {
                        return (
                            <>
                            {row.task.map(col => (
                                <StyledTableRow key={col.task_assigned}>
                                    <StyledTableCell component="th" scope="row">
                                        {col.task_assigned}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{col.t1}</StyledTableCell>
                                    <StyledTableCell align="right">{col.t2}</StyledTableCell>
                                    <StyledTableCell align="right">{col.t3}</StyledTableCell>
                                    <StyledTableCell align="right">{col.t4}</StyledTableCell>
                                    <StyledTableCell align="right">{col.t5}</StyledTableCell>
                                    <StyledTableCell align="right">{col.t6}</StyledTableCell>
                                    <StyledTableCell align="right">{col.t7}</StyledTableCell>
                                </StyledTableRow>
                            )
                          )}
                            </>
                            )}
                           
                     )} */}
                     {timeSheet? timeSheet.map((row,i) => {
                         console.log('row id', row);
                         console.log('taskAssigned', taskAssigned);

                        return (
                            <>
                            {taskAssigned === row.task_assigned ?
                            
                            
                                <StyledTableRow key={row.task_assigned}>
                                    <StyledTableCell scope="row">
                                        {row.task_assigned}
                                    </StyledTableCell>
                                    
                                    <StyledTableCell align="right">{row.t1+row.t2+row.t3+row.t4+row.t5+row.t6+row.t7}</StyledTableCell>
                                    <StyledTableCell align="right">{row.t1}</StyledTableCell>
                                    <StyledTableCell align="right">{row.t2}</StyledTableCell>
                                    <StyledTableCell align="right">{row.t3}</StyledTableCell>
                                    <StyledTableCell align="right">{row.t4}</StyledTableCell>
                                    <StyledTableCell align="right">{row.t5}</StyledTableCell>
                                    <StyledTableCell align="right">{row.t6}</StyledTableCell>
                                    <StyledTableCell align="right">{row.t7}</StyledTableCell>
                                    <StyledTableCell align="right"><Button onClick={handleTable(row)} variant="outlined" color="primary"> Edit</Button></StyledTableCell>

                                </StyledTableRow>
                             :
                          null}
                          </>  )}
                     ):null}

                            </TableBody>
            </Table>
        </TableContainer>
            );
}