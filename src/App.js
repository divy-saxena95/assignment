import React, {
    Component
} from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header'
import Typography from '@material-ui/core/Typography';
import Tab from './components/Tab';
import {
    MuiThemeProvider
} from '@material-ui/core/styles';
import theme from './utils/Theme';
import Table from './components/Table';
import Data from './mockdata.json';
import {
    DatePicker
} from '@material-ui/pickers';
import {
    KeyboardDatePicker,
    MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import Modal from './components/Modal.js'
import {
    withStyles,
    makeStyles
} from '@material-ui/core/styles';




const tabHeadings = ['Upcoming Campaigns', 'Live Campaigns', 'Past Campaigns']
const styles = theme => ({
    root: {
        display: 'flex',
        width: '76%',
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginLeft: '12%'
    },
    heading: {
        float: 'left',
        fontSize: 25,
        fontWeight: 'bold',
        fontFamily: 'unset',
        color: '#1D2951'
    }

});


class App extends Component {
    state = {
        value: 0,
        openCalendar: false,
        openModal: false,
        createdOn: '',
        date: '',
        index: '',
        image_url: '',
        region: '',
        name: '',
        price: '',
        modalContent: {}

    }

    //Function that handles the selection of tab
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue
        })
    }

    //Function handling the opening of calendar
    handleCalendarOpen = (index) => {
        this.setState({
            openCalendar: !this.state.openCalendar,
            index: index
        })

    }

//Function handling the toggling of pricing modal
    handleModalToggle = (index) => {
        //this.abc(index);
        let obj = {};
        obj.image_url = this.state.image_url;
        obj.region = this.state.region;
        obj.name = this.state.name;
        obj.price = this.state.price;
        console.log("object is", obj)

        this.setState({
            openModal: !this.state.openModal,
            modalContent: obj
        })
    }



//Function handling the change of date selected from calendar
    changeDate = (selectedDate) => {
        this.setState({
            date: selectedDate,
            openCalendar:!this.state.openCalendar
        })
        Data.data[this.state.index].createdOn = selectedDate;
    }
    render() {

        const {
            classes
        } = this.props;
        return ( <
            MuiPickersUtilsProvider utils = {
                DateFnsUtils
            } >
            <
            MuiThemeProvider theme = {
                theme
            } >
            <
            div className = "App" >
            <
            Header / >
            <
            div className = {
                classes.root
            } >
            <
            span className = {
                classes.heading
            } > Manage Campaigns < /span>
            <
            Tab onChange = {
                this.handleChange
            }
            value = {
                this.state.value
            }
            tabHeadings = {
                tabHeadings
            } >

            <
            Table rows = {
                Data.data
            }
            onCalendarOpen = {
                this.handleCalendarOpen
            }
            openCalendar = {
                this.state.openCalendar
            }
            onModalToggle = {
                this.handleModalToggle
            }
            />
             <
            Table rows = {
                Data.liveData
            }
            />
            <
            Table rows = {
                Data.pastData
            }
            />
            <
            /Tab>

            {
                this.state.openCalendar ?
                    <
                    DatePicker
                orientation = "landscape"
                variant = "static"
                openTo = "date"
                value = {
                    this.state.date
                }
                onChange = {
                    this.changeDate
                }
                />:null

            } <
            /div> <
            Modal onModalToggle = {
                this.handleModalToggle
            }
            onModalClose = {
                this.handleModalClose
            }
            modalContent = {
                this.state.modalContent
            }
            openModal = {
                this.state.openModal
            }
            />


            <
            /div> <
            /MuiThemeProvider> <
            /MuiPickersUtilsProvider>
        );
    }

}

export default withStyles(styles, {
    withTheme: true
})(App);