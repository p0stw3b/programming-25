import React from "react"
import PointsImpl from "./PointsImpl"
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"
import { setContext } from "@apollo/client/link/context"
import { accessToken } from "../../services/moocfi"

export default class Points extends React.Component {
  state = {
    render: false,
  }
  componentDidMount() {
    this.setState({ render: true })
  }
  render() {
    if (!this.state.render) {
      return <div>Loading...</div>
    }
    const httpLink = createHttpLink({
      uri: "https://www.mooc.fi/api",
    })

    const authLink = setContext((_, { headers }) => {
      const token = accessToken()
      return {
        headers: {
          ...headers,
          authorization: token ? `Bearer ${token}` : "",
        },
      }
    })

    const apolloClient = new ApolloClient({
      link: authLink.concat(httpLink),
      cache: new InMemoryCache(),
    })
    return (
      <ApolloProvider client={apolloClient}>
        <PointsImpl />{" "}
      </ApolloProvider>
    )
  }
}
