/********************************************************************************
 * Copyright (c) 2021,2022 Contributors to the CatenaX (ng) GitHub Organisation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Apache License, Version 2.0 which is available at
 * https://www.apache.org/licenses/LICENSE-2.0.
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *
 * SPDX-License-Identifier: Apache-2.0
 ********************************************************************************/

import { Inject, OnDestroy, Pipe, PipeTransform } from '@angular/core';
import { CalendarDateModel } from '@core/model/calendar-date.model';
import { I18NEXT_SERVICE, ITranslationService } from 'angular-i18next';
import type { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Pipe({ name: 'formatDate', pure: false })
export class FormatDatePipe implements PipeTransform, OnDestroy {
  private dateFormat: Omit<Intl.DateTimeFormat, 'format'> & {
    format: (date: Date, options?: { dateStyle: string }) => string;
  };

  private readonly languageChangedSubscription: Subscription;
  private readonly formatOptions = { dateStyle: 'short' };

  constructor(@Inject(I18NEXT_SERVICE) { language, events }: ITranslationService) {
    this.dateFormat = new Intl.DateTimeFormat(language);

    this.languageChangedSubscription = events.languageChanged
      .pipe(filter(lang => !!lang))
      .subscribe(lang => (this.dateFormat = new Intl.DateTimeFormat(lang)));
  }

  public ngOnDestroy(): void {
    this.languageChangedSubscription.unsubscribe();
  }

  public transform(input: string | CalendarDateModel): string {
    if (!input) {
      return '';
    }

    const date = typeof input === 'string' ? this.transformStringToDate(input) : input.valueOf();
    return this.dateFormat.format(date, this.formatOptions);
  }

  private transformStringToDate(strDate: string): Date {
    return new Date(strDate + 'Z');
  }
}
