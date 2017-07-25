export const XMAS_SURCHARGE = 3.5;
export const INCOMPLETE_FIELDS_MESSAGE = 'please complete all fields';

export const calculateSterlingTotalPrice = ({price: skuPrice}, {price: shippingPrice}, {deliveryDate, isXmasDate}, deliveryQuantity) => {  
  if (!skuPrice || !shippingPrice || !deliveryDate || !deliveryQuantity) {
    return INCOMPLETE_FIELDS_MESSAGE;
  }
  const total = (parseFloat(skuPrice) * deliveryQuantity) + (parseFloat(shippingPrice) + (isXmasDate ? XMAS_SURCHARGE : 0));
  return `£${total.toFixed(2)}`
}

export const checkIsANumber = n => !!n && !Number.isNaN(parseFloat(n));

export class PriceCalculatorService {
  constructor() {
    this.state = {
      totalPrice: '',
      selectedSKUData: {},
      selectedShippingData: {},
      deliveryDateData: {},
      deliveryQuantity: 1
    }
  }

  setSKUData({name, price}) {
    if (checkIsANumber(price)) {
      this.state.selectedSKUData = {name, price};
      this.updatePrice();
    }
  }

  setShippingData({price}) {
    if (checkIsANumber(price)) {
      this.state.selectedShippingData = {price};
      this.updatePrice();
    }
  }

  setDeliveryDate({selectedDate: deliveryDate, isXmasDate}) {
    this.state.deliveryDateData = {deliveryDate, isXmasDate};
    this.updatePrice();
  }

  setDeliveryQuantity(quantity = 1) {
    this.state.deliveryQuantity = quantity;
    this.updatePrice();
  }

  updatePrice() {
    const {
      selectedSKUData,
      selectedShippingData,
      deliveryDateData,
      deliveryQuantity
    } = this.state;
    this.state.totalPrice = calculateSterlingTotalPrice(
      selectedSKUData,
      selectedShippingData,
      deliveryDateData,
      deliveryQuantity
    )
  }

  getState() {
    return this.state;
  }
}

export default () => new PriceCalculatorService();