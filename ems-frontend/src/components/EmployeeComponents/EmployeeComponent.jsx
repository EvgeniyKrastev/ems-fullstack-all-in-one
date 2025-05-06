import React, { useEffect, useState } from 'react'
import { createEmployee, getEmployee, updateEmployee } from '../../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'

export const EmployeeComponent = () => {
    {/* useState in JS is function from react */}
    {/* firstName is state variable name */}
    {/* setfirstName is function name that we use to update the firstname value */}
    const [firstName, setfirstName] = useState('')
    const [lastName, setlastName] = useState('')
    const [email, setEmail] = useState('')

    const {id} = useParams();

    const [errors, setErrors] = useState({
        firstName:'',
        lastName:'',
        email: ''
    })

    const navigator = useNavigate();

    // recive 2 parameters, first parameter is call function, second parameter is dependency list
    useEffect(()=>{
        if(id){
            getEmployee(id).then((response) =>{
                setfirstName(response.data.firstName);
                setlastName(response.data.lastName);
                setEmail(response.data.email);  
            } ).catch(error =>{
                console.error(error);
            })
        }
    }, [])

    function validateForm(){
        let valid = true;

        // here errorsCopy is variable and we copy the state of the object errors to the variable 
        const errorsCopy = {... errors}

        //here we will trim the string if first name is not empty then we will keep it
        // if is empty will show validation error
        if(firstName.trim()){
            errorsCopy.firstName = '';
        }else{
            errorsCopy.firstName = " First Name is required! "
            valid = false;
        }

        if(lastName.trim()){
            errorsCopy.lastName = '';
        }else{
            errorsCopy.lastName = " Last Name is required! "
            valid = false;
        }

        if(email.trim()){
            errorsCopy.email = '';
        }else{
            errorsCopy.email = " Email is required! "
            valid = false;
        }

        setErrors(errorsCopy);

        return valid;
    }

    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }
    //const  handleFirstName = (e)=>{setfirstName(e.target.value)}
   //const  handleLastName = (e)=>{setEmail(e.target.value)}
    {[/**to make code simple we can use arrow function */]}
    {[/** const handleFirstName = (e) => setFirstName(e.target.value) */]}
    {[/** or this code can be placed in the onChange={handleFirstName} onChange={(e) => setFirstName(e.target.value)} */]}
    //const  handleLastName = (e) => {setlastName(e.target.value)}
    [/* Js function to handle onclick event for submit*/]
    function saveOrUpdateEmployee(e){
        e.preventDefault();

        if(validateForm()){
            const employee = {firstName,lastName,email};
            if(id){
                updateEmployee(id,employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees');
                }).catch(error =>{
                    console.error(error);
                })
            }else{
                createEmployee(employee).then((response)=>{
                    console.log(response.data);
                    navigator('/employees');
                })
            }
            console.log(employee)
        }
    }

  return (
    <div className='container'>
        <div className='row'>
            <div className='card col-md-6 offset-md-3 offset-md-3'>
                {
                    pageTitle()
                }
                <div className='card-body'>
                    <form>
                        <div className='form-group mb-2'>
                            <label className='form-label'>First Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee First Name'
                                name='firstName'
                                value={firstName}
                                className={`form-controll ${ errors.firstName ? 'is-invalid': ''}`}
                                onChange={(e)=>{setfirstName(e.target.value)}}
                            >
                            </input>
                            {errors.firstName && <div className='invalid-feedback'> {errors.firstName} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Last Name:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Last Name'
                                name='lastName'
                                value={lastName}
                                className={`form-controll ${ errors.lastName ? 'is-invalid': ''}`}
                                onChange={(e)=>{setlastName(e.target.value)}}
                            >
                            </input>
                            {errors.lastName && <div className='invalid-feedback'> {errors.lastName} </div>}
                        </div>
                        <div className='form-group mb-2'>
                            <label className='form-label'>Email:</label>
                            <input
                                type='text'
                                placeholder='Enter Employee Email'
                                name='Email'
                                value={email}
                                className={`form-controll ${ errors.email ? 'is-invalid': ''}`}
                                onChange={(e)=>{setEmail(e.target.value)}}
                            >
                            </input>
                            {errors.email && <div className='invalid-feedback'> {errors.email} </div>}
                        </div>
                        <button className='btn btn-success' onClick={saveOrUpdateEmployee}>Submit</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}
