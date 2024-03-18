import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { apiServer } from "../apiServer";

@Injectable({
    providedIn: 'root'
})
export class HormasService{
    url = apiServer.url+"hormas/";
    constructor(private http: HttpClient) {}

    getHormas(url: any): Observable<any> {
        return this.http.get(`${this.url}${url}`);
    }
}