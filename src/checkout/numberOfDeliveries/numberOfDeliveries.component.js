import styles from './numberOfDeliveries.css';

numberOfDeliveriesCtrl.$inject = ['$scope', 'PriceCalculatorService']; 
function numberOfDeliveriesCtrl($scope, PriceCalculatorService) {  
  $scope.styles = styles;
  $scope.data = {
    numDeliveries: 1
  }
  this.selectNumDeliveries = (quantity) => {
    PriceCalculatorService.setDeliveryQuantity(quantity);  
  }
};

export default {
  template: require('./numberOfDeliveries.html'),
  controller: numberOfDeliveriesCtrl
}