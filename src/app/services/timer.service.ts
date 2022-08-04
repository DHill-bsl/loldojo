import { Injectable } from "@angular/core";

@Injectable()
export class TimerService {
  public startTime = 0;
  public endTime = 0;

  public get timeElapsed(): number {
    if (this.endTime) {
      return this.endTime - this.startTime;
    } else {
      return new Date().getTime() - this.startTime;
    }
  };

  public startTimer() {
    this.startTime = new Date().getTime();
  }

  public stopTimer() {
    this.endTime = new Date().getTime();
  }
}
