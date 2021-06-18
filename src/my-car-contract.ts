/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract, Info, Returns, Transaction } from 'fabric-contract-api';
import { MyCar } from './my-car';

@Info({title: 'MyCarContract', description: 'My Smart Contract' })
export class MyCarContract extends Contract {

    @Transaction(false)
    @Returns('boolean')
    public async myCarExists(ctx: Context, myCarId: string): Promise<boolean> {
        const data: Uint8Array = await ctx.stub.getState(myCarId);
        return (!!data && data.length > 0);
    }

    @Transaction()
    public async createMyCar(ctx: Context, myCarId: string, value: string, owner: string, carMake: string, carModel: string, rego: string, transmission: string, manufacturedYear: string): Promise<void> {
        const exists: boolean = await this.myCarExists(ctx, myCarId);
        if (exists) {
            throw new Error(`The car ${myCarId} already exists`);
        }
        const myCar: MyCar = new MyCar();
        myCar.value = value;
        myCar.owner = owner;
        myCar.carMake = carMake;
        myCar.carModel = carModel;
        myCar.rego = rego;
        myCar.transmission = transmission;
        myCar.manufacturedYear = manufacturedYear;

        const buffer: Buffer = Buffer.from(JSON.stringify(myCar));
        await ctx.stub.putState(myCarId, buffer);
    }

    @Transaction(false)
    @Returns('MyCar')
    public async readMyCar(ctx: Context, myCarId: string): Promise<MyCar> {
        const exists: boolean = await this.myCarExists(ctx, myCarId);
        if (!exists) {
            throw new Error(`The car ${myCarId} does not exist`);
        }
        const data: Uint8Array = await ctx.stub.getState(myCarId);
        const myCar: MyCar = JSON.parse(data.toString()) as MyCar;
        return myCar;
    }

    @Transaction()
    public async updateMyCar(ctx: Context, myCarId: string, newValue: string, newOwner: string, carMake: string, carModel: string, rego: string, newTransmission: string, manufacturedYear: string): Promise<void> {
        const exists: boolean = await this.myCarExists(ctx, myCarId);
        if (!exists) {
            throw new Error(`The my car ${myCarId} does not exist`);
        }
        const myCar: MyCar = new MyCar();
        myCar.value = newValue;
        myCar.owner = newOwner;
        myCar.carMake = carMake;
        myCar.carModel = carModel;
        myCar.rego = rego;
        myCar.transmission = newTransmission;
        myCar.manufacturedYear = manufacturedYear;
        const buffer: Buffer = Buffer.from(JSON.stringify(myCar));
        await ctx.stub.putState(myCarId, buffer);
    }

    @Transaction()
    public async deleteMyCar(ctx: Context, myCarId: string): Promise<void> {
        const exists: boolean = await this.myCarExists(ctx, myCarId);
        if (!exists) {
            throw new Error(`The car ${myCarId} does not exist`);
        }
        await ctx.stub.deleteState(myCarId);
    }

}
