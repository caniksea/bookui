import { Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Section} from '../../domain/section';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Class} from 'leaflet';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import './ckeditor-loader';
// import 'ckeditor';

@Component({
  selector: 'ngx-add-edit-section',
  templateUrl: './add-edit-section.component.html',
  styleUrls: ['./add-edit-section.component.scss'],
})
export class AddEditSectionComponent implements OnInit {

  @Input() editSection: Section;
  @Input() header: string;

  public addSectionForm: FormGroup;
  public sectionNumber: AbstractControl;
  public sectionTitle: AbstractControl;
  public sectionDescription: AbstractControl;
  public sectionStory: AbstractControl;

  public Editor = ClassicEditor;

  constructor(private builder: FormBuilder, private activeModal: NgbActiveModal) { }

  ngOnInit() {
    this.addSectionForm = this.builder.group({
      'sectionNumber': ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      'sectionTitle': ['', Validators.required],
      'sectionDescription': [''],
      'sectionStory': [''],
    });

    this.sectionNumber = this.addSectionForm.controls['sectionNumber'];
    this.sectionTitle = this.addSectionForm.controls['sectionTitle'];
    this.sectionDescription = this.addSectionForm.controls['sectionDescription'];
    this.sectionStory = this.addSectionForm.controls['sectionStory'];

    if (this.editSection) {
      this.populateForm();
    }

  }

  closeModal(): void {
    this.activeModal.close();
  }
  addSection(entity, isValid: boolean): void {
    if (isValid) {
      let section = this.editSection;
      if (!section) {
        section = new Section();
      }
      section.sectionNumber = +entity.sectionNumber;
      section.sectionTitle = entity.sectionTitle;
      section.story = entity.sectionStory;
      section.sectionDescription = entity.sectionDescription;
      this.activeModal.close(section);
    }

  }
  private populateForm(): void {
    this.sectionNumber.setValue(this.editSection.sectionNumber);
    this.sectionTitle.setValue(this.editSection.sectionTitle);
    this.sectionDescription.setValue(this.editSection.sectionDescription);
    this.sectionStory.setValue(this.editSection.story);
  }

  onEditorChange(event): void {
    this.sectionStory.setValue(event);
  }

}
