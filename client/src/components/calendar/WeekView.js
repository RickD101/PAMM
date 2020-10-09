// package imports
import React, { useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { makeStyles } from '@material-ui/core/styles';

// inclusions
import readCRUD from '../../api/crud/readCRUD';

const useStyles = makeStyles((theme) => ({
    root: {
        whiteSpace: 'unset!important',
        padding: 5,
        backgroundColor: '#3f51b5',
        border: 'none'
    },
    clientName: {
        fontWeight: 'bold',
        fontSize: '1.1rem',
        marginBottom: '0.2rem'
    },
    ownerName: {
        fontSize: '1rem',
        marginBottom: '0.4rem'
    },
    description: {
        fontStyle: 'italic'
    }
}));

export default function WeekView(props) {
    const classes = useStyles();

    const [events, setEvents] = useState([]);

    const renderEventContent= info => {
        return (
            <>
                <div className={classes.clientName}>{info.event._def.extendedProps.client}</div>
                <div className={classes.ownerName}>{info.event._def.extendedProps.owner}</div>
                <div className={classes.description}>{info.event._def.title}</div>
            </>
        )
    }

    const renderHeader = head => {
        let day = ''
        if (head.date.getDay() === 0) {
            day = 'Sun'
        }
        else if (head.date.getDay() === 1) {
            day = 'Mon'
        }
        else if (head.date.getDay() === 2) {
            day = 'Tues'
        }
        else if (head.date.getDay() === 3) {
            day = 'Wed'
        }
        else if (head.date.getDay() === 4) {
            day = 'Thur'
        }
        else if (head.date.getDay() === 5) {
            day = 'Fri'
        }
        else if (head.date.getDay() === 6) {
            day = 'Sat'
        }

        return (
        <>{day} {head.date.getDate()}/{head.date.getMonth()+1}</>
        )
    }

    useEffect(()=>{
        readCRUD({model: "WorkOrder"}).then((response)=>{
            if (response.data) {
                const eventsData = response.data.map(entry => {
                    if (entry.active) {
                        let client = '';
                        let owner = '';
                        if (entry.ownerModel === "Asset") {
                            client = entry.owner.client.name;
                            owner = entry.owner.name;
                        }
                        else if (entry.ownerModel === "Component") {
                            client = entry.owner.asset.client.name;
                            owner = `${entry.owner.asset.name} → ${entry.owner.name}`
                        }
                        return {
                            title: entry.description,
                            client: client,
                            owner: owner,
                            date: entry.expected_completion,
                            allDay: true
                        }
                    }
                    else {
                        return {
                            display: 'none'
                        };
                    }
                });
                setEvents(eventsData);
            }
        }).catch((err)=>{
            alert(err);
        })
    }, []);

    return (
        <FullCalendar
            plugins={[ dayGridPlugin ]}
            initialView="dayGridWeek"
            height={570}
            events={events}
            eventClassNames={classes.root}
            eventContent={renderEventContent}
            views={{
                dayGrid: {
                    dayHeaderContent: renderHeader
                }
            }}
        />
    )
}