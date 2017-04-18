import {Component, HostListener} from '@angular/core'
import {KeyCodes} from "vanilla-typescript";

/**
 * This component represents money.
 */
@Component({
  selector: 'money-input',
  template: '<input type="text" value="{{formattedValue}}">',
})
export class MoneyInput {

  public maxValue = 9999999999
  private formattedValue:string //this is what replaces the text in the input after the user types if an update is needed

  @HostListener('keyup', ['$event'])
  onKeyUp(event: KeyboardEvent) {
    let targetElement: HTMLInputElement = <HTMLInputElement> event.target
    let userInputValueCleansed: string = targetElement.value.replace(/[^\d.]/g, '')
    let hasOnlyOnePeriod = userInputValueCleansed.indexOf('.') === userInputValueCleansed.lastIndexOf('.')
    let periodIsAtEnd = userInputValueCleansed.indexOf('.') === userInputValueCleansed.length - 1

    //edge case, also works at removing junk input
    if (userInputValueCleansed === '') {
      this.formattedValue = ''
      return
    }

    let numericValue: number = parseFloat(userInputValueCleansed)
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

    let newValue = numericValue.toLocaleString()

    //this will let key pressed like ctrl+a or cmd+a, or arrow presses go through
    if(newValue === targetElement.value){
      return
    }

    this.formattedValue = newValue
    if (hasOnlyOnePeriod && periodIsAtEnd) {
      this.formattedValue += '.'
    }
  }
  ngOnInit() {
    console.log('ngOnInit fired');
  }
}
