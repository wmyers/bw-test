import angular from 'angular';
import uirouter from 'angular-ui-router';
require('angular-uib-datepicker');

import routes from './app.routes';
import checkout from '../checkout';

angular.module('app', [uirouter, 'ui.bootstrap', checkout])
  .config(routes)
