import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const Chat = asyncComponent(() => import('../../app/chatPanel/Basic'));

export default Page(() => (
  <>
    <Head>
      <title>Chat</title>
    </Head>
    <div className="app-wrapper">
      <Chat/>
    </div>
  </>
));