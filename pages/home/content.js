import Head from "next/head";
import Page from "../../hoc/securedPage/index";
import Cards from "../../components/Cards";
import UserCard from "../../components/Cards/UserCard";
import Search from "../../components/Search";
import UploadImage from "../../components/UploadImage";
import Subscribe from "../../containers/Subscribe";
export default Page(() => (
  <>
    <Head>
      <title>Home</title>
    </Head>
    <div className="app-wrapper">
      {/* <Cards /> */}
       {/* <UploadImage /> */}
      <br/>
      {/* <Subscribe/> */}
      <br/>
      {/* <Search /> */}
      <UserCard />
    </div>
  </>
));
