import {Injectable} from '@angular/core';
import {ToastrManager} from 'ng6-toastr-notifications';

@Injectable({
    providedIn: 'root'
})
export class LoggerService {
    position = 'bottom-right';
    constructor(public toastr: ToastrManager) {
    }

    public success(mess: string) {
        this.toastr.successToastr(mess, '', {
            position: this.position
        });
    }

    public error(mess: string) {
        this.toastr.errorToastr(mess, '', {
            position: this.position
        });
    }

    public warning(mess: string) {
        this.toastr.warningToastr(mess, 'Alert!',{
            position: this.position
        });
    }

    public info(mess: string) {
        this.toastr.infoToastr(mess, '', {
            position: this.position
        });
    }

    public addLog(currentLog: any, content: string) {
        currentLog += `${new Date().toLocaleTimeString()} ` + content + '\n';
        return currentLog;
    }
}
