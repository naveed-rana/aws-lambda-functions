import { toast } from 'react-toastify';
import axios from 'axios';

export const ADD_TODO = 'ADD_TODO';


export function addToDo(data) {
    return (dispatch) => {
        axios.post(window.baseURL + "/todo/api/v1.0/tasks", data)
        .then((res) => {
                // console.log(id)

            toast.success("Successfully Added!");
                dispatch({
                    //Call Reducer
                    type: ADD_TODO,
                    payload: data
                });
            }).catch(() =>{
                toast.error("Error Occored! Please Try Again Later");
            })
    }
}