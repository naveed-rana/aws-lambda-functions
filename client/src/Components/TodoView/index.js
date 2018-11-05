import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { updateToDo } from '../Redux/actions/UpdateToDoActions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { styles } from './style';
import './style.css';
import SideBar from '../SideBar';
import Manu from '../todoList/manu';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider'

function searchingFor(searchText) {
    return function (x) {
        return x.title.toLowerCase().includes(searchText.toLowerCase()) || !searchText;
    }
}

class Todoview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            done: false,
            searchText: '',
        }        
        this.searchHandler = this.searchHandler.bind(this);
    }

    
    searchHandler(event) {
        this.setState({ searchText: event.target.value });
    }


    handleChangeexpand = id => (event, expanded) => {
         
        if (event.target.classList.contains("some")) {

            return null
        } else {

            this.setState({
                expanded: expanded ? id
                    : false
            })
        }
    }

    toggleCheck = (id, title, description,done,time) => {
    
        const record = {
            id: id,
            title: title,
            description: description,
            done: !done,
            createat:time
        }

        //Call Update-ToDo action
        this.props.updateToDo(record);
    }

    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
        const todos = this.props.data;
        return (
            <Fragment>
                {/* Desktop Design Image */}
                <Hidden only={['sm', 'xs']}>
                    <div className={classes.root}>
                        <Grid container>
                            <Grid item sm={3}>
                                <SideBar searchHandler={this.searchHandler} />
                            </Grid>
                            <Grid item xs={12} sm={12} md={9} >
                                <Grid item xs={12} sm={12} md={12} >
                                    <div className="addHead-bg">
                                        <Typography variant="display3" gutterBottom className="title">My Day</Typography>
                                    </div>
                                </Grid>

                                <Grid item xs={12}>
                                    {todos.length > 0 ?
                                        todos.filter(searchingFor(this.state.searchText)).map((item, index) => {
                                            return (

                                                <ExpansionPanel expanded={expanded === index}
                                                    onChange={this.handleChangeexpand(index)}
                                                    className={classes.todoItem} key={index}>
                                                    <ExpansionPanelSummary className={classes.expansionSummary}>

                                                        <Grid container className={classes.todoPanel}>
                                                            <Grid item md={1} className={classes.checkboxGrid}>
                                                                <div className="round">
                                                                    <input type="checkbox" id={item.id} checked={item.done} onChange={() =>  this.toggleCheck(item.id, item.title, item.description,item.done,item.createat) } />
                                                                    <label htmlFor={item.id}></label>
                                                                </div>

                                                            </Grid>
                                                            <Grid item md={10} align="left">

                                                                <Typography className={classes.description}>{item.title}</Typography>

                                                            </Grid>
                                                            {/* className={classes.manus} */}
                                                            <Grid className="some" item md={1} >
                                                                <div className="some">
                                                                    <Manu className="some" keys={index} row={item} />
                                                                </div>
                                                            </Grid>
                                                        </Grid>

                                                    </ExpansionPanelSummary>
                                                    <Divider />
                                                    <ExpansionPanelDetails>
                                                        <Grid container>
                                                            <Grid item xs={12}>

                                                                <Typography variant="caption" className={classes.description}>
                                                                    {item.description}
                                                                </Typography>
                                                            </Grid>
                                                            <Grid item xs={10} md={11}>

                                                                <Typography variant="caption" align="right">
                                                                    {item.createat}
                                                                </Typography>
                                                            </Grid>
                                                        </Grid>
                                                    </ExpansionPanelDetails>
                                                </ExpansionPanel>

                                            )
                                        })
                                        : <div><center><h2 style={{ color: 'lightgray' }}>Empty task list</h2></center></div>
                                    }

                                </Grid>

                            </Grid>
                        </Grid>

                    </div>

                </Hidden>
            </Fragment>
        );
    }

}

Todoview.propTypes = {
    classes: PropTypes.object.isRequired,
};

function mapStateToProps(data) {
    return {
        data: data.TodoApp.todoList
    }
}


export default connect(mapStateToProps, { updateToDo })(withStyles(styles)(Todoview));