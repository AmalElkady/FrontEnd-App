import Head from 'next/head';
import Page from '../../hoc/securedPage';
import asyncComponent from "../../util/asyncComponent";

const ColorPicker = asyncComponent(() => import('../../app/components/ColorPicker'));

export default Page(() => (
    <>
        <Head>
            <title>ColorPicker Components</title>
        </Head>
        <div className="app-wrapper">
            <ColorPicker/>
        </div>
    </>
));