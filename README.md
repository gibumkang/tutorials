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

```JSX
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

```JSX
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

```JSX
//useAuth.js
const DEFAULT_STATE = {
  jwt: null,
  user: {},
  loggedIn: false
}
```

#### 2. Building our reducer with DEFAULT_STATE

Next, we need to build our <code>useReducer</code>. Think of a <code>useReducer</code> as an elaborate switch statement which also acts as a class with multiple functions within one function. These functions are stored in switch statements and allows the developer to utilize it throughout the application.

```JSX
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

```JSX
//useAuth.js
const AuthContext = createContext()
```

Next, you need to wrap your application with your new hook in order to access it application wide:

```JSX
//useAuth.js
const AuthProvider = ({children}) => {
  return <AuthContext.Provider value={useReducer(reducer, DEFAULT_STATE)}>{children}</AuthContext.Provider>
}
```

If we break down the statement above, what we are doing is creating a new function called <code>AuthProvider</code>. Within <code>AuthProvider</code>, we are wrapping our children elements inside our <code>AuthContext</code> variable we just declared earlier. Since it is a <code>createContext()</code> element, we can also pass a value in the tag itself. In this case, we want to apply the <code>useReducer</code> hook and pass in the reducer we built earlier, and start with the <code>DEFAULT_STATE</code>.

#### 4. Gatsby-specific step

For Gatsby, there is a helper function we can utilize to neatly apply our <code>AuthProvider</code> within our application. It is
called the <code>wrapRootElement</code> and it needs to be referenced in a separate gatsby file, but for now, write this within the same file:

```JSX
//useAuth.js
export const wrapRootElement = ({element}) => (
  <AuthProvider>{element}</AuthProvider>
)
```

#### 5. Set useContext inside our useAuth hook

Lastly, we need to actually create our hook, which will be conveniently named <code>useAuth</code>:

```JSX
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
our <code>AuthContext</code> we constructed earlier. This is passed into our variables <code>[state, dispatcher]</code>. This is the standard convention of using a useReducer. Get used to the convention as you will see it a lot. Next, we want to check if our user is Authenticated by passing the checker into a variable. The login object has a lot going on. Combining axios, async/await, and promises seems like an odd choice, but it works. Let's see what is going here.

First, we declare <code>async</code> before credentials as our <code>login()</code> argument. Immediately, we declare a new <code>Promise</code> and within that another <code>async</code> call for resolve and reject. The next argument is the typical <code>try and catch</code> block, which is part of the <code>Promise</code> call declared earlier.

The <code>try</code> block carries the payload, which carries the credentials stored by axios. Axios will make a post request to the url that requires login information, along with the credentials we want to use. This is conveniently stored in <code>{data: payload}</code>. Think of this variable as a token that has already been checked into the authentication portal within strapi with the credentials.

Finally, in the same <code>try</code> block, we are calling the <code>dispatcher</code> and passing in the <code>'LOGIN'</code> case which was declared above in our switch statement, which is really our reducer, along with the <code>payload</code> which stores the credentials.

The <code>catch</code> is self-explanatory. Beneath that is the logout functionality, which then dispatches the <code>'LOGOUT'</code> case within our reducer. We end this codeblock by returning the state, isAuthenticated, login, and logout.

#### Overview of this code, useReducer specifically

Think of a reducer as a function factory. It is the react way of distributing methods within one "factory". The reducer is the factory, and the const <code>[state, dispatcher]</code> is the controller that allows the user to dispatch certain methods. There are a minimum of three things you need to use this factory: DEFAULT_STATE, reducer, and dispatcher.

```JSX
//default state, always capitalized with underscores
const DEFAULT_STATE = {
  count: 0
}

//our reducer, which is really just a switch statement
const reducer = (state, action) => {
  switch(action.type){
    case 'more':
      return {count: state.count + 1}
    case 'less':
      return {count: state.count - 1}
    default:
      throw new Error();
  }
}

//our custom hook
const useCounter = () => {
  const [state, dispatcher] = useReducer(reducer, DEFAULT_STATE);
  return (
    <>
      Count: {state.count}
      <button onClick={() => dispatch({type: 'more'})}>+</button>
      <button onClick={() => dispatch({type: 'less'})}>-</button>
    </>
  )
}

```

This can be done with <code>useState</code>, like so:

```JSX
const [count, setCount] = useState(0);
return (
  <button onClick={() => setCount(count + 1)}>+</button>
  <button onClick={() => setCount(count - 1)}>-</button>
)
```

You can see that it wouldn't make much sense to apply <code>useReducer</code> unless there are more than 3 functions taking place. It's just another flavor of doing the same thing in <code>useState</code> but more efficient and cleaner in some instances.
