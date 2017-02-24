/**
 * This directive is designed to work in a form with a scope variable that represents money
 * I does a lot of auto validation and formating and only flags an error if non value is entered (required directive on model)
 * It could be less of an autocomplete by adding multiple validation steps to the ngModel.$validators but I don't see its benifit over the current implementation
 */

myApp.directive('moneyInput', function () {
	return {
		restrict: 'A',
		require: 'ngModel',
		scope: {
			money: '='
		},

		link: function (scope, element, attrs, ngModel) {

zz
			/**
			 *
			 * @param string This is an arbritary string from an input that could contain anything, ie from a key press or copy paste/
			 * todo investigate where to prevent unwanted key presses at the input level, but since we need to remove auto generated commas we will stick with this approach for now
			 * @returns {Number}
			 */
			function convertInputStringToFloat(string) {
				//get rid of non numeric input

				var value = string.replace(/[^\d.]/g, '');

				//the edge case of 0 only occurs if they enter no numbers
				return value !== '' ? parseFloat(value) : '';
			}

			// we listen to keyboard inputs to multiple amounts (this makes it more simple)
			element.bind("keyup", function (evt) {
				var inputVal = element.val();

				//edge case
				if (inputVal === '') {
					return;
				}

				if (evt.keyCode == 75) {

					inputVal = convertInputStringToFloat(inputVal);
					var parsedVal = parseFloat(inputVal);
					var final = parsedVal * 1000;
					if (final > scope.money.maxValue) {
						element.val(scope.money.maxValueString);
					}
					else {
						element.val(addCommas(final));
					}
				}

				if (evt.keyCode == 77) {
					inputVal = convertInputStringToFloat(inputVal);
					parsedVal = parseFloat(inputVal);
					final = parsedVal * 1000000;
					if (final > scope.money.maxValue) {
						element.val(scope.money.maxValueString);
					}
					else {
						element.val(addCommas(final));
					}
				}

				if (evt.keyCode == 66) {
					inputVal = convertInputStringToFloat(inputVal);
					parsedVal = parseFloat(inputVal);
					final = parsedVal * 1000000000;
					if (final > scope.money.maxValue) {
						element.val(scope.money.maxValueString);
					}
					else {
						element.val(addCommas(final));
					}
				}
			});

			//we perform some validation after the user has finished inputing a value
			element.bind("blur", function (evt) {

				var inputVal = convertInputStringToFloat(element.val());
				parsed = parseFloat(inputVal).toString();
				if (parsed !== "NaN") {
					element.val(addCommas(parsed));
				}
			});

			/**
			 * Adds commas to integer part of input string
			 * note, you can test a "well formed" numeric string with the regex: /(([1-9][,.]?){10})/ but I feel its safer to work with a number primative =
			 * @param inputVal
			 * @returns {string}
			 * @credits to dubila for the adding commas algo http://stackoverflow.com/a/20356224/1339087 http://www.danubilla.com/
			 */
			function addCommas(inputVal) {
				//сonvert to string
				inputVal = inputVal.toString();


				var decimalSplit = inputVal.split(".");
				var intPart = decimalSplit[0];
				var decPart = decimalSplit[1];

				if (intPart.length > 3) {
					var intDiv = Math.floor(intPart.length / 3);
					while (intDiv > 0) {
						var lastComma = intPart.indexOf(",");
						if (lastComma < 0) {
							lastComma = intPart.length;
						}
						if (lastComma - 3 > 0) {
							intPart = intPart.slice(0, lastComma - 3) + "," + intPart.slice(lastComma - 3);
						}
						intDiv--;
					}
				}

				if (decPart === undefined) {
					decPart = "";
				}
				else {
					decPart = "." + decPart;
				}
				var res = intPart + decPart;
				return res;
			}

			function testForOverPrecision(numericVal) {
				return (numericVal.toString().length + 1) > scope.money.maxPrecision;

				//takes a string instead of a nunmber, the former seems more elegant/safe
				//	if (numericVal.replace(/[^1-9]/g, "").length > 10) {
				//numericVal = numericVal.match(/(([1-9][,.]?){10})/).shift();
			}

			//we want to add commas to the number as the user types to aid working with large numbers
			return ngModel.$parsers.push(function (inputValue) {
				var originalVal = element.val(), res;

				//I find it easier to work with a parsed number
				var numericVal = convertInputStringToFloat(originalVal);
				res = addCommas(numericVal);

				//if (res != inputValue && res != "NaN") {
				if (res != inputValue) {
					ngModel.$setViewValue(res);
					ngModel.$render();
				}
				return res;
			});

			//we only want let the user only enter comma formatted numbers
			/*	ngModel.$validators.validPrecision = function (value) {
			 //errorMessage = "max precision: " + scope.money.maxPrecision;

			 return testForOverPrecision(value);

			 };
			 */

		}
	};
});
