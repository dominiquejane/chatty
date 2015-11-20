'use strict';

angular.module('chattyApp')
  .controller('MessageCtrl', function ($scope, messageService) {
    $scope.messages = [];

    messageService.getMessages().then(function(response) {
  		$scope.messages = response.data;
		});
  });
