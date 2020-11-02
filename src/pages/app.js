import React from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import Navigation from '../components/app/Navigation';
import Dashboard from '../components/app/Dashboard';
import Account from '../components/app/Account';

const App = ({ location }) => {
    const redirect = location.pathname.split('/').pop();

    return (
        <Layout>
            <Navigation />
            <Router basepath="/app">
                <Account path="/account" />
                <Dashboard default />
            </Router>
        </Layout>
    );
};

export default App;
