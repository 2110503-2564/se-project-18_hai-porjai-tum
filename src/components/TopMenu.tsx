// components/TopMenu.tsx
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions';
import TopMenuClient from './TopMenuClient';

export default function TopMenu() {
  return <TopMenuClient  />;
}
