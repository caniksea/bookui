import {AppUtil} from '../../../../conf/app-util';

export class Chapter  {
  bookId: string;
  chapterId: string;
  chapterNumber: number;
  chapterTitle: string;
  chapterDescription: string;
  story: string;
  chapterLink: string;
  dateCreated: Date;

  constructor() {
    this.chapterId = AppUtil.getId();
    this.chapterDescription = '';
    this.story = '';
    this.dateCreated = new Date();
  }
}
