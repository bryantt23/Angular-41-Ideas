app.filter('celsiusToFarenheit', function () {
    return function (x) {
        return x * 9 / 5 + 32 + " degrees Farenheit";
    };
});
