import styles from './datePicker.css';

datePickerCtrl.$inject = ['$scope', 'PriceCalculatorService']; 
function datePickerCtrl ($scope, PriceCalculatorService){  
  $scope.styles = styles;
};

module.exports = {
  template: require('./datePicker.html'),
  controller: datePickerCtrl,
  bindings: {
    deliveryDate: '<'
  }
}