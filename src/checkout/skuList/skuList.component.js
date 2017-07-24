import styles from './skuList.css';

const skuListCtrl = $scope => {  
  $scope.styles = styles;
};
// skuListCtrl.$inject = ['$scope'];

module.exports = {
  template: require('./skuList.html'),
  controller: skuListCtrl,
  bindings: {
    skus: '<'
  }
}