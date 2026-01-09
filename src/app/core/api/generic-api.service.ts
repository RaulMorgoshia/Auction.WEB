import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse, PagedResult } from './api.models';
import { ApiMeta } from './api.meta';

@Injectable({ providedIn: 'root' })
export class GenericApiService {
  private http = inject(HttpClient);

  // ერთი ადგილი სადაც base url გაქვს
  private baseUrl = 'https://localhost:7210/api';

  private url(meta: ApiMeta, suffix = ''): string {
    const ep = meta.endpoint.replace(/^\//, '');
    const sfx = suffix ? `/${suffix.replace(/^\//, '')}` : '';
    return `${this.baseUrl}/${ep}${sfx}`;
  }

  getList<T>(meta: ApiMeta, query?: Record<string, any>): Observable<T> {
    return this.http.get<T>(this.url(meta), { params: this.toParams(query) });
  }

  getPaged<T>(meta: ApiMeta, query?: Record<string, any>): Observable<ApiResponse<PagedResult<T>>> {
    return this.http.get<ApiResponse<PagedResult<T>>>(this.url(meta), { params: this.toParams(query) });
  }

  getById<T>(meta: ApiMeta, id: number | string): Observable<T> {
    return this.http.get<T>(this.url(meta, String(id)));
  }

  create<TReq, TRes>(meta: ApiMeta, body: TReq): Observable<TRes> {
    return this.http.post<TRes>(this.url(meta), body);
  }

  update<TReq, TRes>(meta: ApiMeta, id: number | string, body: TReq): Observable<TRes> {
    return this.http.put<TRes>(this.url(meta, String(id)), body);
  }

  delete<TRes>(meta: ApiMeta, id: number | string): Observable<TRes> {
    return this.http.delete<TRes>(this.url(meta, String(id)));
  }

  // custom endpoint call (როცა CRUD არ არის)
  post<TRes>(meta: ApiMeta, path: string, body: any, query?: Record<string, any>): Observable<TRes> {
    return this.http.post<TRes>(this.url(meta, path), body, { params: this.toParams(query) });
  }

  private toParams(query?: Record<string, any>): HttpParams {
    let params = new HttpParams();
    if (!query) return params;
    for (const [k, v] of Object.entries(query)) {
      if (v === null || v === undefined || v === '') continue;
      params = params.set(k, String(v));
    }
    return params;
  }
}
