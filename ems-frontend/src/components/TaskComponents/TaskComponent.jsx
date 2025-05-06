import React, { useEffect, useState } from "react"
import { createTask, getTask, updateTask} from '../../services/TaskService'

import { useNavigate, useParams } from "react-router-dom"

export const TaskComponent = () =>{

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const {id} = useParams();

    const navigator = useNavigate();


    useEffect(
        ()=>{
            if(id){
                getTask(id).then(
                    (response)=> {
                        setTitle(response.data.title);
                        setDescription(response.data.description);
                    }
                ).catch(error=>{
                    console.error(error);
                })
            }else{

            }
        },[]
    )

    const [errors, setErrors] = useState({
        title: '',
        description: ''
    })

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Task</h2>
        }else{
            return <h2 className='text-center'>Add Task</h2>
        }
    }

    
    function validateForm(){
        let valid = true;

        const errorsCopy = {... errors}

       if(title.trim()){
            errorsCopy.title = '';
       }else{
            errorsCopy.title = 'Title is requred!';
            valid = false;
       }

       if(description.trim()){
            errorsCopy.description = '';
       }else{
            errorsCopy.description = 'Description is required!'
            valid = false;
       }

       setErrors(errorsCopy);

       return valid;
    }

    function saveOrUpdateTask(e){
        e.preventDefault();

        if(validateForm()){

            const task = {title, description};

            if(id){
                saveTask(id,task).then(
                    (response)=> {
                        console.log(response.data);
                        navigator('/tasks');
                    }
                ).catch(error => {
                    console.error(error)
                })
            }else{
                createTask(task).then(
                    (respone)=>{
                        console.log(respone.data);
                        navigator('/tasks');
                    }
                )
            }
            console.log(task);
        }

    }

    return(
        <div className='container'>
            <div className='row'>
                <div className='card col-md-6 offset-md-3'>
                    {
                        pageTitle()
                    }
                    <div className='card-body'>
                        <form>
                            <div className='form-group mb-2'>
                                <label className="form-label">Title</label>
                                <input
                                type="text"
                                placeholder="enter title"
                                name="title"
                                value={title}
                                className={`form-controll ${errors.title ? 'is-invalid': ''}`}
                                onChange={(e)=>{setTitle(e.target.value)}}
                                >
                                </input>
                                {errors.title && <div className="invalid-feedback"> {errors.title}</div> }
                            </div>
                            <div className='form-group mb-2'>
                                <label className="form-label">Description</label>
                                <input
                                type="text"
                                placeholder="enter description"
                                name="description"
                                value={description}
                                className={`form-controll ${errors.description ? 'is-invalid': ''}`}
                                onChange={(e)=>{setDescription(e.target.value)}}
                                >
                                </input>
                                {errors.description && <div className="invalid-feedback"> {errors.description}</div> }
                            </div>
                            <button className="btn btn-success" onClick={saveOrUpdateTask}> Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}