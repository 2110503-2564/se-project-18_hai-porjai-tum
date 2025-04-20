import { getServerSession } from 'next-auth';
import getUserProfile from '@/libs/getUserProfile';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import addCar from '@/actions/addCar';
import editCar from '@/actions/editCar';
import Link from 'next/link'; // ✅ Correct import for routing

export default function DashboardPage({ searchParams }: { searchParams: { [id: string]: string | undefined } }) {

  return (
    <div className="space-y-4">
      <Link href="/car/manage/cars" className="text-blue-500 underline">
        Go to Manage Cars
      </Link>

      <Link href="/car/manage/users" className="text-blue-500 underline">
        Go to Manage Users
      </Link>
    </div>
  );
}
