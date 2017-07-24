import styles from './shippingCombo.css';

shippingComboCtrl.$inject = ['$scope', 'PriceCalculatorService']; 
function shippingComboCtrl($scope, PriceCalculatorService) {  
  $scope.styles = styles;
  $scope.data = {
    shippingChoice: "0"
  }
  this.selectShipping = (optionIndex) => {
    const {price} = this.options[Number(optionIndex)];
    PriceCalculatorService.setShippingData({price});  
  }
};

module.exports = {
  template: require('./shippingCombo.html'),
  controller: shippingComboCtrl,
  bindings: {
    options: '<'
  }
}