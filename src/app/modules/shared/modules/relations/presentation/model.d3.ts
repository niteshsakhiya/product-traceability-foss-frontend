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

import { TreeStructure } from '@shared/modules/relations/model/relations.model';
import { HierarchyCircularNode } from 'd3-hierarchy';
import { Selection } from 'd3-selection';

export type TreeSvg = Selection<SVGElement, TreeStructure, HTMLElement, TreeStructure>;
export type TreeNode = HierarchyCircularNode<TreeStructure>;

export interface MinimapConnector {
  onZoom: (zoom: number) => void;
  onDrag: (x: number, y: number) => void;
}

export interface RenderOptions {
  preserveRight: number; // on initial load would take into account on centering
}
