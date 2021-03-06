/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License;
 * you may not use this file except in compliance with the Elastic License.
 */
import { isFinite } from 'lodash';
import { Maybe } from '../../typings/common';

// _.isNumber() returns true for NaN, _.isFinite() does not refine
export function isFiniteNumber(value: Maybe<number>): value is number {
  return isFinite(value);
}
