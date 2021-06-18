/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Object, Property } from 'fabric-contract-api';

@Object()
export class MyCar {

    @Property()
    public value: string;

    @Property()
    public owner: string;

    @Property()
    public carMake: string;

    @Property()
    public carModel: string;

    @Property()
    public rego: string;

    @Property()
    public transmission: string;

    @Property()
    public manufacturedYear: string;

}
