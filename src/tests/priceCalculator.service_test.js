import sinon from 'sinon';
import {expect} from 'chai';

import {
  PriceCalculatorService,
  calculateSterlingTotalPrice,
  checkIsANumber,
  INCOMPLETE_FIELDS_MESSAGE,
  XMAS_SURCHARGE
} from '../services/priceCalculator.service';

describe('price calculator service', () => {

  let service;

  beforeEach(() => {
    service = new PriceCalculatorService();
    sinon.spy(service, 'updatePrice');
  });

  afterEach(() => {
    service.updatePrice.restore();
  });

  describe('setSKUData', () => {
    
    const sku = { 
      name: 'The Jessie',
      price: 15
    };

    it('updates the state', () => {
      expect(service.getState().selectedSKUData).to.deep.equal({});
      service.setSKUData(sku);
      expect(service.getState().selectedSKUData).to.deep.equal(sku);
    });  

    it('calls the price update method', () => {
      service.setSKUData(sku);
      expect(service.updatePrice.calledOnce).to.be.true;
    });

    it('does nothing if the price cannot be parsed into a number', () => {
      const badSKU = {
        name: 'The Jessie Again',
        price: '£15'
      }
      service.setSKUData(badSKU);
      expect(service.getState().selectedSKUData).to.not.deep.equal(badSKU);
      expect(service.updatePrice.calledOnce).to.be.false;
    });

  });

  describe('setShippingData', () => {
    
    const shippingData = { 
      price: 6
    };

    it('updates the state', () => {
      expect(service.getState().selectedShippingData).to.deep.equal({});
      service.setShippingData(shippingData);
      expect(service.getState().selectedShippingData).to.deep.equal(shippingData);
    });  

    it('calls the price update method', () => {
      service.setShippingData(shippingData);
      expect(service.updatePrice.calledOnce).to.be.true;
    });

    it('does nothing if the price cannot be parsed into a number', () => {
      const badShippingData = { 
        price: '£6'
      };
      service.setShippingData(badShippingData);
      expect(service.getState().selectedSKUData).to.not.deep.equal(badShippingData);
      expect(service.updatePrice.calledOnce).to.be.false;
    });

  });

  describe('setDeliveryDate', () => {
    
    const deliveryDateData = { 
      deliveryDate: Date.now(), 
      isXmasDate: false
    };

    it('updates the state', () => {
      expect(service.getState().deliveryDateData).to.deep.equal({});
      service.setDeliveryDate(deliveryDateData);
      expect(service.getState().deliveryDateData).to.deep.equal(deliveryDateData);
    });  

    it('calls the price update method', () => {
      service.setDeliveryDate(deliveryDateData);
      expect(service.updatePrice.calledOnce).to.be.true;
    });

  });

  describe('setDeliveryQuantity', () => {
    
    const deliveryQuantity = 2;

    it('updates the state', () => {
      expect(service.getState().deliveryQuantity).to.equal(1);
      service.setDeliveryQuantity(deliveryQuantity);
      expect(service.getState().deliveryQuantity).to.equal(deliveryQuantity);
    });  

    it('calls the price update method', () => {
      service.setDeliveryQuantity(deliveryQuantity);
      expect(service.updatePrice.calledOnce).to.be.true;
    });

  });
});

describe('price calculator service utils', () => {

  describe('calculateSterlingTotalPrice', () => {
    let selectedSKUData;
    let selectedShippingData;
    let deliveryDateData;
    let deliveryQuantity;

    beforeEach(() => {
      selectedSKUData = {price: 15};
      selectedShippingData = {price: 5};
      deliveryDateData = {isXmasDate: false, deliveryDate: Date.now()};
      deliveryQuantity = 1;
    });

    const expectedTotal = 20;

    it('will not calculate the total if selectedSKUData.price is falsy', () => {
      selectedSKUData = {};
      const result = calculateSterlingTotalPrice(selectedSKUData, selectedShippingData, deliveryDateData, deliveryQuantity);
      expect(result).to.equal(INCOMPLETE_FIELDS_MESSAGE);
    });    
    it('will not calculate the total if selectedShippingData.price is falsy', () => {
      selectedShippingData = {};
      const result = calculateSterlingTotalPrice(selectedSKUData, selectedShippingData, deliveryDateData, deliveryQuantity);
      expect(result).to.equal(INCOMPLETE_FIELDS_MESSAGE);
    });    
    it('will not calculate the total if deliveryDateData.deliveryDate is falsy', () => {
      deliveryDateData = {};
      const result = calculateSterlingTotalPrice(selectedSKUData, selectedShippingData, deliveryDateData, deliveryQuantity);
      expect(result).to.equal(INCOMPLETE_FIELDS_MESSAGE);
    }); 
    it('will not calculate the total if deliveryQuantity is falsy', () => {
      deliveryQuantity = 0;
      const result = calculateSterlingTotalPrice(selectedSKUData, selectedShippingData, deliveryDateData, deliveryQuantity);
      expect(result).to.equal(INCOMPLETE_FIELDS_MESSAGE);
    });
    it('will calculate the total if selectedSKUData.price, selectedShippingData.price and deliveryQuantity values are truthy', () => {
      const expectedResult = `£${expectedTotal.toFixed(2)}`;
      const result = calculateSterlingTotalPrice(selectedSKUData, selectedShippingData, deliveryDateData, deliveryQuantity);
      expect(result).to.equal(expectedResult);
    });
    it('will optionally increase the total if deliveryDateData.isXmasDate is truthy', () => {
      deliveryDateData = {...deliveryDateData, isXmasDate: true};
      const expectedResult = `£${(expectedTotal + XMAS_SURCHARGE).toFixed(2)}`;
      const result = calculateSterlingTotalPrice(selectedSKUData, selectedShippingData, deliveryDateData, deliveryQuantity);
      expect(result).to.equal(expectedResult);      
    });
  })

  describe('checkIsANumber', () => {
    it('will return true for any number, or other value that can be parsed into a number, according to JS Number.isNaN conversion logic', () => {
      expect(checkIsANumber(23)).to.be.true;
      expect(checkIsANumber('23')).to.be.true;
      expect(checkIsANumber('23£')).to.be.true;
    })
    it('will return false for any value that cannot be parsed into a number, according to JS Number.isNaN conversion logic', () => {
      expect(checkIsANumber('')).to.be.false;
      expect(checkIsANumber(' ')).to.be.false;
      expect(checkIsANumber('£23')).to.be.false;
    })
  })

});