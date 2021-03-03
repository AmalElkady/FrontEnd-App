import Head from "next/head";
import Page from "../../hoc/securedPage/index";

import Messages from "../../components/chatPanel/Conversation";

import ContactList from "../../components/chatPanel/ContactList";
import ChatUserList from "../../components/chatPanel/ChatUserList";

export default Page(() => (
  <>
    <Head>
      <title>Love</title>
    </Head>
    <div className="app-wrapper">
      <Messages />
      {/* <ContactList /> */}
      {/* <ChatUserList /> */}
    </div>
  </>
));
