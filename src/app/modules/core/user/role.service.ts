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
import { Role, RoleRelation } from './role.model';
import { UserService } from './user.service';

const ROLES_RELATIONS: RoleRelation[] = [
  {
    role: 'wip',
  },
  {
    role: 'admin',
    child: 'supervisor',
  },
  {
    role: 'supervisor',
    child: 'user',
  },
];

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  constructor(private readonly userService: UserService) {}

  public hasAccess(requiredRoles: Role | Role[]): boolean {
    const requiredRolesList = typeof requiredRoles === 'string' ? [requiredRoles] : requiredRoles;

    const roles = this.userService.roles.map(role => role.toLocaleLowerCase());
    const allPossibleRoles = [...requiredRolesList, ...this.getParentsRolesFor(requiredRolesList)];

    return allPossibleRoles.some(possibleRole => roles.includes(possibleRole));
  }

  private getParentsRolesFor(lookupRoles: Role[]): Role[] {
    const parentRoles = ROLES_RELATIONS.filter(({ child }) => lookupRoles.includes(child));

    if (parentRoles.length) {
      const roles = parentRoles.map(({ role }) => role);
      return [...roles, ...this.getParentsRolesFor(roles)];
    }

    return [];
  }
}
