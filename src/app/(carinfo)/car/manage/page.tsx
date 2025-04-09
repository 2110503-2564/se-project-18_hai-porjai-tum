import DashboardPage from "@/components/Dashboard";

export default function ManageCars ({ searchParams }: { searchParams: { [id: string]: string | undefined } }) {
    return (
        <main>
            <div className="text-center text-lg">Manage Your Cars</div>
            <DashboardPage id={searchParams["id"]} name={searchParams["name"]} model={searchParams["model"]} tel={searchParams["tel"]}
            pic={searchParams["pic"]} rate={searchParams["rate"]} tier={searchParams["tier"]}/>
        </main>
    );
}