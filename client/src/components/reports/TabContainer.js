import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import ProcedureTab from './ProcedureTab';
import LabourTab from './LabourTab';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={0}>
                    {children}
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
}));

export default function TabContainer(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper className={classes.root}>
                <Tabs 
                    value={value} 
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Labour" {...a11yProps(0)} />
                    <Tab label="Materials" {...a11yProps(1)} />
                    <Tab label="Procedure" {...a11yProps(2)} />
                </Tabs>
            <TabPanel value={value} index={0}>
                <LabourTab labour={props.labour} setLabour={props.setLabour} workerData={props.workerData}/> 
            </TabPanel>
            <TabPanel value={value} index={1}>
                Materials
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ProcedureTab procedure={props.procedure} setProcedure={props.setProcedure}/>
            </TabPanel>
        </Paper>
    );
}