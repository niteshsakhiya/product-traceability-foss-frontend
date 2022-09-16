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

import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { realm, realmLogo as _realmLogo } from 'src/app/modules/core/api/api.service.properties';
import { LayoutFacade } from 'src/app/modules/shared/abstraction/layout-facade';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  public readonly realmLogo = _realmLogo;
  public isExpanded = false;
  public userInitials = '';
  public userDetails = { name: '', email: '', role: '' };

  constructor(private readonly layoutFacade: LayoutFacade, private readonly router: Router) {
    this.userInitials = this.layoutFacade.realmName;
    this.userDetails = this.layoutFacade.userInformation;
  }

  public expand(event: Event): void {
    if (event) {
      event.stopPropagation();
      this.isExpanded = !this.isExpanded;
    }
  }

  public logOut(): void {
    this.layoutFacade.logOut();
  }

  public navigateToHome(): void {
    this.router.navigate([`/${realm}`]).then();
  }

  @HostListener('window:click', [])
  private onClick(): void {
    this.isExpanded = false;
  }
}
