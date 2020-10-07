import React from 'react';
import Page from '../hoc/defaultPage';
import asyncComponent from '../util/asyncComponent'

const VerifyEmail = asyncComponent(() => import('../containers/VerifyEmail'));

export default Page(() => <VerifyEmail/>);