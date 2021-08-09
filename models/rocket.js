"use strict";
var Rocket = /** @class */ (function () {
    function Rocket(code) {
        this.propellers = new Array();
        this.currentPower = 0;
        this.accelerationPower = 10;
        this.shownOnScreen = false;
        this.code = code;
    }
    Rocket.prototype.addPropeller = function (propeller) {
        this.propellers.push(propeller);
    };
    Rocket.prototype.accelerate = function () {
        var _this = this;
        // Comparar la currentPower de cada propeller al maximumPower per saber si pot seguir augmentant o no. 
        var newArrayOfPropellersCurrentPowers = this.propellers.map(function (propeller) {
            if (propeller.currentPower < propeller.maximumPower) {
                propeller.currentPower += _this.accelerationPower;
                _this.currentPower += _this.accelerationPower;
            }
            ;
        });
    };
    Rocket.prototype.break = function () {
        var _this = this;
        // Comparar la currentPower de cada propeller al maximumPower per saber si pot seguir disminuint o no. 
        var newArrayOfPropellersCurrentPowers = this.propellers.map(function (propeller) {
            if (propeller.currentPower >= 10) {
                propeller.currentPower -= _this.accelerationPower;
                _this.currentPower -= _this.accelerationPower;
            }
            ;
        });
    };
    return Rocket;
}());
