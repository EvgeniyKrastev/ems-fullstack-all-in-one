import { useState } from 'react'
import './App.css'
import ListEmployeeComponent from './components/EmployeeComponents/ListEmployeeComponent'
import { HeaderComponent } from './components/EmployeeComponents/HeaderComponent'
import { FooterComponent } from './components/EmployeeComponents/FooterComponent'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { EmployeeComponent } from './components/EmployeeComponents/EmployeeComponent'
import {ListTaskComponent} from './components/TaskComponents/ListTaskComponent'
import {TaskComponent} from './components/TaskComponents/TaskComponent'
import { AllLinksComponent } from './components/AllLinksComponent'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <BrowserRouter>
      <HeaderComponent/>
      <Routes>
        {/* http://localhost:3000 */}
        <Route path='/' element = {< AllLinksComponent/>}> </Route>

       { /*http://localhost:3000/employees */} 
        <Route path='/employees' element = { <ListEmployeeComponent />}> </Route>

        { /*http://localhost:3000/add-employee */} 
        <Route path='/add-employee' element = { <EmployeeComponent />}> </Route>

        { /*http://localhost:3000/edit-employee */} 
        <Route path='/edit-employee/:id' element = { <EmployeeComponent />}> </Route>

        {/* Tasks */}

         {/* http://localhost:3000/tasks */}
         <Route path='/tasks' element = { <ListTaskComponent />}> </Route>
        
         { /*http://localhost:3000/add-task */} 
         <Route path='/add-task' element = { <TaskComponent />}> </Route>

         { /*http://localhost:3000/edit-task */} 
         <Route path='/edit-task/:id' element = { <TaskComponent />}> </Route>

         <Route path='/all-links'  element = {< AllLinksComponent/>}> </Route> 

      </Routes>
      {/* <ListEmployeeComponent/>   */}
      <FooterComponent/>
    </BrowserRouter>
      

    </>
  )
}

export default App
