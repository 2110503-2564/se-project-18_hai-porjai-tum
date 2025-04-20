import ManageCarPage from '@/components/ManageCar'
import CarEditMenu from '@/components/CarEditMenu';
import getCars from '@/libs/getCars';

export default async function ManageCar({ searchParams }: { searchParams: { [id: string]: string | undefined } }) {
    const carsJson = getCars()

    return (
        <main>
            <div className="text-center text-lg">Manage Your Cars</div>
            <div className='flex flex-row'>
            <CarEditMenu carsJson={carsJson}/>
            <ManageCarPage id={searchParams["id"]} name={searchParams["name"]} model={searchParams["model"]} tel={searchParams["tel"]}
                pic={searchParams["pic"]} rate={searchParams["rate"]} tier={searchParams["tier"]} />
            </div>
        </main>
    );
}