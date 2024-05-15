import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { useDataContext } from '../../../context/DataTrackingContext';

const MyTableFOCDocument: React.FC = () => 
{
    const { userData, approverData } = useDataContext();

    const rows =
        [
            { title: 'Create Request', value: userData.userDetectedName, value2: userData.tentativeDateOfSupply, value3: "Compeleted" },
            { title: 'Zonal Manager', value: approverData.zonalTitle, value2: approverData.zonalManagerDate, value3: approverData.zonalManagerApproval, value4: approverData.zonalManagerComments },
            { title: 'BussinessLine Manager', value: approverData.bussinessTitle, value2: approverData.bussinessLineManagerDate, value3: approverData.bussinessLineManagerApproval, value4: approverData.bussinessLineManagerComments },
            { title: 'General Manager', value: approverData.generalTitle, value2: approverData.generalManagerDate, value3: approverData.generalManagerApproval, value4: approverData.generalManagerComments },
            { title: 'CSO ', value: approverData.CSOTitle, value2: approverData.CSODate, value3: approverData.CSOApproval, value4: approverData.CSOComments },
        ];

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Title</TableCell>
                        <TableCell align="center">Responsible</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Outcome</TableCell>
                        <TableCell align="center">Comments</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.title}>
                            <TableCell component="th" scope="row">{row.title}</TableCell>
                            <TableCell align="center">{row.value}</TableCell>
                            <TableCell align="center">
                            {row.value2 && row.value2 instanceof Date ? row.value2.toLocaleDateString() : null}
                            </TableCell>
                            <TableCell align="center">{row.value3 ? row.value3 : 'Pending'}</TableCell>
                            <TableCell align="center">{row.value4}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default MyTableFOCDocument;
