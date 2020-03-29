/**
Modal Component
**/
import React from 'react';
import {
    withStyles
} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    campaign: {
        marginRight: '4%',
        width: '50%',
        height: '70%'
    },
    content: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: '10%',
        marginLeft: '3%'
    },
    pricing: {
        fontSize: 28,
        color: '#1D2951'
    }

});


const MuiModal = (props) => {
    const {
        classes
    } = props;

    const handleToggle = () => {
        props.onModalToggle();
    };
    return ( <
        Dialog onClose = {
            handleToggle
        }
        aria-labelledby = "customized-dialog-title"
        open = {
            props.openModal
        } >
        <
        MuiDialogContent className = {
            classes.content
        } >
        <
        div style = {
            {
                display: 'flex'
            }
        } >
        <
        img src = {
            require('../assets/images/Auto_chess.png')
        }
        alt = "image"
        className = {
            classes.campaign
        }
        /> <
        span >
        Auto Chess <
        Typography > US < /Typography> <
        /span> <
        /div> <
        Typography className = {
            classes.pricing
        } > Pricing < /Typography> <
        div >
        <
        span style = {
            {
                float: 'left',
                lineHeight: 2
            }
        } > 1 Week - 1 Month < /span> <
        span style = {
            {
                float: 'right',
                lineHeight: 2
            }
        } > $100 < /span> <
        /div>

        <
        div >
        <
        span style = {
            {
                float: 'left',
                lineHeight: 2
            }
        } > 6 Month < /span> <
        span style = {
            {
                float: 'right',
                lineHeight: 2
            }
        } > $100 < /span> <
        /div>

        <
        div >
        <
        span style = {
            {
                float: 'left',
                lineHeight: 2
            }
        } > 1 Year < /span> <
        span style = {
            {
                float: 'right',
                lineHeight: 2
            }
        } > $100 < /span> <
        /div>
       <
        /MuiDialogContent> <
        MuiDialogActions style = {
            {
                flexDirection: 'column'
            }
        } >
        <
        Button autoFocus onClick = {
            handleToggle
        }
        variant = "outlined" >
        Close <
        /Button> <
        /MuiDialogActions> <
        /Dialog>

    )
}

export default withStyles(styles, {
    withTheme: true
})(MuiModal);