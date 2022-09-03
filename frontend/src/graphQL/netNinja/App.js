import { ApolloProvider, ApolloClient, InMemoryCache }  from "@apollo/client";
import Query from "./query";
import AddProduct from "./addProduct";
import GetProduct from "./getProduct";

const apolloClient = new ApolloClient({
    uri: "http://localhost:8080",
    cache: new InMemoryCache(),
})

const App = () => {
    return(
        <ApolloProvider client={apolloClient} >
            <Query />
            <AddProduct />
            <GetProduct />
        </ApolloProvider>
    )
}

export default App