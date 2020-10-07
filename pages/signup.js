import React from 'react';
import Page from '../hoc/defaultPage';
import asyncComponent from '../util/asyncComponent'

const SignUp = asyncComponent(() => import('../containers/SignUp'));

export default Page(() => <SignUp/>);
