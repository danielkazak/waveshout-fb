// Message service
angular.module('starter')
.factory('MessageService', function($rootScope){
    var service = {
      types: {
        success: 'bar bar-footer bar-balanced',
        info: 'bar bar-footer bar-calm',
        error: 'bar bar-footer bar-energized'
      },
      show: function(type, message){
        this.message = message;
        this.messageType = type;
        this.messageVisible = true;
      },
      hide: function(){
        this.message = '';
        this.messageType = '';
        this.messageVisible = false;
      }
    };
    
    return service;
});