// package imports
import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import SubdirectoryArrowRightIcon from '@material-ui/icons/SubdirectoryArrowRight';

export default function ManageButton(props) {
    return (
        <Link to={props.linkTo} className={props.passClass}>
            <Button
                variant="contained"
                color="primary"
                endIcon={<SubdirectoryArrowRightIcon />}
            >
                Manage
            </Button>
        </Link>
    )
}