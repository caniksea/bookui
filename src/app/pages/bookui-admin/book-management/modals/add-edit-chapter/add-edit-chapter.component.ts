import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Chapter} from '../../domain/chapter';
import {AppUtil} from '../../../../../conf/app-util';

@Component({
  selector: 'ngx-add-edit-chapter',
  templateUrl: './add-edit-chapter.component.html',
  styleUrls: ['./add-edit-chapter.component.scss'],
})
export class AddEditChapterComponent implements OnInit {

  @Input() editChapter: Chapter;
  @Input() header: string;
  @Input() chapters: Chapter[];

  public addChapterForm: FormGroup;
  public chapterNumber: AbstractControl;
  public chapterTitle: AbstractControl;
  public chapterDescription: AbstractControl;
  public chapterStory: AbstractControl;

  constructor(private builder: FormBuilder, private activeModal: NgbActiveModal) {
  }

  ngOnInit() {
    this.addChapterForm = this.builder.group({
      'chapterNumber': ['', [Validators.required, Validators.pattern(/^[1-9]\d*$/)]],
      'chapterTitle': ['', Validators.required],
      'chapterDescription': [''],
      'chapterStory': [''],
    });

    this.chapterNumber = this.addChapterForm.controls['chapterNumber'];
    this.chapterTitle = this.addChapterForm.controls['chapterTitle'];
    this.chapterDescription = this.addChapterForm.controls['chapterDescription'];
    this.chapterStory = this.addChapterForm.controls['chapterStory'];

    if (this.editChapter) {
      this.populateForm();
    }
  }

  closeModal(): void {
    this.activeModal.close();
  }

  addEditChapter(entity, isValid: boolean): void {
    if (isValid) {
      let chapter = this.editChapter;
      if (chapter) {
        chapter.chapterNumber = +entity.chapterNumber;
        chapter.chapterTitle = entity.chapterTitle;
        chapter.chapterDescription = entity.chapterDescription;
        chapter.story = entity.chapterStory;
      } else {
        chapter = new Chapter();
        chapter.chapterNumber = +entity.chapterNumber;
        chapter.chapterTitle = entity.chapterTitle;
        chapter.chapterDescription = entity.chapterDescription;
        chapter.story = entity.chapterStory;
      }
      this.activeModal.close(chapter);
    }
  }

  private populateForm(): void {
    this.chapterNumber.setValue(this.editChapter.chapterNumber);
    this.chapterTitle.setValue(this.editChapter.chapterTitle);
    this.chapterDescription.setValue(this.editChapter.chapterDescription);
    this.chapterStory.setValue(this.editChapter.story);
  }

  onEditorChange(event): void {
    this.chapterStory.setValue(event);
  }
}
