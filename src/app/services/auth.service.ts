import { Injectable, PLATFORM_ID, inject, signal, computed } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

import { tap } from 'rxjs/operators';
import { GenericApiService } from '../core/api/generic-api.service';
import { AuthApiResponse, AuthUser, LoginRequest, RegisterRequest } from '../models/auth.models';
import { AUTH_META } from '../features/lots/lots.meta';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = inject(GenericApiService);
  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  private readonly TOKEN_KEY = 'ea_token';
  private readonly USER_KEY = 'ea_user';
  private readonly EXPIRES_KEY = 'ea_token_expires';

  user = signal<AuthUser | null>(null);
  token = signal<string | null>(null);
  expiresAtUtc = signal<string | null>(null);

  isAuth = computed(() => !!this.token());

  constructor() {
    if (this.isBrowser()) {
      const t = localStorage.getItem(this.TOKEN_KEY);
      const u = localStorage.getItem(this.USER_KEY);
      const e = localStorage.getItem(this.EXPIRES_KEY);

      if (t) this.token.set(t);
      if (e) this.expiresAtUtc.set(e);
      if (u) this.user.set(JSON.parse(u));
    }
  }

  login(req: LoginRequest) {
    return this.api.post<AuthApiResponse>(AUTH_META, 'login', req).pipe(
      tap(res => this.persistFromApi(res))
    );
  }

  register(req: RegisterRequest) {
    return this.api.post<AuthApiResponse>(AUTH_META, 'register', req).pipe(
      tap(res => this.persistFromApi(res))
    );
  }

  logout() {
    this.token.set(null);
    this.user.set(null);
    this.expiresAtUtc.set(null);

    if (this.isBrowser()) {
      localStorage.removeItem(this.TOKEN_KEY);
      localStorage.removeItem(this.USER_KEY);
      localStorage.removeItem(this.EXPIRES_KEY);
    }

    this.router.navigateByUrl('/login');
  }

  private persistFromApi(res: AuthApiResponse) {
    const user: AuthUser = {
      id: res.userId,
      email: res.email,
      role: res.role,
    };

    this.token.set(res.accessToken);
    this.user.set(user);
    this.expiresAtUtc.set(res.expiresAtUtc);

    if (this.isBrowser()) {
      localStorage.setItem(this.TOKEN_KEY, res.accessToken);
      localStorage.setItem(this.USER_KEY, JSON.stringify(user));
      localStorage.setItem(this.EXPIRES_KEY, res.expiresAtUtc);
    }
  }

  private isBrowser() {
    return isPlatformBrowser(this.platformId);
  }
}
