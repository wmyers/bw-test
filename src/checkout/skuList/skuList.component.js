import styles from './skuList.css';

skuListCtrl.$inject = ['$scope', 'PriceCalculatorService'];
function skuListCtrl ($scope, PriceCalculatorService){  
  $scope.styles = styles;
  this.selectSKU = sku => {
    this.selectedSKU = sku;
    const {name, price} = sku;
    PriceCalculatorService.setSKUData({name, price});
  }
};

export default {
  template: require('./skuList.html'),
  controller: skuListCtrl,
  bindings: {
    skus: '<'
  }
}