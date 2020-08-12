import Head from 'next/head';
import BasicFlow from '../components/FlowChart';
import NextLink from 'next/link';
import MuiLink from '@material-ui/core/Link';
import { Button } from '@material-ui/core';
import theme from '../components/Paperbase';

const Home = (): JSX.Element => {
  return (
    <div className="App">
      <Head>
        <title>FaaSCompose</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicFlow />
      <Button color="primary">Hello World</Button>
    </div>    
  );
};

export default Home;
