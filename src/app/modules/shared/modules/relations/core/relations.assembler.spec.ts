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

import { Part } from '@page/parts/model/parts.model';
import { RelationsAssembler } from '@shared/modules/relations/core/relations.assembler';
import { TreeElement } from '@shared/modules/relations/model/relations.model';

describe('Relations assembler', () => {
  describe('assemblePartForRelation', () => {
    it('should assemble loading part', () => {
      const part = { id: 'id', name: 'name', serialNumber: 'serialNumber', children: null } as Part;
      const expected = {
        children: null,
        id: 'id',
        state: 'loading',
        text: 'name',
        title: 'name | serialNumber',
      };
      expect(RelationsAssembler.assemblePartForRelation(part)).toEqual(expected);
    });
    it('should assemble finished loading part', () => {
      const part = { id: 'id', name: 'name', serialNumber: 'serialNumber', children: [] } as Part;
      const expected = {
        children: [],
        id: 'id',
        state: 'error',
        text: 'name',
        title: 'name | serialNumber',
      };
      expect(RelationsAssembler.assemblePartForRelation(part)).toEqual(expected);
    });
  });

  describe('elementToTreeStructure', () => {
    it('should return null if part is not given', () => {
      expect(RelationsAssembler.elementToTreeStructure(null)).toEqual(null);
      expect(RelationsAssembler.elementToTreeStructure(undefined)).toEqual(null);
    });
    it('should return tree structure from tree element', () => {
      const treeElement = {
        id: 'part_1',
        text: 'Audi A1 Sportback',
        title: 'Audi A1 Sportback | 5XXGM4A77CG032209',
        state: 'done',
        children: ['part_2', 'part_3'],
      } as TreeElement;
      const expected = {
        children: [
          {
            children: null,
            id: 'part_2',
            state: 'loading',
            title: 'part_2',
          },
          {
            children: null,
            id: 'part_3',
            state: 'loading',
            title: 'part_3',
          },
        ],
        id: 'part_1',
        state: 'done',
        text: 'Audi A1 Sportback',
        title: 'Audi A1 Sportback | 5XXGM4A77CG032209',
      };
      expect(RelationsAssembler.elementToTreeStructure(treeElement)).toEqual(expected);
    });
  });

  describe('createLoadingElement', () => {
    it('should return new tree element with loading state', () => {
      const expected = {
        id: '_id_',
        title: '_id_',
        state: 'loading',
        children: null,
      };
      expect(RelationsAssembler.createLoadingElement('_id_')).toEqual(expected);
    });
  });
});
