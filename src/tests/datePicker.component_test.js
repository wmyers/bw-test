import {expect} from 'chai';

import isXmasDeliveryDate from '../utils/isXmasDeliveryDate';

describe('isXmasDeliveryDate', () => {
  const dateBeforeToday = new Date(1995, 3, 10);
  const today = new Date(1995, 4, 10);
  const dateNotDuringXmas = new Date(1995, 10, 26);
  const dateDuringXmas = new Date(1995, 11, 26);

  it('returns false if the selected date is not today or later', () => {
    expect(isXmasDeliveryDate(dateBeforeToday, today)).to.be.false;
  });  
  it('returns false if the selected date is not between Dec 23rd and Jan 3rd', () => {
    expect(isXmasDeliveryDate(dateNotDuringXmas, today)).to.be.false;
  });
  it('returns true if the selected date is today or later and is between Dec 23rd and Jan 3rd', () => {
    expect(isXmasDeliveryDate(dateDuringXmas, today)).to.be.true;
    expect(isXmasDeliveryDate(dateDuringXmas, dateDuringXmas)).to.be.true;
  });
})