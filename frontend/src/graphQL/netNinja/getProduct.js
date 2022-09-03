import { useState } from 'react'
import { useLazyQuery, gql } from '@apollo/client';

let getProductOnClick = gql`query GetProduct($getProductById: ID){
    getProduct(id: $getProductById){
        name
        price
    }
}`

const GetProduct = () => {
    const [id, setId] = useState("");
    const [getThatProduct, { data: prdData, loading: prdLoading, error: prdError }] = useLazyQuery(getProductOnClick)
    if(id){
        console.log("getProduct", prdData);
    }
    return (
        <div>
            <input onChange={(e) => setId(e.target.value)} value={id} />
            <button onClick={() => {

                getThatProduct({ variables: { getProductById: id } })
            }} > get </button>
        </div>
    )
}

export default GetProduct