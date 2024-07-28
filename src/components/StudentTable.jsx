
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcons from '@mui/icons-material/Edit'
import { deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase-config';
import UpdateStudent from './UpdateStudent';
import { useState } from 'react';


export default function StudentTable({ student, setStudent }) {
  const [editDilogOpen, setEditDilogOpen] = useState(false)
  const [currentStudent, setCurrentStudent] = useState(null)
  // updatedStudent
  const handleUpdateStudent = (studntId) => {
    const studen =  student.find(s => s.id === studntId)
    setCurrentStudent(studen)
    setEditDilogOpen(true)
  };
  // DeleteStudent
  const handleDeleteStudent = async (studntId) => {
    const studentDoc = doc(db, "students", studntId);
    await deleteDoc(studentDoc);
    setStudent(student.filter((studnt) => studnt.id !== studntId));
  };

  // close update dilog 
  function handleDilogClosed() {
    setEditDilogOpen(false)
    setCurrentStudent(null)
  }

   async function handleSaveStudent(){
   const studentDoc =  doc(db, 'students', currentStudent.id)
    await updateDoc(studentDoc,{
     name: currentStudent.name,
     age: currentStudent.age
   })
   setStudent(student.map((studen) => studen.id === currentStudent.id ? 
   currentStudent : studen))
   handleDilogClosed();
  }
  // handlechange dilog 
  function handleChange(e){
    const {name , value} = e.target
    setCurrentStudent((prev) =>({
      ...prev,
      [name] : value
    }))
    console.log(e.target)

  }

  return (

    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Student Roll #</TableCell>
            <TableCell align="center">Student Name</TableCell>
            <TableCell align="center">Student Age</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {student.map((studnt) => (
            <TableRow
              key={studnt.id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell align="center">{studnt.rollNo}</TableCell>
              <TableCell align="center">{studnt.name}</TableCell>
              <TableCell align="center">{studnt.age}</TableCell>
              <TableCell align="center">
                <EditIcons
                  style={{
                    cursor: "pointer",
                    color: "#007bff",
                    marginRight: "10",
                  }}
                  onClick={() => handleUpdateStudent(studnt.id)}
                />
                <DeleteIcon
                  style={{ cursor: "pointer", color: "crimson" }}
                  onClick={() => handleDeleteStudent(studnt.id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <UpdateStudent 
    editDilogOpen={editDilogOpen} 
    currentStudent={currentStudent} 
    handleDilogClosed={handleDilogClosed} 
    handleChange={handleChange}
    handleSaveStudent = {handleSaveStudent}
    />
    </>
  );
}
