import styles from './datePicker.css';

const isXmasDeliveryDate = (date, today) => {
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

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.options = {
    minDate: new Date(),
    showWeeks: false,
    customClass: data => {
      const {date, mode} = data;
      if (mode === 'day' && isXmasDeliveryDate(date, $scope.dt)) {
        return styles.premium;
      };
      return '';
    }
  };
  this.selectDate = (selectedDate) => {
    const isXmasDate = isXmasDeliveryDate(selectedDate, $scope.dt);
    $scope.selectedDate = `${selectedDate.toDateString()} ${isXmasDate ? 'costs £3.50 more' : ''}`;
  }
};

module.exports = {
  template: require('./datePicker.html'),
  controller: datePickerCtrl
}