import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {SubSection} from '../../domain/sub-section';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

// import './ckeditor-loader';
// import 'ckeditor';


@Component({
  selector: 'ngx-add-edit-subsection',
  templateUrl: './add-edit-subsection.component.html',
  styleUrls: ['./add-edit-subsection.component.scss'],
})
export class AddEditSubsectionComponent implements OnInit {

  @Input() editSubsection: SubSection;
  @Input() header: string;

  public addSubSectionForm: FormGroup;
  public subsectionNumber: AbstractControl;
  public subsectionTitle: AbstractControl;
  public subsectionDescription: AbstractControl;
  public subsectionStory: AbstractControl;

  public Editor = ClassicEditor;

  constructor(private builder: FormBuilder, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.addSubSectionForm = this.builder.group({
      'subsectionNumber': ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      'subsectionTitle': ['', Validators.required],
      'subsectionDescription': [''],
      'subsectionStory': [''],
    });

    this.subsectionNumber = this.addSubSectionForm.controls['subsectionNumber'];
    this.subsectionTitle = this.addSubSectionForm.controls['subsectionTitle'];
    this.subsectionDescription = this.addSubSectionForm.controls['subsectionDescription'];
    this.subsectionStory = this.addSubSectionForm.controls['subsectionStory'];

    if (this.editSubsection) {
      this.populateForm();
    }
  }

  closeModal(): void {
    this.activeModal.close();
  }

  addSubSection(entity, isValid: boolean): void {
    if (isValid) {
      let subsection = this.editSubsection;
      if (!subsection) {
        subsection = new SubSection();
      }
      subsection.subsectionTitle = entity.subsectionTitle;
      subsection.subsectionNumber = +entity.subsectionNumber;
      subsection.story = entity.subsectionStory;
      subsection.subsectionDescription = entity.subsectionDescription;
      this.activeModal.close(subsection);
    }
  }

  private populateForm(): void {
    this.subsectionNumber.setValue(this.editSubsection.subsectionNumber);
    this.subsectionTitle.setValue(this.editSubsection.subsectionTitle);
    this.subsectionDescription.setValue(this.editSubsection.subsectionDescription);
    this.subsectionStory.setValue(this.editSubsection.story);
  }

  onEditorChange(event): void {
    this.subsectionStory.setValue(event);
  }

}
