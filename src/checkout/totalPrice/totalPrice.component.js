import styles from './totalPrice.css';

totalPriceCtrl.$inject = ['$scope', 'PriceCalculatorService'];
function totalPriceCtrl($scope, PriceCalculatorService) {  
  $scope.styles = styles;
  this.state = PriceCalculatorService.getState();
};

export default {
  template: require('./totalPrice.html'),
  controller: totalPriceCtrl
}