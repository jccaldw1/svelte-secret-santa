import type { ObjectId } from "mongodb";

export default class ChristmasPresent {
    public _id!: ObjectId;
    public recipient!: string;
    public gift!: string;
    public gotten!: boolean | undefined;

    public constructor(init?: Partial<ChristmasPresent>) {
        Object.assign(this, init);
    }
}
