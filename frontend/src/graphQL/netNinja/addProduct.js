import { useState } from "react";
import { gql, useMutation, useLazyQuery } from "@apollo/client";

let addProductToDB = gql`mutation AddToProduct($input: createProduct){
    addProduct(input: $input) {
      name
      price
    }
  }`;

const AddProduct = () => {
    const [handleChangeState, setHandleChangeState] = useState({});
    const [addToProductFunc, { data: prdData, loading, error }] = useMutation(addProductToDB);
    const changeHandler = e => {
        const { name, value } = e.target;
        setHandleChangeState({
            ...handleChangeState,
            [name]: value
        });
    }
    const submitHandler = e => {
        e.preventDefault();
        console.log('submitObj', handleChangeState);
        addToProductFunc({
            variables: {
                input: {
                    name: handleChangeState.name,
                    price: Number(handleChangeState.price)
                }
            }
        });
        console.log("createProduct", prdData);
    }

    return (
        <>
            <form onChange={changeHandler} onSubmit={submitHandler} >
                <input name="name" />
                <input name="price" type="number" />
                <input type="submit" />

            </form>
        </>
    );
}

export default AddProduct