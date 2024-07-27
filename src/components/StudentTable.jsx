
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcons from '@mui/icons-material/Edit'
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase-config';


export default function StudentTable({student, setStudent}) {

    //  updated Student 
    function handleEditStudent(studntId){
        alert(studntId)
    }
    // Delete student 
    async function handleDeleteStudent(studntId){
        const studentDoc = doc(db, 'students', studntId)
        await deleteDoc(studentDoc);
        setStudent(studnt.filter((studnt)=> studnt.id !== studntId))
        
    }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
           
            <TableCell align="center">Student Roll No #</TableCell>
            <TableCell align="center">Student Name</TableCell>
            <TableCell align="center">Student Age</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student.map((studnt) => (
            <TableRow
              key={studnt.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                {/* <TableCell component="th" scope="row">
                    {studnt.rollNo}
                </TableCell> */}
              <TableCell align="center">{studnt.rollNo}</TableCell>
              <TableCell align="center">{studnt.name}</TableCell>
              <TableCell align="center">{studnt.age}</TableCell>
              <EditIcons onClick={()=>handleEditStudent(studnt.id)} style={{cursor:"pointer", color:'#007bff', marginRight:'10px'}}/>
              <DeleteIcon onClick={()=>handleDeleteStudent(studnt.id)} style={{cursor:"pointer", color:'crimson'}}/>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
