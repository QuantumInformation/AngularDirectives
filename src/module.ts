import {NgModule} from '@angular/core';

import {MoneyInput} from './money-input';

@NgModule({
  declarations: [
    MoneyInput,
  ],
  exports: [
    MoneyInput,
  ],
})
export class MoneyInputModule {}
