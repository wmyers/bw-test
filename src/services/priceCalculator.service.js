export const calculatePrice = () => {
  
}

export default class PriceCalculatorService {
  constructor() {
    this.price = null;
    this.selectedBouquetData = null;
    this.selectedShippingData = null;
    this.deliveryDateData = null;
  }

  setBouquetData({name, price}) {
    this.selectedBouquetData = {name, price};
  }

  setShippingData({price}) {
    console.log('>>>>> setShippingData price', price);
    this.selectedShippingData = {price};
  }

  setDeliveryDate({deliveryDate, isXmasDate}) {
    this.deliveryDateData = {deliveryDate, isXmasDate}
  }

  setDeliveryQuantity(quantity) {
    console.log('>>>>> setDeliveryQuantity quantity', quantity);
    this.deliveryQuantity = quantity;
  }

  getPrice() {
    
  }
}