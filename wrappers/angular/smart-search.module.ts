import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SmartSearchComponent } from './smart-search.component';

@NgModule({
  declarations: [
    SmartSearchComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SmartSearchComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SmartSearchModule { }