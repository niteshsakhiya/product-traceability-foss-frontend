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

import { Inject, Injectable, Optional } from '@angular/core';
import { Role } from '@core/user/role.model';
import { environment } from '@env';
import { KeycloakService } from 'keycloak-angular';
import Keycloak, { KeycloakLoginOptions } from 'keycloak-js';

@Injectable()
export class MockedKeycloakService extends KeycloakService {
  constructor(@Optional() @Inject('mockedRoles') private mockedRoles: Role[]) {
    super();
    this['_instance'] = {};
  }

  public init(): Promise<boolean> {
    return Promise.resolve(true);
  }

  public login(_?: KeycloakLoginOptions): Promise<void> {
    return Promise.resolve();
  }

  public logout(_?: string): Promise<void> {
    return Promise.resolve();
  }

  // keycloack-js marked using Keycloak as deprecated, for case when it used as a function
  // however here is different case and it used as a type. Unfortuantelly Sonar do not identify
  // properly which kind of Keycloack is used, and keycloack-js exports doesn't help.
  // Sonar Smell cannot be fixed without changes in keycloack-js
  public getKeycloakInstance(): Keycloak {
    return {
      token: 'MOCK',
      tokenParsed: {
        preferred_username: 'Mock-User',
        given_name: 'Mock',
        family_name: 'User',
        email: 'mock.user@foss.de',
        auth_time: '99999999',
        resource_access: {
          [environment.clientId]: { roles: this.mockedRoles ?? ['wip', 'admin'] },
        },
      },
    } as any;
  }
}
