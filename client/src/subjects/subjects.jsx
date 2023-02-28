import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {toast, ToastContainer} from 'react-toastify'
import '../App.css'
function Subjects(props) {
    const inputRef= useRef()
    const [curr, setcurr]=useState([])
    const [add, setAdd]=useState(false) 
    const [batch, setb_name] = useState()
    const [sub, setSub] = useState('')
    const [currSubs, setcurrSubs] = useState([])
    
    const ssubs = useSelector(state => state.subjects)
    useEffect(() => {
        setcurrSubs(ssubs);
      }, [ssubs]);
const currbatch= useSelector(state=> state.activeBatch)
    const nav = useNavigate()
    const AddSubject = async () => {
        inputRef.current.value='';
        let resp =await axios.post('/subjects/add', { b_name: currbatch, title: sub})
     
   showToast()
//    setItems([...items, newItem]);
   setcurrSubs([...currSubs,{ b_name: currbatch, title: sub}])
    }
   function showToast(){
    toast.success('Subject added !', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 2000
    });
    
   }
    const dispatch = useDispatch()
   async function fetchExam(sub) {
        let resp =await axios.post('/fetchExams', {  sub: sub })
       let data= await resp.data
    //    console.log(resp.data)
        dispatch({
            type: "SHOWEXAM",
            payload: {data, sub}
        })
        nav("/"+ currbatch+ "/"+ sub +"/quiz")
       
    }
   function showAdd(){
    setAdd(!add)

   }

    return (
        <div>
            {!currbatch.length? <p> No batch selected yet.</p>:<> <h1> This batch has following subjects: </h1>
                <p>Note: click on the subject to see more relatede quizes </p></>}
         
            {currSubs.length<=0 && currbatch.length? <p> Sorry, this batch has no current subjects.</p>:currSubs.map(sub => {
                return <><li className='subjects' onClick={(e) => { fetchExam(sub.title) }}> {sub.title}</li> </>
            })}
            {currbatch?<button className='btn-add' onClick={()=>{showAdd()}}>+</button>: null}

{add?<div  className='sub-inp'><input ref={inputRef} placeholder='subjectname' onChange={(e)=>setSub(e.target.value)}/>
<button type='button' className='sav-sub' onClick={()=>{AddSubject()}}>save subject</button></div>:null

}




<ToastContainer></ToastContainer>

        </div>
    )
}


export default Subjects