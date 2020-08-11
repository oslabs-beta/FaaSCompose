import Head from 'next/head';
import BasicFlow from '../components/FlowChart';

const Home = (): JSX.Element => {
  return (
    <div className="App">
      <Head>
        <title>FaaSCompose</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <BasicFlow />
    </div>
  );
};

export default Home;
