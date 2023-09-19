import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


function RequestManagementList({ request, handleDeleteRequest }) {

   //get the average percentage of likes 
   const average = () => {
     const sum = request.likes + request.dislikes;
     const likesAverage = Math.floor((request.likes / sum) * 100);
     if (request.likes < 5 && request.dislikes < 5 || isNaN(likesAverage)) {
        return 'Insufficient data'
       } 
     return (likesAverage);
   }

    
  return (
    <>
        <TableRow
              key={request.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="center" component="th" scope="row">
                <button  onClick={() => handleDeleteRequest(request.id)}>
                    X
                </button>
              </TableCell>
              <TableCell align="center" component="th" scope="row">
                {request.id}
              </TableCell>
              <TableCell align="right">{request.name}</TableCell>
              <TableCell align="center">{request.location}</TableCell>
              <TableCell align="center">{request.player.name}</TableCell>
              <TableCell align="right">{request.likes}</TableCell>
              <TableCell align="center">{request.dislikes}</TableCell>
              <TableCell align="left" style={{color: average() >= 60 ? 'green' : 'red'}}>{request.likes < 5 && request.dislikes < 5 ? average() :`${average()}%`}</TableCell>
            </TableRow>
    </>
)
}




export default RequestManagementList;