import {Component, HostListener} from '@angular/core'
import {KeyCodes} from "vanilla-typescript";

/**
 * This component represents money.
 */
@Component({
  selector: 'money-input',
  template: '<input type="text">',
})
export class MoneyInput {

  public maxValue = 9999999999

  @HostListener('keyup', ['$event'])
  onKeyUp(event) {
    let targetElement: HTMLInputElement = event.target
    let inputValue: string = event.target.value.replace(/[^\d.]/g, '')

    //edge case, also works at removing junk input
    if (inputValue === '') {
      targetElement.value = ''
      return
    }

    //ignore input string navigation
    if (event.keyCode == KeyCodes.LEFT || event.keyCode == KeyCodes.RIGHT) {
      return
    }

    let numericValue: number = parseFloat(inputValue)
    if (event.keyCode == KeyCodes.k) {
      numericValue = numericValue * 1000
    } else if (event.keyCode == KeyCodes.m) {
      numericValue = numericValue * 1000000
    } else if (event.keyCode == KeyCodes.b) {
      numericValue = numericValue * 1000000000
    }
    if (numericValue > this.maxValue) {
      numericValue = this.maxValue
    }
    targetElement.value = addCommas(numericValue)
  }
}

function addCommas(inputValue: number): string {
  let inputString: string = inputValue.toString()


  var decimalSplit: string[] = inputString.split(".")
  var intPart: string = decimalSplit[0]
  var decPart: string = decimalSplit[1]

  if (intPart.length > 3) {
    var intDiv = Math.floor(intPart.length / 3)
    while (intDiv > 0) {
      var lastComma = intPart.indexOf(",")
      if (lastComma < 0) {
        lastComma = intPart.length
      }
      if (lastComma - 3 > 0) {
        intPart = intPart.slice(0, lastComma - 3) + "," + intPart.slice(lastComma - 3)
      }
      intDiv--
    }
  }
  if (decPart === undefined) {
    decPart = ""
  }
  else {
    decPart = "." + decPart
  }
  var res = intPart + decPart
  return res
}
