import Head from "next/head";
import Page from "../../hoc/securedPage/index";
import Search from "../../components/Search";
import Cards from "../../containers/Cards";
import Connection from "../../hoc/securedPage/Connection";

export default Page(() => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <div className="app-wrapper">
      <Connection />
      <Cards />
    </div>
  </>
));
