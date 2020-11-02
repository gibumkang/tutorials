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
