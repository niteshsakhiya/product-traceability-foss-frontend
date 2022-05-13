/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { State } from '../../model/state';

@Injectable()
export class TableState {
  private readonly selectedAsset$: State<string> = new State<string>('');

  get getSelectedAsset$(): Observable<string> {
    return this.selectedAsset$.observable;
  }

  get getSelectedAssetSnapshot(): string {
    return this.selectedAsset$.snapshot;
  }

  public setSelectedAsset(selectedAsset: string): void {
    const previousValue: string = this.selectedAsset$.snapshot;
    if (selectedAsset !== previousValue) {
      this.selectedAsset$.update(selectedAsset);
    }
  }

  public resetSelectedAsset(): void {
    this.selectedAsset$.reset();
  }
}
