import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddEditChapterComponent } from './add-edit-chapter.component';
import {ThemeModule} from '../../../../../@theme/theme.module';
// import {CKEditorModule} from 'ng2-ckeditor';

const components = [
  AddEditChapterComponent,
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
export class AddEditChapterModule { }
