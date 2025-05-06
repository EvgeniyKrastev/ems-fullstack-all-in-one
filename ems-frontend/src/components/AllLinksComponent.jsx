import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom";

export const AllLinksComponent = () =>{

    return (
        <div className='container'>
            <table className="table table-stripped table-bordered">
                <tbody>
                <tr>
                    <td> <a className="btn btn-secondary" href="/tasks" >Tasks</a></td>
                </tr>
                <tr>
                    <td><a className="btn btn-secondary" href="/employees" >Employees</a></td>
                </tr>
                </tbody>
            </table>
           
            
        </div>
    )
}