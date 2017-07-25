import sinon from 'sinon';
import {expect} from 'chai';

import {PriceCalculatorService} from '../services/priceCalculator.service.js';

describe('price calculator service', () => {
  describe('setSKUData', () => {
    const sku = {
      name: 'The Jessie',
      price: 15
    };
    const service = new PriceCalculatorService();
    sinon.spy(service, 'updatePrice')

    it('updates the state', () => {
      expect(service.getState().selectedSKUData).to.deep.equal({});
      service.setSKUData(sku);
      expect(service.getState().selectedSKUData).to.deep.equal(sku);
    });    
    it('calls the price update method', () => {
      expect(service.updatePrice.calledOnce).to.be.true;
    });
  });
});