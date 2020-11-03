import React, { useEffect } from 'react';
import { Router } from '@reach/router';
import Layout from '../components/layout';
import { navigate } from 'gatsby';
import Navigation from '../components/app/Navigation';
import Dashboard from '../components/app/Dashboard';
import Account from '../components/app/Account';
import useAuth from '../hooks/useAuth';

const App = ({ location }) => {
    const { state, isAuthenticated } = useAuth();
    //meant to redirect user back to original page before redirection to login page
    const redirect = location.pathname.split('/').pop();
    useEffect(() => {
        if (!isAuthenticated) {
            //navigate is specific to gatsby, and acts like window.location = xyz
            navigate('/login', { state: { redirect } });
        }
        //everytime isAuthenticated and redirect is updated, run this useEffect()
    }, [isAuthenticated, redirect]);

    return (
        <Layout>
            <pre>{JSON.stringify(state, null, 2)}</pre>
            <Navigation />
            <Router basepath="/app">
                <Account path="/account" />
                <Dashboard default />
            </Router>
        </Layout>
    );
};

export default App;
