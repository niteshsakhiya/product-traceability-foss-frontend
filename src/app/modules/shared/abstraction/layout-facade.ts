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

import { Injectable } from '@angular/core';
import { AuthService } from '@core/auth/auth.service';
import { UserService } from '@core/user/user.service';
import { LayoutState } from '../service/layout.state';

@Injectable({
  providedIn: 'root',
})
export class LayoutFacade {
  constructor(
    private readonly layoutState: LayoutState,
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  public get userInformation(): { name: string; email: string; role: string } {
    return {
      name: `${this.userService.firstname} ${this.userService.surname}`,
      email: `${this.userService.email}`,
      role: `${this.userService.roles.join(', ')}`,
    };
  }

  public get realmName(): string {
    return this.userService.firstname;
  }

  public get breadcrumbLabel(): string {
    return this.layoutState.breadcrumbLabel;
  }

  public set isSideBarExpanded(isExpanded: boolean) {
    this.layoutState.isSideBarExpanded = isExpanded;
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
