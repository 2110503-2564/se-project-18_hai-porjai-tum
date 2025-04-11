import Banner from '@/components/Banner'
import Footer from '@/components/Footer'
import getCars from '@/libs/getCars'

export default async function Home() {
  const carsJsonReady = await getCars();

  return (
    <main className="relative w-full bg-[url('/img/tinderbg.png')] bg-cover bg-center">
      <Banner cars={carsJsonReady.data} />
      <Footer />
    </main>
  );
}
