
import dynamic from 'next/dynamic'

const StoreScene = dynamic(() => import('@/components/StoreScene'), {
  // loading: () => <p>Loading...</p>,
  ssr: false
})

const Store = () => {
  return (
    <>
      <main className="relative h-screen">
        <StoreScene />
        {/* <div>Hello</div> */}
      </main>
    </>
  );
};

export default Store;
