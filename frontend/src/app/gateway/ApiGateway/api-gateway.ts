import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, of, first } from "rxjs";
import { Urls } from "../../core/urls/urls";
import { AuthService } from "../../features/auth/services/auth.service";
import { DebugService } from "../../shared/services/debug/debug.service";
import { DialogService } from "../../shared/services/dialog/dialog.service";

@Injectable({
  providedIn: 'root'
})
export class ApiGateway
{
    constructor( 
        private serviceAuth: AuthService,
        private serviceDialog: DialogService,
        private httpClient: HttpClient,
    )
    {}

    get(api: string)
    {
        return this.httpClient
            .get<any>( api )
            .pipe( 
                catchError(err =>
                {
                    console.error('Something get wrong', err);
                    if( err.status == 401 ) this.serviceAuth.sessionExpired();
                    if( err.status == 500 ) this.serviceDialog.errorDialog("Erro ao comunicar com o servidor");
                    return of([]);
                }
            ),
            first()
        );
    }

    getById(api: string, id: any)
    {
        return this.httpClient
            .get<any>( `${api}?id=${id}`)
            .pipe( 
                catchError(err =>
                {
                    console.error('Something get wrong', err);
                    if( err.status == 400 ) this.serviceDialog.errorDialog(err.message);
                    if( err.status == 401 ) this.serviceAuth.sessionExpired();
                    if( err.status == 500 ) this.serviceDialog.errorDialog("Erro ao comunicar com o servidor");
                    return of([]);
                }
            ),
            first()
        );
    }

    getWithParams(api: string, params: any = null)
    {
        return this.httpClient
            .post<any>( api, params )
            .pipe( 
                catchError(err =>
                {
                    console.error('Something get wrong', err);
                    if( err.status == 401 ) this.serviceAuth.sessionExpired();
                    if( err.status == 500 ) this.serviceDialog.errorDialog("Erro ao comunicar com o servidor");
                    return of([]);
                }
            ),
            first()
        );
    }

    update(api: string, params: any)
    {
        return this.httpClient
            .put<any>( api, {...params, userid: this.serviceAuth.getUserId()} )
            .pipe( 
                catchError(err =>
                {
                    console.error('Something get wrong', err);
                    if( err.status == 400 ) this.serviceDialog.errorDialog(err.message);
                    if( err.status == 401 ) this.serviceAuth.sessionExpired();
                    if( err.status == 500 ) this.serviceDialog.errorDialog("Erro ao comunicar com o servidor");
                    return of([]);
                }
            ),
            first()
        );
    }

    updateStatus(api: string, ativo: boolean, id: number)
    {
        return this.httpClient
            .put<any>( api, {ativo, id, userid: this.serviceAuth.getUserId()} )
            .pipe( 
                catchError(err =>
                {
                    console.error('Something get wrong', err);
                    if( err.status == 400 ) this.serviceDialog.errorDialog(err.message);
                    if( err.status == 401 ) this.serviceAuth.sessionExpired();
                    if( err.status == 500 ) this.serviceDialog.errorDialog("Erro ao comunicar com o servidor");
                    return of([]);
                }
            ),
            first()
        );
    }

    insert(api: string, params: any)
    {
        return this.httpClient
            .post<any>( api, {...params, userid: this.serviceAuth.getUserId()} )
            .pipe( 
                catchError(err =>
                {
                    console.error('Something get wrong', err);
                    if( err.status == 400 ) this.serviceDialog.errorDialog(err.message);
                    if( err.status == 401 ) this.serviceAuth.sessionExpired();
                    if( err.status == 500 ) this.serviceDialog.errorDialog("Erro ao comunicar com o servidor");
                    return of([]);
                }
            ),
            first()
        );
    }
}
