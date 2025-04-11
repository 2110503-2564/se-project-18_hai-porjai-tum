import getCars from '@/libs/getCars';
import getUserProfile from '@/libs/getUserProfile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Card from '@/components/Card';
import Link from 'next/link';

const covers: Record<string, string> = {
  Bronze: '/img/tinderbg.png',
  Silver: '/img/tinderbg.png',
  Gold: '/img/tinderbg.png',
  Platinum: '/img/tinderbg.png',
  Diamond: '/img/tinderbg.png',
};

export default async function TierPage({ params }: { params: { tier: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    return <p className="text-white text-center mt-10">Please sign in.</p>;
  }

  const userProfile = await getUserProfile(session.user.token);
  const allCars = await getCars();
  const tierCars = allCars.data.filter((car: any) => car.tier === params.tier);
  const backgroundImage = covers[params.tier] || '/img/tinderbg.png';

  return (
    <div
      className="pt-10 px-4 min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <h2 className="text-2xl text-white text-center font-bold mb-6">
        Showing Cars in Tier: <span className="underline">{params.tier}</span>
      </h2>

      <div className="flex flex-wrap justify-center gap-6">
        {tierCars.length > 0 ? (
          tierCars.map((car: any) => (
            <Link
              key={car.id}
              href={`/car/${car.id}`}
              className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-2"
            >
              <Card
                carName={car.name}
                imgSrc={car.picture}
                rating={car.rating}
                tier={car.tier}
                userTier={getTier(userProfile.data.payment)}
              />
            </Link>
          ))
        ) : (
          <p className="text-white text-center w-full">No cars found for this tier.</p>
        )}
      </div>
    </div>
  );
}

function getTier(price: number) {
  if (price < 1000) return 'Bronze';
  else if (price < 2000) return 'Silver';
  else if (price < 4000) return 'Gold';
  else if (price < 7000) return 'Platinum';
  else return 'Diamond';
}