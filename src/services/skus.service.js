export default class SkusService {
  static $inject = ['$http'];  
  constructor($http) {
    this.$http = $http
  }

  getSKUs() {
    return this.$http.get('test-data/flowers.json')
    .then(flowers => {
      return flowers.data.collections[0].skus
        .slice(0, 6)
        .map(sku => {
          const {
            name, 
            default_bouquet: {
              image_urls: {
                website_small: imageUrl
              }
            },
            pricings
          } = sku;
          const price = `£${pricings.find(pricing => pricing.quantity === 1).amount}`;
          return {
            name,
            imageUrl,
            price
          };
        })
    });
  }
}