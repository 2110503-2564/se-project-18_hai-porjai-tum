import DashboardPage from "@/components/Dashboard";

export default function ManageCars({ searchParams }: { searchParams: { [id: string]: string | undefined } }) {
    return (
        <main>
            <DashboardPage searchParams={searchParams} />
        </main>
    );
}