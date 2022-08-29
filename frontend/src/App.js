import React, { useEffect, useState } from 'react';
import axios from 'axios'
import FileBase64 from 'react-file-base64';

const App = () => {
  const [userDetails, setUserDetails] = useState({
    userName: "",
    userEmail: "",
    contactNo: 0,
  });
  const [imageFile, setImageFile] = useState();
 
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
    const postData = {
      userName,
      userEmail,
      contactNo,
      image: imageFile,
    }
    console.log("postData", postData);
    const postResp = axios.post('http://localhost:8080/postData', postData);
    console.log('postedData', postResp)
  }
  return(
    <form onSubmit={onSubmitHandler} >
      <input onChange={onChangeHanlder('userName')} value={userName} />
      <input onChange={onChangeHanlder('userEmail')} value={userEmail} />
      <input onChange={onChangeHanlder('contactNo')} value={contactNo} type="number"/>
      <FileBase64 multiple={true} onDone={(base64) => setImageFile(base64)} />
      <button type='submit' >Submit</button>
    </form>
  )
}

export default App