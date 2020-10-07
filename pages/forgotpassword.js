import React from 'react';
import Page from '../hoc/defaultPage';
import asyncComponent from '../util/asyncComponent'

const ForgotPassword = asyncComponent(() => import('../containers/ForgotPassword'));

export default Page(() => <ForgotPassword/>);
