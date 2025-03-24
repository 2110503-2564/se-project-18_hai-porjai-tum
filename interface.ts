interface CarItem {
  id: string
  name: string
  model: string
  tel: string
  pricePerDay: number
  picture: string
  
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


  interface RentalItem {
    carId: string
    carModel: string
    numOfDays: number
    pickupDate: string
    pickupLocation: string
    returnDate: string
    returnLocation: string
  }