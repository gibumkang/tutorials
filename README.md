<!-- AUTO-GENERATED-CONTENT:START (STARTER) -->
<p align="center">
  <a href="https://www.gatsbyjs.com">
    <img alt="Gatsby" src="https://www.gatsbyjs.com/Gatsby-Monogram.svg" width="60" />
  </a>
</p>
<h1 align="center">
  Gatsby with Strapi.io
</h1>

The purpose of this tutorial is to customize authentication with Gatsby and Strapi. The tutorial referenced is [here](https://www.gatsbyjs.com/blog/gatsbygram-case-study/)

### Setup routing with reach/router

Reach/router is a package that ships with Gatsby. Use it to set up your page logic in <code>./src/pages/app.js</code> like so:

```
import React from "react"
import { Router } from "@reach/router"
import Layout from "../components/layout"
import Navigation from "../components/app/Navigation"
import Dashboard from "../components/app/Dashboard"
import Account from "../components/app/Account"

const App = ({ location }) => {
  const redirect = location.pathname.split('/').pop()

return (
    <Layout>
        <Navigation />
        <Router basepath="/app">
        <Account path="/account" />
        <Dashboard default />
        </Router>
    </Layout>
    )
}
export default App
```

There is some additional configuration available for the router module.

### Make all subdirectory destinations default to the subdirectory

For example, force all pages within /app to default to app.js. This will require configuration within the gatsby-node.js file.

```
//gatsby-node.js

// Implement the Gatsby API “onCreatePage”. This is
// called after every page is created.
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions
  // page.matchPath is a special key that's used for matching pages
  // only on the client.
  if (page.path.match(/^\/app/)) {
    page.matchPath = "/app/*"
    // Update the page.
    createPage(page)
  }
}
```

### Use React's contextAPI to protect routes in Gatsby

This is primarily done in the custom hook under <code>'/hooks/useAuth.js'</code>. There are several things happening
in this file but we can start from the very top. We call axios and store our env file in const apiURL.

#### 1. useReducer and createContext

In order to use <code>useReducer</code> effectively, there must always be a default state declared in the manner of <code>DEFAULT_STATE</code>. Usually it is stored in an object, like so:

```
//useAuth.js
const DEFAULT_STATE = {
  jwt: null,
  user: {},
  loggedIn: false
}
```

#### 2. Building our reducer with DEFAULT_STATE

Next, we need to build our <code>useReducer</code>. Think of a <code>useReducer</code> as an elaborate switch statement which also acts as a class with multiple functions within one function. These functions are stored in switch statements and allows the developer to utilize it throughout the application.

```
//useAuth.js
const reducer = (state, action) => {
  switch(action.type){
    case 'LOGIN':
      const { jwt = null, user = {} } = action.payload
      return {...state, jwt, user, loggedIn: true}
    case: 'LOGOUT':
      return {...state, jwt: null, user: {}, loggedIn: false}
    default:
      return DEFAULT_STATE
  }
}
```

#### 3. Storing and utlizing useContext

Now we can start preparing our <code>useContext</code> hook. This is done in two distinct ways. First, you need to store your
<code>createContext()</code> hook into a const that is sensible. In this case, we want to store it for authentication, so let's name
our variable <code>AuthContext</code>:

```
//useAuth.js
const AuthContext = createContext()
```

Next, you need to wrap your application with your new hook in order to access it application wide:

```
//useAuth.js
const AuthProvider = ({children}) => {
  return <AuthContext.Provider value={useReducer(reducer, DEFAULT_STATE)}>{children}</AuthContext.Provider>
}
```

If we break down the statement above, what we are doing is creating a new function called <code>AuthProvider</code>. Within <code>AuthProvider</code>, we are wrapping our children elements inside our <code>AuthContext</code> variable we just declared earlier. Since it is a <code>createContext()</code> element, we can also pass a value in the tag itself. In this case, we want to apply the <code>useReducer</code> hook and pass in the reducer we built earlier, and start with the <code>DEFAULT_STATE</code>.

#### 4. Gatsby-specific step

For Gatsby, there is a helper function we can utilize to neatly apply our <code>AuthProvider</code> within our application. It is
called the <code>wrapRootElement</code> and it needs to be referenced in a separate gatsby file, but for now, write this within the same file:

```
//useAuth.js
export const wrapRootElement = ({element}) => (
  <AuthProvider>{element}</AuthProvider>
)
```

#### 5. Set useContext inside our useAuth hook

Lastly, we need to actually create our hook, which will be conveniently named <code>useAuth</code>:

```
//useAuth.js
const useAuth = () => {
  const [state, dispatcher] = useContext(AuthContext)
  const isAuthenticated = state.loggedIn && Object.keys(state.user).length

  const login = async (credentials) => new Promise(async(resolve, reject) => {
    try{
      const { data: payload } = await axios.post(`${apiURL}/auth/local`, credentials)
      dispatcher({ type: 'LOGIN', payload })
      resolve(payload)
    }
    catch(e){
      console.log(e)
      reject(e)
    }
  })
  const logout = () => {
    dispatcher({ type: 'LOGOUT' })
  }

  return { state, isAuthenticated, login, logout }
}
```

A lot of moving pieces here, but let's break it down line by line. The first line references <code>useContext</code>, and we can pass
our <code>AuthContext</code> we constructed earlier. This is passed into our variables <code>[state, dispatcher]</code>.
