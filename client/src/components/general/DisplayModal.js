// package imports
import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Modal } from '@material-ui/core';

// inclusions
import WorkOrderPreview from '../reports/PDF/WorkOrderPreview';

const useStyles = makeStyles((theme) => ({
    root: {
        position: 'absolute',
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        height: '80vh',
        width: '60vw',
        top: '50vh',
        left: '50vw',
        transform: 'translate(-50%,-50%)',
        outline: 0,
        borderRadius: 4,
    },
}));

export default function DisplayModal(props) {
    const classes = useStyles();

    const [previewReady, setPreviewReady] = useState(false);

    const handleClose = () => {
        props.setModal({open: false, data: {}});
    };

    return (
    <Modal
        open={props.open}
        onClose={handleClose}
    >
        <div className={classes.root}>
            <WorkOrderPreview
                client={props.data.client}
                asset={props.data.asset}
                component={props.data.component}
                expected_completion={props.data.expected_completion}
                actual_completion={props.data.actual_completion}
                scheduled={props.data.scheduled}
                description={props.data.description}
                procedure={props.data.procedure}
                previewReady={previewReady}
                setPreviewReady={setPreviewReady}
            />
        </div>
    </Modal>
    );
}