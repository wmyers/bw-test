import angular from 'angular';
import uirouter from 'angular-ui-router';

import routes from './checkout.routes.js';

import datePicker from './datePicker/datePicker.component';
import numberOfDeliveries from './numberOfDeliveries/numberOfDeliveries.component';
import shippingCombo from './shippingCombo/shippingCombo.component';
import skuList from './skuList/skuList.component';
import totalPrice from './totalPrice/totalPrice.component';

import SkusService from '../services/skus.service';
import ShippingService from '../services/shipping.service';
import PriceCalculatorService from '../services/priceCalculator.service';

export default angular.module('app.checkout', [uirouter, 'ui.bootstrap'])
  .config(routes)
  .component('datePicker', datePicker)
  .component('numberOfDeliveries', numberOfDeliveries)
  .component('shippingCombo', shippingCombo)
  .component('skuList', skuList)
  .component('totalPrice', totalPrice)
  .service('SkusService', SkusService)
  .service('ShippingService', ShippingService)
  .service('PriceCalculatorService', PriceCalculatorService)
  .name