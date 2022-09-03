import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const App = () => {

    const firstSocketConnection = io("http://localhost:8080");
    firstSocketConnection.on("firstSocketConnection");
    console.log("firstSocketConnection", firstSocketConnection);

    const secondSocketConnection = io("http://localhost:8080/second");
    secondSocketConnection.on("secondSocketConnection");
    console.log("secondSocketConnection", secondSocketConnection);

    // const [msg, setMsg] = useState("");
    // const [pvtNw, setPvtNw] = useState("");
    // const [pvtMsg, setPvtMsg] = useState("");
    // const connection = io("http://localhost:8080");

    // const webSocketConnection = () => {
    //     connection.on("connection");
    //     connection.timeout = 300000;
    //     return connection;
    // }
    // const closeConnection = (socket) => {
    //     return socket.close();
    // }

    // useEffect(() => {
    //     const socket = webSocketConnection();
    //     messageDelivered();
    //     privateMessageDelivered();
    //     return () => closeConnection(socket);
    // }, [webSocketConnection, closeConnection, connection]);

    // const sendMessage = () => {
    //     if (msg === "") return;
    //     connection.emit("sendMsg", msg);
    //     setMsg("");
    // }
    // const messageDelivered = () => {
    //     connection.on("msgDelivered", (msg) => setMsg(msg));
    //     connection.on("ackno", (msg) => alert(msg));
    // }

    // const joinPrivateNetwork = () => {
    //     if (pvtNw === "") return;
    //     connection.emit("pvtNw", pvtNw);
    // }
    // const sendPrivateMessage = () => {
    //     if (pvtMsg === "") return
    //     connection.emit("pvtMsg", { pvtNw, pvtMsg });        
    // }
    // const privateMessageDelivered = () => {
    //     connection.on("pvtMsgDelivered", (data) => {
    //         setPvtMsg(data.pvtMsg);
    //         setPvtNw(data.pvtNw);
    //     })
    // }

    // return (
    //     <>
    //         <label htmlFor='msg' >Message:
    //             <input id="msg" onChange={(e) => setMsg(e.target.value)} value={msg} />
    //         </label>
    //         <button onClick={sendMessage} > Send </button>
    //         <br />
    //         <label htmlFor='pvtNw' >Private Nw
    //             <input id="pvtNw" onChange={(e) => setPvtNw(e.target.value)} value={pvtNw} />
    //         </label>
    //         <button onClick={joinPrivateNetwork} > Joint </button>
    //         <input onChange={(e) => setPvtMsg(e.target.value)} value={pvtMsg} />
    //         <button onClick={sendPrivateMessage} > Send </button>
    //         <h3> Private Network: {pvtNw} </h3><br />
    //         <h4> Pricate Data: {pvtMsg} </h4>
    //         <br />
    //         <span> {msg} </span>
    //     </>
    // )
}

export default App