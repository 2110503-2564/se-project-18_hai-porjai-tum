import getCars from '@/libs/getCars';
import getUserProfile from '@/libs/getUserProfile';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import Card from '@/components/Card';
import Link from 'next/link';
import TierClient from './TierClient'; // ✅ ใช้งานจากไฟล์แยก
import { getTier } from '@/utils/getTier';

const covers: Record<string, string> = {
  Bronze: '/img/tinderbg.png',
  Silver: '/img/tinderbg.png',
  Gold: '/img/tinderbg.png',
  Ruby: '/img/tinderbg.png',
  Diamond: '/img/tinderbg.png',
};

export default async function TierPage({ params }: { params: { tier: string } }) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user.token) {
    return <p className="text-white text-center mt-10">Please sign in.</p>;
  }

  const userProfile = await getUserProfile(session.user.token);
  const allCars = await getCars();
  const filteredCars = allCars.data.filter((car: any) => car.tier === params.tier);
  const userTier = getTier(userProfile.data.payment);
  const backgroundImage = covers[params.tier] || '/img/tinderbg.png';

  return (
    <TierClient
      tier={params.tier}
      cars={filteredCars}
      userTier={userTier}
      backgroundImage={backgroundImage}
    />
  );
}


