import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditSubsectionComponent } from './add-edit-subsection.component';
import {ThemeModule} from '../../../../../@theme/theme.module';
import {CKEditorModule} from 'ng2-ckeditor';

const components = [
  AddEditSubsectionComponent,
];

@NgModule({
  imports: [
    CommonModule,
    ThemeModule,
    CKEditorModule,
  ],
  declarations: [AddEditSubsectionComponent],
  exports: [...components],
})
export class AddEditSubsectionModule { }
