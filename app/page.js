import dynamic from 'next/dynamic'

const Scene = dynamic(() => import('@/components/Scene'), {
  // loading: () => <p>Loading...</p>,
  ssr: false
})

const Home = () => {
  return (
      <main className="relative h-screen">
        <Scene />
        {/* <div>Hello</div> */}
      </main>
  );
};

export default Home;
