import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Chat = asyncComponent(() => import('../../app/chatPanel/Redux'));

export default Page(() => (
  <>
    <Head>
      <title>Chat Redux</title>
    </Head>
    <div className="app-wrapper">
      <Chat/>
    </div>
  </>
));