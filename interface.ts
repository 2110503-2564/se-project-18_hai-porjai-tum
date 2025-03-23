interface CarItem {
  id: string
  model: string
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