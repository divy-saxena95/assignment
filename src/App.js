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
        index: 0,
        image_url: '',
        region: '',
        name: '',
        price: '',
        modalContent: {},
        liveData:[],
        pastData:[],
        upcomingData:[],
        modalIndex:''

    }

    //Function that handles the selection of tab
    handleChange = (event, newValue) => {
        this.setState({
            value: newValue,
            openCalendar:false
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
    handleModalOpen = (index) => {
        let obj = {};
        if(this.state.value==0)
       obj=this.state.upcomingData[index]
       else if(this.state.value==1)
       obj=this.state.liveData[index]
       else if(this.state.value==2)
       obj=this.state.pastData[index]
        this.setState({
            openModal: true,
            modalContent: obj
        })
        console.log(obj)
    }

    handleModalClose=()=>{
    this.setState({
                openModal: false
            })
    }
     componentWillMount(){
     this.handleDataDistribution();
     }

//Function to handle distribution of data according to dates
handleDataDistribution=()=>{
const past=[]
const live=[]
const upcoming=[]
for(let i in Data.data)
{
        const d = new Date(Data.data[i].createdOn);
		const a = new Date();
		const diff = a.getTime() - d.getTime();
		const days = Math.abs(Math.ceil((((diff / 1000) / 60) / 60) / 24))
		if (diff > 0) {
		past.push(Data.data[i]);
} else if (days == 0) {
			live.push(Data.data[i]);
		} else
		{			upcoming.push(Data.data[i]);

		}

}
this.setState({
liveData:live,
upcomingData:upcoming,
pastData:past
})
}

//Function handling the change of date selected from calendar
    changeDate = (selectedDate) => {
        this.setState({
            date: selectedDate,
            openCalendar:!this.state.openCalendar
        })
        const i=this.state.index;
        if(this.state.value==0)
        this.state.upcomingData[i].createdOn=selectedDate
       else if(this.state.value==1)
       this.state.liveData[i].createdOn=selectedDate
        else if(this.state.value==2)
        this.state.pastData[i].createdOn=selectedDate
        this.handleDataDistribution();
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
                this.state.upcomingData
            }
            onCalendarOpen = {
                this.handleCalendarOpen
            }
            openCalendar = {
                this.state.openCalendar
            }
             onModalOpen = {
                    this.handleModalOpen
                            }
               />
             <
            Table rows = {
                this.state.liveData
            }
             onCalendarOpen = {
                this.handleCalendarOpen
                        }
             openCalendar = {
                 this.state.openCalendar
                        }
             onModalOpen = {
                this.handleModalOpen
                        }

            />
            <
            Table rows = {
                this.state.pastData
            }
             onCalendarOpen = {
               this.handleCalendarOpen
                        }
             openCalendar = {
                this.state.openCalendar
                        }
             onModalOpen = {
               this.handleModalOpen
                        }

            />
            <
            /Tab>

            {
                this.state.openCalendar ?
                    <
                    DatePicker
                    autoOk
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
            Modal onModalOpen = {
                this.handleModalOpen
                                }
                onModalClose={this.handleModalClose}
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