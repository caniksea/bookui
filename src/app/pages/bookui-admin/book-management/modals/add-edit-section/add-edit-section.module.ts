import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditSectionComponent } from './add-edit-section.component';
import {ThemeModule} from '../../../../../@theme/theme.module';
// import {CKEditorModule} from 'ng2-ckeditor';

const components = [
  AddEditSectionComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    // CKEditorModule,
  ],
  // declarations: [...components],
  // exports: [...components],
})
export class AddEditSectionModule { }
