import React, { useEffect, useState } from 'react';
import axios from 'axios'

const App = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    contactNo: 0,
  })

  const { userName, userEmail, contactNo } = userDetails;

  const onChangeHanlder = userName => e => {
    setUserDetails({
      ...userDetails,
      [userName]: e.target.value,
    })
  }

  useEffect(() => {
    const getData =async() => {
      const gotData = await axios.get('http://localhost:8080');
      console.log('gotData', gotData);
    } 
    getData();
  }, [])
  const onSubmitHandler = (e) => {
    e.preventDefault();
    const postResp = axios.post('http://localhost:8080/postData', {
      userName,
      userEmail,
      contactNo
    });
    console.log('postedData', postResp)
  }
  return(
    <form onSubmit={onSubmitHandler} >
      <input onChange={onChangeHanlder('userName')} value={userName} />
      <input onChange={onChangeHanlder('userEmail')} value={userEmail} />
      <input onChange={onChangeHanlder('contactNo')} value={contactNo} />
      <button type='submit' >Submit</button>
    </form>
  )
}

export default App