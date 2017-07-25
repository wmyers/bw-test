import styles from './datePicker.css';
import isXmasDeliveryDate from '../../utils/isXmasDeliveryDate';

datePickerCtrl.$inject = ['$scope', 'PriceCalculatorService']; 
function datePickerCtrl ($scope, PriceCalculatorService){  
  $scope.styles = styles;
  this.dt = new Date();
  this.options = {
    minDate: new Date(),
    showWeeks: false,
    customClass: ({date, mode}) => {
      if (mode === 'day' && isXmasDeliveryDate(date, this.dt)) {
        return styles.premium;
      };
      return '';
    }
  };
  this.selectDate = (selectedDate) => {
    const isXmasDate = this.isXmasDate = isXmasDeliveryDate(selectedDate, this.dt);
    this.selectedDate = `${selectedDate.toDateString()}`;
    PriceCalculatorService.setDeliveryDate({selectedDate, isXmasDate});
  };
};

export default {
  template: require('./datePicker.html'),
  controller: datePickerCtrl
}