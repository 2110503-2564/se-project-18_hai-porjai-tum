import Banner from '@/components/Banner'
<<<<<<< HEAD
import CardPanel from '@/components/CardPanel';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main>
      <Banner />
=======
import Footer from '@/components/Footer'
import getCars from '@/libs/getCars'

export default async function Home() {
  const carsJsonReady = await getCars();

  return (
    <main className="relative w-full bg-[url('/img/tinderbg.png')] bg-cover bg-center">
      <Banner cars={carsJsonReady.data} />
>>>>>>> d3db22c155123064ed0ed8467211e3e255492ed6
      <Footer />
    </main>
  );
}
