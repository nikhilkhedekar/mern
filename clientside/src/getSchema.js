import axios from 'axios';
import React, { useEffect, useState } from 'react';

const GetSchema = () => {
    const [resp, setResp] = useState([]);
    useEffect(() => {
        const response = axios.get("http://localhost:8080/getSchema");
        console.log(response)
        setResp(response);
        console.log("resp",resp)
      }, [])
      return(
        <div>
          {/* {
            resp.map((data, i) => {
                return(
                    <div key={i}>
                        <span>Name: {data.name}</span><br />
                        <span >Price: {data.price}</span><br />
                        <span>Date: {data.date}</span>
                    </div>
                )
            })
          } */}
        </div>
      )
}

export default GetSchema