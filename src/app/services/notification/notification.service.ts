import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

    constructor(private _matSnackBar: MatSnackBar) { 
    }

    notify(ctx: any): void {
        let msg = 'Unkown action';

        if (ctx.action === 'data.addRecord') {
            msg = 'Új létrehozása sikerült';
        } else if (ctx.action === 'data.saveRecord') {
            msg = 'Módosítás sikerült';
        } else if (ctx.action.startsWith('http.')) {
            msg = 'A szerver nem elérhető, kérem ellenőrizze a hálózatot!';
        }

        this._matSnackBar.open(msg, 'OK', {
            verticalPosition: 'top', duration: 2000
        });
    }
}
