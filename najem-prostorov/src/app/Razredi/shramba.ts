import {InjectionToken, PLATFORM_ID, inject} from '@angular/core';
import {isPlatformBrowser} from '@angular/common';

export const BROWSER_STORAGE = new InjectionToken<Storage | null>('Browser Storage', {
  providedIn: 'root',
  factory: () => {
    const platformId = inject(PLATFORM_ID);
    if (isPlatformBrowser(platformId)) {
      return localStorage;
    }
    return null;
  }
})
