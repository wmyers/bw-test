import styles from './datePicker.css';

export const isXmasDeliveryDate = (date, today) => {
  const dateToCheck = new Date(date);
  if (dateToCheck >= today) {
    const yearToCheck = dateToCheck.getFullYear();
    const dayToCheck = dateToCheck.setHours(0,0,0,0);
    const startXmasCharging = new Date(yearToCheck, 11, 23).setHours(0,0,0,0);
    const endXmasCharging = new Date(yearToCheck, 0, 3).setHours(23,59,59,999);
    if (dayToCheck >= startXmasCharging || dayToCheck <= endXmasCharging) {
      return true;
    }
  }
  return false;
}

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

module.exports = {
  template: require('./datePicker.html'),
  controller: datePickerCtrl
}