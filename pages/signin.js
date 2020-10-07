import React from 'react';
import Page from '../hoc/defaultPage';
import asyncComponent from '../util/asyncComponent'

const SignIn = asyncComponent(() => import('../containers/SignIn'));

export default Page(() => <SignIn/>);
