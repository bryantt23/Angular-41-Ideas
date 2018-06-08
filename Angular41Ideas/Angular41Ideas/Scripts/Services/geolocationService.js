app.service('geolocationSvc', ['$q', '$window', function ($q, $window) {

    'use strict';
    function hi() {
        alert("hii");
    }

    function getCurrentPosition() {
        var deferred = $q.defer();

        if (!$window.navigator.geolocation) {
            deferred.reject('Geolocation not supported.');
        } else {
            $window.navigator.geolocation.getCurrentPosition(
                function (position) {
                    deferred.resolve(position);
                },
                function (err) {
                    deferred.reject(err);
                });
        }

        return deferred.promise;
    }
    return {
        hi: hi,
        getCurrentPosition: getCurrentPosition
    };
}]);