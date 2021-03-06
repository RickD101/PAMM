// package imports
import React, { useEffect, useState } from 'react';
import { Page, Text, View, Document, StyleSheet, PDFViewer, Image, Font } from '@react-pdf/renderer';
import { makeStyles } from '@material-ui/core/styles';

// inclusions
import getLoginStatus from '../../../api/user/getLoginStatus';
import checkImg from '../../../assets/images/check.png';
import SourceSerifPro from '../../../assets/fonts/SourceSerifPro-Black.ttf';
import TimesBold from '../../../assets/fonts/PTSerif-Bold.ttf';

// Create styles
const styles = StyleSheet.create({
    page: {
        padding: 32,
        paddingBottom: 32
    },
    section: {
        textAlign: 'left',
        margin: 2,
        padding: 3,
        border: '2 solid black'
    },
    header: {
        fontSize: 10,
        marginBottom: 2,
        textAlign: 'center',
        color: 'grey',
    },
    pageNumber: {
        position: 'absolute',
        fontSize: 10,
        bottom: 16,
        left: 0,
        right: 0,
        textAlign: 'center',
        color: 'grey',
    },
    title: {
        fontSize: 18,
        paddingTop: 4,
        textAlign: 'center',
        fontFamily: 'SourceSerifPro',
        border: '1 solid black'
    },
    info: {
        flexDirection: 'row'
    },
    infoLeft: {
        flexGrow: 1.5
    },
    infoRight: {
        flexGrow: 0.5
    },
    field: {
        border: '1 solid black',
        fontFamily: 'TimesBold',
        fontSize: 10,
        flexDirection: 'row',
        margin: 1
    },
    fieldKeyRight: {
        padding: '0 6',
        borderRight: '1 solid black',
        width: 110,
    },
    fieldKeyLeft: {
        paddingLeft: 6,
        borderRight: '1 solid black',
        width: 85,
    },
    fieldVal: {
        paddingLeft: 6,
    },
    sectionTitle: {
        border: '1 solid black',
        fontSize: 10,
        fontFamily: 'TimesBold',
        paddingLeft: 6
    },
    blankLine: {
        height: 16,
        borderRight: '1 solid black',
        borderBottom: '1 solid black',
        borderLeft: '1 solid black',
    },
    blankLineFirst: {
        height: 16,
        border: '1 solid black',
    },
    procText: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
        marginTop: 6,
        padding: '0 6',
    },
    box: {
        height: 8,
        width: 8,
    },
    checkboxes: {
        fontFamily: 'Times-Roman',
        fontSize: 12,
        padding: '0 10',
    }
});

Font.register({
    family: 'SourceSerifPro',
    src: SourceSerifPro
});

Font.register({
    family: 'TimesBold',
    src: TimesBold
});

const useStyles = makeStyles((theme) => ({
    preview: {
        height: '100%',
        width: '100%',
        boxSizing: 'border-box',
        borderRadius: 4
    },
    loadingText: {
        textAlign: 'center',
        paddingTop: 32,
        fontFamily: 'Times, serif',
        fontSize: '1.2rem',
        fontWeight: 'bold'
    }
}));

// Create Document Component
const WorkOrderPreview = React.memo((props) => {
    const classes = useStyles();

    let date = new Date();
    date = date.toString();
    const [user, setUser] = useState('');
    const [procedure, setProcedure] = useState([]);

    useEffect(()=>{
        getLoginStatus().then((response) => {
            setUser(response.username);
        }).catch((err)=>{
            alert(err);
        });
    }, []);

    useEffect(()=>{
        setTimeout(()=>{
            const renderProcedure = []
            if (props.procedure) {
                props.procedure.map((step, index) => {
                    const stepArray = step.split('|');
                    renderProcedure[index] = {
                        text: stepArray[0],
                        check: stepArray[1] === 'y' ? true : false,
                        lines: [...Array(parseInt(stepArray[2])).keys()]
                    }
                    return null;
                })
            }
            setProcedure(renderProcedure);
            props.setPreviewReady(true);
        }, 1000);
    }, [props]);

    const renderStep = (step) => {
        return (
            <View wrap={false}>
                <Text style={styles.procText}>
                    {step.text}
                </Text>
                {step.check &&
                <Text style={styles.checkboxes}>
                    <Image style={styles.box} src={checkImg}/> yes   <Image style={styles.box} src={checkImg}/> no   <Image style={styles.box} src={checkImg}/> N/A
                </Text>   
                }
                {step.lines.map((i) => {
                    if (i === 0) {
                        return (<Text style={styles.blankLineFirst}> </Text>)
                    }
                    else {
                        return (<Text style={styles.blankLine}> </Text>)
                    }
                })}
            </View>
        )
    }

    return (
        <>
        {props.previewReady ?
        <PDFViewer className={classes.preview}>
            <Document>
                <Page size="A4" style={styles.page}>
                    
                    <Text style={styles.header} fixed>
                        Generated by {user} on {date}
                    </Text>

                    <View style={styles.section}>
                        <Text style={styles.title}>
                            PAMM: WORK ORDER
                        </Text>
                    </View>
                    
                    <View style={styles.section}>
                        <View style={styles.info}>
                            <View style={styles.infoLeft}>
                                <View style={styles.field}>
                                    <Text style={styles.fieldKeyLeft}>Client:</Text>
                                    <Text style={styles.fieldVal}>{props.client || ''}</Text>
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldKeyLeft}>Asset:</Text>
                                    <Text style={styles.fieldVal}>{props.asset || ''}</Text>
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldKeyLeft}>Component:</Text>
                                    <Text style={styles.fieldVal}>{props.component || ''}</Text>
                                </View>
                            </View>
                            <View style={styles.infoRight}>
                                <View style={styles.field}>
                                    <Text style={styles.fieldKeyRight}>Date due:</Text>
                                    <Text style={styles.fieldVal}>{props.expected_completion || ''}</Text>
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldKeyRight}>Date completed:</Text>
                                    <Text style={styles.fieldVal}>{props.actual_completion || ''}</Text>
                                </View>
                                <View style={styles.field}>
                                    <Text style={styles.fieldKeyRight}>Scheduled:</Text>
                                    <Text style={styles.fieldVal}>{props.scheduled || ''}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.field}>
                            <Text style={styles.fieldKeyLeft}>Description:</Text>
                            <Text style={styles.fieldVal}>{props.description || ''}</Text>
                        </View>
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Labour used:
                        </Text>
                        {
                            [0,1,2,3,4].map(i => <Text style={styles.blankLine}> </Text>)
                        }
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Materials used:
                        </Text>
                        {
                            [0,1,2,3,4].map(i => <Text style={styles.blankLine}> </Text>)
                        }
                    </View>

                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>
                            Procedure:
                        </Text>
                        {
                            procedure.map(step => renderStep(step))
                        }
                    </View>

                    <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
                        `page ${pageNumber} of ${totalPages}`
                    )} fixed />
                </Page>
            </Document>
        </PDFViewer>
        :
        <div className={classes.loadingText}>Loading...</div>
        }
        </>
    )
});

export default WorkOrderPreview