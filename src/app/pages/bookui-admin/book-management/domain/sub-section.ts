import {AppUtil} from '../../../../conf/app-util';

export class SubSection {
  sectionId: string;
  subsectionId: string;
  subsectionTitle: string;
  subsectionDescription: string;
  story: string;
  dateCreated: Date;

  constructor() {
    this.subsectionId = AppUtil.getId();
    this.subsectionDescription = this.story = '';
    this.dateCreated = new Date();
  }
}
