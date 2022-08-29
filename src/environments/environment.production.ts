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

import { _environment } from './_environment.base';

const SCRIPT_EL_ID = 'envConfig';
const SUPPORTED_ENV_PARAMS = ['keycloakUrl', 'clientId', 'defaultRealm', 'realmLogo', 'apiUrl', 'baseUrl'];

export const readDynamicEnv = () => {
  const scriptEl = document.getElementById(SCRIPT_EL_ID) as HTMLScriptElement;
  if (scriptEl && scriptEl.tagName === 'SCRIPT') {
    try {
      const dynamicEnv = JSON.parse(scriptEl.text);

      return SUPPORTED_ENV_PARAMS.reduce(
        (acc, curr) =>
          dynamicEnv.hasOwnProperty(curr)
            ? {
                ...acc,
                [curr]: dynamicEnv[curr],
              }
            : acc,
        {},
      );
    } catch (err) {
      console.warn(`Cannot parse JSON from <script id='${SCRIPT_EL_ID}'>`, err);
    }
  }

  return {};
};

export const environment = {
  ..._environment,
  production: true,
  multiTenant: true,
  authDisabled: false,
  mockService: false,
  apiUrl: 'https://traceability.dev.demo.ftcpro.co/api',
  keycloakUrl: 'https://centralidp.dev.demo.ftcpro.co/auth',
  clientId: 'Cl10-CX-Part',
  defaultRealm: 'CX-Central',
  ...readDynamicEnv(),
};
