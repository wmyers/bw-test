routes.$inject = ['$stateProvider'];
export default function routes($stateProvider) {
  $stateProvider
  .state('checkout', {
    url: '/',
    template: require('./checkout.html'),
    resolve: {
      skus: ['SkusService', (SkusService) => {
        return SkusService.getSKUs();
      }],     
      shippingOptions: ['ShippingService', (ShippingService) => {
        return ShippingService.getShippingOptions();
      }]
    }
  });
}