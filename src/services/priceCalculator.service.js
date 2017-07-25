export const XMAS_SURCHARGE = 3.5;

export const calculateSterlingTotalPrice = ({price: skuPrice}, {price: shippingPrice}, {isXmasDate}, deliveryQuantity) => {  
  if (!skuPrice || !shippingPrice || !deliveryQuantity) {
    return 'please complete all fields';
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

  setDeliveryDate({deliveryDate, isXmasDate}) {
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