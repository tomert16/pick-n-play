import React from 'react'
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';


function RequestManagementList({ request, handleDeleteRequest }) {
    
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
            </TableRow>
    </>
)
}




export default RequestManagementList;