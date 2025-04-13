import Banner2 from '@/components/Banner2'
import Footer from '@/components/Footer'
import getCars from '@/libs/getCars'
import TopSpenderButton from '@/components/topspenderbut';

export default async function Home() {
  const carsJsonReady = await getCars();

  return (
    <main className="relative w-full bg-[url('/img/tinderbg.png')] bg-cover bg-center">
      <Banner2 cars={carsJsonReady.data} />
      <TopSpenderButton />
      <Footer />
    </main>
  );
}
