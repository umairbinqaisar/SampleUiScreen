import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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

const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});

export default function TableData(props) {
    let formattedDate = props.formattedDate;
    let timeSheet = props.timeSheet;
    let taskAssigned = props.taskAssigned;
    const [isEditable, setIsEditable] = useState(false);
    const [editableRow, setEditableRow] = useState(-1);
    const [value1, setValue1] = React.useState();
    const [value2, setValue2] = React.useState();
    const [value3, setValue3] = React.useState();
    const [value4, setValue4] = React.useState();
    const [value5, setValue5] = React.useState();
    const [value6, setValue6] = React.useState();
    const [value7, setValue7] = React.useState();
    //for column 1 edit
    const handleChange1 = (event) => {
        setValue1(event.target.value);
    };//for column 2 edit
    const handleChange2 = (event) => {
        setValue2(event.target.value);
    }; //for column 3 edit
    const handleChange3 = (event) => {
        setValue3(event.target.value);
    };//for column 4 edit
    const handleChange4 = (event) => {
        setValue4(event.target.value);
    };//for column 5 edit
    const handleChange5 = (event) => {
        setValue5(event.target.value);
    };//for column 6 edit
    const handleChange6 = (event) => {
        setValue6(event.target.value);
    };//for column 7 edit
    const handleChange7 = (event) => {
        setValue7(event.target.value);
    };

    //if state undefined then show API data
    const onSave = (index) => {
        timeSheet[index].t1 = value1 === undefined ? timeSheet[index].t1 : value1;
        timeSheet[index].t2 = value2 === undefined ? timeSheet[index].t2 : value2;
        timeSheet[index].t3 = value3 === undefined ? timeSheet[index].t3 : value3;
        timeSheet[index].t4 = value4 === undefined ? timeSheet[index].t4 : value4;
        timeSheet[index].t5 = value5 === undefined ? timeSheet[index].t5 : value5;
        timeSheet[index].t6 = value6 === undefined ? timeSheet[index].t6 : value6;
        timeSheet[index].t7 = value7 === undefined ? timeSheet[index].t7 : value7;
        setIsEditable(false);
    }

    const classes = useStyles();
    // for enabling editing
    const enableEditing = (editableRow) => {
        setEditableRow(editableRow);
        setIsEditable(true);
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

                                <StyledTableCell >{item}</StyledTableCell>
                            )
                        })}
                        <StyledTableCell>Event</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>



                    {timeSheet ? timeSheet.map((row, index) => {
                        return (
                            <>
                                {taskAssigned === row.task_assigned ?


                                    <StyledTableRow key={row.task_assigned}>
                                        <StyledTableCell scope="row">
                                            {row.task_assigned}
                                        </StyledTableCell>

                                        <StyledTableCell >{parseFloat(row.t1 === null ? 0 : row.t1) + parseFloat(row.t2 === null ? 0 : row.t2) + parseFloat(row.t3 === null ? 0 : row.t3) + parseFloat(row.t4 === null ? 0 : row.t4) + parseFloat(row.t5 === null ? 0 : row.t5) + parseFloat(row.t6 === null ? 0 : row.t6) + parseFloat(row.t7 === null ? 0 : row.t7)}</StyledTableCell>
                                        {(isEditable && index === editableRow) ?
                                            <StyledTableCell > <TextField
                                                id="outlined-number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                //  defaultValue={row.t1}
                                                value={value1 ? value1 : row.t1}
                                                onChange={(event) => handleChange1(event, row.t1)}
                                            /></StyledTableCell>
                                            : <StyledTableCell>{row.t1}</StyledTableCell>}

                                        {(isEditable && index === editableRow) ?
                                            <StyledTableCell > <TextField
                                                id="outlined-number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                // defaultValue={row.t2}
                                                value={value2 ? value2 : row.t2}
                                                onChange={handleChange2}
                                            /></StyledTableCell>
                                            : <StyledTableCell>{row.t2}</StyledTableCell>}

                                        {(isEditable && index === editableRow) ?
                                            <StyledTableCell > <TextField
                                                id="outlined-number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                // defaultValue={row.t3}
                                                value={value3 ? value3 : row.t3}
                                                onChange={handleChange3}
                                            /></StyledTableCell>
                                            : <StyledTableCell>{row.t3}</StyledTableCell>}

                                        {(isEditable && index === editableRow) ?
                                            <StyledTableCell > <TextField
                                                id="outlined-number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                // defaultValue={row.t4}
                                                value={value4 ? value4 : row.t4}
                                                onChange={handleChange4}
                                            /></StyledTableCell>
                                            : <StyledTableCell>{row.t4}</StyledTableCell>}

                                        {(isEditable && index === editableRow) ?
                                            <StyledTableCell > <TextField
                                                id="outlined-number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                //defaultValue={row.t5}
                                                value={value5 ? value5 : row.t5}
                                                onChange={handleChange5}
                                            /></StyledTableCell>
                                            : <StyledTableCell>{row.t5}</StyledTableCell>}

                                        {(isEditable && index === editableRow) ?
                                            <StyledTableCell > <TextField
                                                id="outlined-number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                //defaultValue={row.t6}
                                                value={value6 ? value6 : row.t6}
                                                onChange={handleChange6}
                                            /></StyledTableCell>
                                            : <StyledTableCell>{row.t6}</StyledTableCell>}

                                        {(isEditable && index === editableRow) ?
                                            <StyledTableCell > <TextField
                                                id="outlined-number"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                variant="outlined"
                                                // defaultValue={row.t7}
                                                value={value7 ? value7 : row.t7}
                                                onChange={handleChange7}
                                            /></StyledTableCell>
                                            : <StyledTableCell>{row.t7}</StyledTableCell>}
                                        {(isEditable && index === editableRow) ?
                                            <StyledTableCell onClick={() => onSave(editableRow)} display="inline-block" > <Button display="inline-block" variant="outlined" color="primary">
                                                Save
                                            </Button>
                                                <button onClick={() => setIsEditable(false)} style={{ marginTop: 7, marginLeft: 5, backgroundColor: 'white', color: 'red', height: 35, width: 60, borderRadius: 5 }}>
                                                    CANCEL
                                                </button></StyledTableCell>
                                            :
                                            <StyledTableCell ><Button onClick={() => enableEditing(index)} variant="outlined" color="primary"> Edit</Button></StyledTableCell>

                                        }

                                    </StyledTableRow>
                                    :
                                    null}
                            </>)
                    }
                    ) : null}

                </TableBody>
            </Table>
        </TableContainer>
    );
}