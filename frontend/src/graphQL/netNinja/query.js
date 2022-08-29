import { useQuery, gql } from "@apollo/client";

const graphQLQuery = gql`
    query{
        getProducts{
            name
            price
        }
    }
`

const Query = () => {
    const query = useQuery(graphQLQuery);
    console.log("query", query);
}

export default Query