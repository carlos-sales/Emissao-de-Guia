import { DebugService } from "../../shared/services/debug/debug.service";

export class Urls
{
    private URLBackendDebug = 'http://localhost:8000/api';
    private URLBackendProduction = '/api';

    constructor(private serviceDebug: DebugService ){}

    get()
    {
        return this.serviceDebug.isDebug() ? this.URLBackendDebug : this.URLBackendProduction;
    }
}
