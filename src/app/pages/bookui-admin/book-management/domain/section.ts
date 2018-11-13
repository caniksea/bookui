import {AppUtil} from '../../../../conf/app-util';

export class Section {
  chapterId: string;
  sectionId: string;
  sectionNumber: number;
  sectionTitle: string;
  sectionDescription: string;
  story: string;
  dateCreated: Date;

  constructor() {
    this.sectionId = AppUtil.getId();
    this.sectionDescription = this.story = '';
    this.dateCreated = new Date();
  }
}
