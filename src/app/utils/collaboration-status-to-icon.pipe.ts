import { CollaborationStatusEnum } from './../model/collaboration-status.enum';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'collaborationStatusToIcon'
})
export class CollaborationStatusToIconPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    let icon: string;
    switch (value) {
      case CollaborationStatusEnum.AGREED:
        icon = 'check_circle'
        break;
      case CollaborationStatusEnum.REJECTED:
        icon = 'thumb_down_alt'
        break;
      case CollaborationStatusEnum.AGREED:
        icon = 'remove_circle'
        break;

      default:
        icon = 'hourglass_empty'
        break;
    }
    return icon;
  }

}

/*
<button #agreed autofocus="autofocus" (click)="setDeliveryCorpscategory('agreed')" type="button" data-toggle="tooltip" title="Agréées" class="btn btn-secondary"><span
        class="material-icons">check_circle</span></button>
        <button #pending type="button" (click)="setDeliveryCorpscategory('pending')" data-toggle="tooltip" title="En attente" class="btn btn-secondary"><span class="material-icons">hourglass_empty</span></button>
        <button #rejected type="button" (click)="setDeliveryCorpscategory('rejected')" data-toggle="tooltip" title="Rejettées" class="btn btn-secondary"><span class="material-icons">thumb_down_alt</span></button>
        <button #banned type="button" (click)="setDeliveryCorpscategory('banned')" data-toggle="tooltip" title="Bannies" class="btn btn-secondary"><span class="material-icons">remove_circle</span></button>
        */
