interface CarItem {
  id: string
  name: string
  model: string
  tel: string
  pricePerDay: number
  picture: string
  rating:number
  
  }

  
  
  interface CarJson {
    success: boolean,
    count: number,
    data: CarItem[]
  }

    
  interface RentalJson {
    success: boolean,
    count: number,
    data: RentalItem[]
  }

  interface RentalJson1 {
    success: boolean,
    count: number,
    data: RentalItem
  }

  interface RentalItem {
    _id?: string
    carId: string
    carModel: string
    numOfDays: number
    assumePrice: number
    pickupDate: string
    pickupLocation: string
    returnDate: string
    returnLocation: string
    user?: string
    car?: CarItem
  }

  
  
  interface UserJson {
    success: boolean,
    count: number,
    data: User
  }


  interface User {
    _id: string
    name: string
    tel: string
    email: string
    address: string
    role: string
  }