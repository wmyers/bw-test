export default class ShippingService {
  static $inject = ['$http'];  
  constructor($http) {
    this.$http = $http
  }

  getShippingOptions() {
    return this.$http.get('test-data/shipping-options.json').then(options => options.data);
  }

}