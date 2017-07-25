# bw-test

Built with node `v6.2.2`

```
npm i
npm start
```

Browse to <http://localhost:8080>

To test
```
npm run test
```

### Tested in:
 - Chrome `Version 59.0.3071.115 (Official Build) (64-bit)`
 - Firefox `54.0.1 (64-bit)`
 - Safari `Version 9.1 (11601.5.17.1)`

### Questions
 - the `amount of deliveries being requested` does not seem to feature in the UI at <https://www.bloomandwild.com/send-flowers>. So I have made this a multiplier of the bouquet price, but not the delivery price.

### Issues
 - there is a bug with the angular-uib-datepicker where clicking on a date with a `custom class` then only re-renders dates on and after the date clicked (not before). Seems to be referenced here: https://github.com/angular-ui/bootstrap/issues/4626


