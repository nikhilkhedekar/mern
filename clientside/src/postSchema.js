import axios from "axios";
import { useState } from "react"

const PostSchema = () => {
    const [val, setVal] = useState({
        id: "",
        name: "",
        price: 0,
        date: ""
    });
    const {id, name, price, date} = val;
    const onChangeHandler = id => e => {
        setVal({
            ...val,
            [id]: e.target.value,
        });
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        console.log("postFront", val);
        // const resp = await axios.post("http://localhost:8080/postSchema", val);
        const resp = await axios.post("http://localhost:8080/postMongoSchema", val)
         console.log("postResponse", resp);
    }
    return(
        <form onSubmit={submitHandler} >
            <input placeholder="ID" value={id} onChange={onChangeHandler("id")} type="text" />
            <input placeholder="Name" value={name} onChange={onChangeHandler("name")} type="text" />
            <input placeholder="Price" value={price} onChange={onChangeHandler("price")} type="number" min="1000" max="20000" step="100"/>
            <input placeholder="Date" value={date} onChange={onChangeHandler("date")} type="date"/>
            <input type="submit" value="Add" />
        </form>
    )
}

export default PostSchema