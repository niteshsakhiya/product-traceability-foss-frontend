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

import { HttpClientModule } from '@angular/common/http';
import { APP_INITIALIZER, Type, ɵɵComponentDeclaration, ɵɵFactoryDeclaration } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockedKeycloakService } from '@core/auth/mocked-keycloak.service';
import { Role } from '@core/user/role.model';
import { render, RenderComponentOptions, RenderResult, RenderTemplateOptions } from '@testing-library/angular';
import { I18NEXT_SERVICE, I18NextModule, ITranslationService } from 'angular-i18next';
import { KeycloakService } from 'keycloak-angular';

type RenderFnOptionsExtension = {
  translations?: string[];
  roles?: Role[];
};

// As we extending render function from the testing-library with more options
// this force us to redefine type completly. Following declaration is taken from
// tesgting-library source + usage of local RenderFnOptionsExtension
declare function ExtendedRenderFn<ComponentType>(
  component: Type<ComponentType>,
  renderOptions?: RenderComponentOptions<ComponentType> & RenderFnOptionsExtension,
): Promise<RenderResult<ComponentType, ComponentType>>;
declare function ExtendedRenderFn<WrapperType = WrapperComponent>(
  template: string,
  renderOptions?: RenderTemplateOptions<WrapperType> & RenderFnOptionsExtension,
): Promise<RenderResult<WrapperType>>;
declare class WrapperComponent {
  static ɵfac: ɵɵFactoryDeclaration<WrapperComponent, never>;
  static ɵcmp: ɵɵComponentDeclaration<WrapperComponent, 'atl-wrapper-component', never, {}, {}, never, never>;
}

export const renderComponent: typeof ExtendedRenderFn = (
  cmp,
  { imports = [], providers = [], translations = [], roles = ['user'], ...restConfig },
) =>
  render(cmp, {
    imports: [...imports, I18NextModule.forRoot(), HttpClientModule, NoopAnimationsModule],
    providers: [
      ...providers,
      {
        provide: 'mockedRoles',
        useValue: roles,
      },
      {
        provide: KeycloakService,
        useClass: MockedKeycloakService,
      },
      {
        provide: APP_INITIALIZER,
        useFactory: (i18next: ITranslationService) => {
          return () =>
            i18next.init({
              lng: 'en',
              supportedLngs: ['en', 'pl'],
              resources: {
                en: {
                  translation: translations.reduce(
                    (acc, translationFile) => ({ ...acc, ...require(`../assets/locales/en/${translationFile}.json`) }),
                    {
                      ...require('../assets/locales/en/common.json'),
                    },
                  ),
                },
              },
            });
        },
        deps: [I18NEXT_SERVICE],
        multi: true,
      },
    ],
    ...restConfig,
  });
