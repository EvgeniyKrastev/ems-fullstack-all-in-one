import React,{ useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteTask, listTasks} from '../../services/TaskService'



export const ListTaskComponent = () => {

    const [tasks, setTasks] = useState([])

    const navigator = useNavigate();

    // useEffect(() => { ... }, [])
    // The empty dependency array [] means:
    // Run the function inside only once, when the component is mounted.
    // Don't re-run on re-renders or state changes.
    // getAllEmployees() is likely a function that:
    // Fetches employee data from an API.
    // Updates state via setEmployees(data).
    // 🧠 Why not call getAllEmployees() directly?
    // Because React renders the component first, and if you call getAllEmployees() directly in the body,
    //  it would run on every render, not just on first load.
    // Using useEffect with [] ensures it only runs once, preventing unnecessary API calls.

    useEffect(()=> {
        getAllTasks();
    },[])

   function getAllTasks(){
        listTasks().then(
            (response)=>{setTasks(response.data);}
        ).catch(
            error => {console.error(error);}
        )
   }

   function addNewTask(){
        navigator('/add-Task')
   }

   function updateTask(){
        navigator(`/edit-Task/${id}`)
   }

   function removeTask(id){
        console.log(id);
        deleteTask(id).then(
            (response)=> {getAllTasks();}
        ).catch(
            error => {console.error(error);}
        )
   }



    return(
        <div className="container">
            <h2 className="text-center"></h2>
            <button className="btn btn-primary mb-2" onClick={addNewTask} >Add Task</button>
            <a className="btn btn-secondary mb-2" href="/all-links" >All-Links</a>
            <table className="table table-stripped table-bordered">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Task Title</th>
                    <th scope="col">Description</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        tasks.map(task =>
                            <tr key={task.id} >
                                <td>{task.id}</td>
                                <td>{task.title}</td>
                                <td>{task.description}</td>
                                <td className="text-center">
                                    <div className="d-flex justify-content-center gap-2">
                                        <button className="btn btn-primary" onClick={()=> updateTask(task.id)}>Update</button>
                                        <button className="btn btn-danger" onClick={()=> removeTask(task.id)}>Delete</button>
                                    </div>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </div>
    )

}

