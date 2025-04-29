import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/authOptions'
import ManageUserPage from '@/components/ManageUser'

export default async function ManageUser() {
    const session = await getServerSession(authOptions)
    const token = session?.user.token || ''

    return (
        <main className="p-6">
            <div className="text-center text-lg mb-4">Manage Users</div>
            {session && (session.user.role === 'admin') ? <ManageUserPage token={token} /> : null}
        </main>
    )
}
