import Head from "next/head";
import Page from "../../hoc/securedPage/index";
import Cards from "../../components/Cards";
import UserCard from "../../components/Cards/UserCard";

export default Page(() => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <div className="app-wrapper">
      {/* <Cards /> */}
      <UserCard />
    </div>
  </>
));
