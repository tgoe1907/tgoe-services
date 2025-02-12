import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, MaybeAsync, RedirectCommand, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TrainingHoursService } from './services/training-hours.service';
import { SportGroupsService } from './services/sport-groups.service';

@Injectable({ providedIn: 'root' })
export class DataResolver implements Resolve<boolean> {
  constructor(private trainHourService: TrainingHoursService, private sportGroupService: SportGroupsService) {}

  resolve(): Observable<boolean> {
    return new Observable<boolean>;
  }
}
