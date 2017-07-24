export default class PriceCalculatorService {
  constructor() {
    this.price = null;
    this.selectedBouquetData = null;
    this.selectedShippingData = null;
    this.deliveryDateExcess = null;
    this.deliveryQuantity = null;
  }

  setBouquetData({name, price}) {
    this.selectedBouquetData = {name, price};
  }

  setShippingData({price}) {
    console.log('>>>>> setShippingData price', price);
    this.selectedShippingData = {price};
  }

  setDeliveryDate(deliveryDate) {
    this.deliveryDateExcess = getDeliveryDateExcess(deliveryDate);
  }

  setDeliveryQuantity(quantity) {
    console.log('>>>>> setDeliveryQuantity quantity', quantity);
    this.deliveryQuantity = quantity;
  }

  getDeliveryDateExcess(deliveryDate) {
    
  }

  getPrice() {
    
  }
}