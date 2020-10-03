// package imports
import React from 'react';
import Button from '@material-ui/core/Button';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

export default function ManageButtonNonLink(props) {
    return (
        <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={props.onClick}
            endIcon={<SubdirectoryArrowRightIcon />}
        >
            {props.text || 'Manage'}
        </Button>
    )
}