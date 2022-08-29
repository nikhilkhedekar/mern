import net from "net";
import { useEffect } from "react";

const App = () => {
    const client = net.connect({ localPort: 8081 }, () => {
        console.log("connected to port : 8081");
    });
    console.log("netApp", client);
    useEffect(() => {
        client.on("connection");
        return () => client.on("close");
    }, []);
    return(
        <>hello</>
    )
}

export default App