import {Component, OnInit} from '@angular/core';
import {LocalDataSource} from 'ng2-smart-table';
import {DatePipe} from '@angular/common';
import {Site} from '../../../bookui-admin/site-management/domain/site';
import {SiteService} from '../../../bookui-admin/site-management/service/site.service';
import {Toast, ToasterConfig, ToasterService} from 'angular2-toaster';
import {ToasterUtils} from '../../../../conf/util';
import {AppUtil} from '../../../../conf/app-util';

@Component({
  selector: 'ngx-site-side',
  templateUrl: './site-side.component.html',
  styleUrls: ['./site-side.component.scss'],
  providers: [SiteService],
})
export class SiteSideComponent implements OnInit {

  source: LocalDataSource;
  sites: Site[];
  loading: boolean;

  private toasterService: ToasterService;

  // toaster configuration
  public toasterConfig: ToasterConfig = new ToasterConfig({
    positionClass: ToasterUtils.POSITION_CLASS,
    timeout: ToasterUtils.TIMEOUT,
    newestOnTop: ToasterUtils.NEWEST_ON_TOP,
    tapToDismiss: ToasterUtils.TAP_TO_DISMISS,
    preventDuplicates: ToasterUtils.PREVENT_DUPLICATE,
    animation: ToasterUtils.ANIMATION_TYPE.fade,
    limit: ToasterUtils.LIMIT,
  });

  // settings for smart table
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
    },
    columns: {
      siteName: {
        title: 'Site',
        type: 'string',
      },
      dateCreated: {
        title: 'Date Created',
        type: 'string',
        valuePrepareFunction: (date) => {
          return new DatePipe('en-EN').transform(date, 'yyyy-MM-dd');
        },
        width: '20%',
      },
    },
    pager: {
      perPage: 10,
    },
  };

  constructor(private siteService: SiteService,
              toasterService: ToasterService) {
    this.toasterService = toasterService;
  }

  ngOnInit() {
    this.sites = [];
    this.getSites();
  }

  /**
   * Retrieve sites
   */
  private getSites(): void {
    this.loading = true;
    this.siteService.getSites().subscribe((sites: Site[]) => {
        if (sites) {
          this.sites = sites;
          this.source = new LocalDataSource(this.sites);
        } else {
          this.showInformation(ToasterUtils.TOAST_TYPE.warning, 'Dashboard', 'Could not retrieve sites');
        }
      },
      error => {
        this.loading = false;
        this.showInformation(ToasterUtils.TOAST_TYPE.error, 'Dashboard', 'Error fetching sites: ' + error.message);
      },
      () => {
        this.loading = false;
      });
  }

  /**
   * Shows toast on screen
   * @param type: string
   * @param title: string
   * @param info: string
   */
  private showInformation(type: string, title: string, info: string): void {
    const toast: Toast = AppUtil.makeToast(type, title, info);
    this.toasterService.popAsync(toast);
  }

}
