import ManageCarPage from '@/components/ManageCar'

export default async function ManageCar({ searchParams }: { searchParams: { [id: string]: string | undefined } }) {

    return (
        <main>
            <div className="text-center text-lg">Manage Your Cars</div>
            <ManageCarPage id={searchParams["id"]} name={searchParams["name"]} model={searchParams["model"]} tel={searchParams["tel"]}
                pic={searchParams["pic"]} rate={searchParams["rate"]} tier={searchParams["tier"]} />
        </main>
    );
}