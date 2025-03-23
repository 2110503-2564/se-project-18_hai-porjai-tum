interface CarItem {
    _id: string,
    name: string,
    address: string,
    district: string,
    province: string,
    postalcode: string,
    tel: string,
    picture: string,
    dailyrate: number,
    __v: number,
    id: string
  }

  
  
  interface CarJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: CarItem[]
  }

    
  interface RentalJson {
    success: boolean,
    count: number,
    pagination: Object,
    data: RentalItem[]
  }


  interface RentalItem {
    nameLastname: string;
    tel: string;
    venue: string;
    bookDate: string;
  }