/**
Table Component
**/
import React from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import price from '../assets/images/Price.png'
import calendar from '../assets/images/calendar.png'
import file from '../assets/images/file.png'
import stastics from '../assets/images/statistics.png';


const styles = theme => ({
    table: {
        minWidth: 700,
    },
    inlineImage: {
        height: 18,
        width: 18,
        marginRight: '4%'
    },
    campaign: {
        marginRight: '4%',
        width: '14%',
        height: '41%'
    }
});


const MuiTable = (props) => {

    const {
        classes
    } = props;

    //Function to pass the props for opening a calendar on click of the image
    const handleCalendarOpen = (index) => {
        props.onCalendarOpen(index);
    }

    //Function to calculate the difference in the number of days from today to the date created on
    const handleDateDiff = (createdDate) => {
        const d = new Date(createdDate);
        const a = new Date();
        const diff = a.getTime() - d.getTime();
        const days = Math.abs(Math.ceil((((diff / 1000) / 60) / 60) / 24))
        let str = "";
        if (diff > 0) {
            str += days + " " + "days ago";
        } else if (days == 0) {
            str += "Live Now"
        } else {
            str += days + " " + "days ahead";
        }
        return str;
    }

    //Function to convert the date into the specified format
    const manageDate = (createdDate) => {
        let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const d = new Date(createdDate);
        let str = "";
        str += months[d.getMonth()] + " " + d.getDate() + "," + d.getFullYear();
        return str;
    }

    //Function that handles the toggling of modal
    const handleModalOpen = (index) => {
        props.onModalOpen(index);
    }
    return ( <
        TableContainer component = {
            Paper
        } >
        <
        Table className = {
            classes.table
        }
        aria-label = "customized table" >
        <
        TableHead style = {
            {
                background: '#C8C8C8'
            }
        } >
        <
        TableRow >
        <
        TableCell > Date < /TableCell> <
        TableCell > Campaign < /TableCell> <
        TableCell > View < /TableCell> <
        TableCell > Actions < /TableCell> <
        TableCell > < /TableCell> <
        TableCell > < /TableCell>

        <
        /TableRow> < /
        TableHead > <
        TableBody > {
            props.rows.map((row, index) => ( <
                TableRow key = {
                    row.createdOn
                } >
                <
                TableCell component = "th"
                scope = "row" > {
                    manageDate(row.createdOn)
                } <
                Typography style = {
                    {
                        fontStyle: 'italic',
                        color: '#B0B0B0'
                    }
                } > {
                    handleDateDiff(row.createdOn)
                } < /Typography> < /
                TableCell > <
                TableCell style = {
                    {
                        display: 'flex'
                    }
                } >
                <
                img src =
                    {require('../assets/images/'+row.image_url)}


                className = {
                    classes.campaign
                }
                /> <
                span > {
                    row.name
                } <
                Typography > {
                    row.region
                } < /Typography> < /
                span > <
                /TableCell>

                <
                TableCell >
                <
                img className = {
                    classes.inlineImage
                }
                src = {
                    price
                }
                onClick = {
                    () => handleModalOpen(index)
                }
                />
                View Pricing <
                /TableCell> <
                TableCell >
                <
                img className = {
                    classes.inlineImage
                }
                src = {
                    file
                }
                />
                CSV <
                /TableCell> <
                TableCell >
                <
                img className = {
                    classes.inlineImage
                }
                src = {
                    stastics
                }
                />
                Report <
                /TableCell> <
                TableCell >
                <
                img className = {
                    classes.inlineImage
                }
                onClick = {
                    () => handleCalendarOpen(index)
                }
                src = {
                    calendar
                }
                />

                Schedule again <
                /TableCell> < /
                TableRow >
            ))
        } <
        /TableBody> < /
        Table > <
        /TableContainer>

    )
}

export default withStyles(styles, {
    withTheme: true
})(MuiTable);