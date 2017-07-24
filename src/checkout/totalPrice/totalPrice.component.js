import styles from './totalPrice.css';

const totalPriceCtrl = $scope => {  
  $scope.styles = styles;
};

module.exports = {
  template: require('./totalPrice.html'),
  controller: totalPriceCtrl,
  bindings: {
    totalPrice: '<'
  }
}