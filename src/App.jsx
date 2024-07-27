import { collection, getDocs } from 'firebase/firestore'
import './App.css'
import CreateStudent from './components/CreateStudent'
import StudentList from './components/StudentList'
import { db } from './firebase-config'
import { useEffect, useState } from 'react'



function App() {
  const [student, setStudent] = useState([]);
  const getStudents = async() =>{
    
    const studentCollection = collection(db, 'students')
    const studentSnapshot = await getDocs(studentCollection)
    const studentList =  studentSnapshot.docs.map(doc =>( {
     
         id: doc.id,
         ...doc.data()
 }));
 setStudent(studentList)
 
   }
 
   useEffect(()=>{
       getStudents()
   },[student]);
 
 
 
  return (
    <div className='app-container'>
      <h1 className='heading-title'>Student Managment System</h1>
      
      <CreateStudent/>
      <StudentList student={student}  setStudent={setStudent} />
      
            </div>
  )
}

export default App