import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Profile = asyncComponent(() => import('../../app/socialApps/profile'));

export default Page(() => (
  <>
    <Head>
      <title>profile</title>
    </Head>
    <div className="app-wrapper">
      <Profile/>
    </div>
  </>
));