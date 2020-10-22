import Head from "next/head";
import Page from "../../hoc/securedPage/index";
import Cards from "../../components/Cards";
import UserCard from "../../components/Cards/UserCard";
import Search from "../../components/Search";
export default Page(() => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <div className="app-wrapper">
      {/* <Cards /> */}
      <Search />
      <UserCard />
    </div>
  </>
));
