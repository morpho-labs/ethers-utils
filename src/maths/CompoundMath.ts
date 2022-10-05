import { BigNumber, BigNumberish, constants } from "ethers";
import { parseUnits } from "ethers/lib/utils";

import { minBNS } from "../utils";

const WAD = parseUnits("1");

const CompoundMath = {
    WAD,
    mul: (x: BigNumberish, y: BigNumberish) => {
        x = BigNumber.from(x);
        return x.mul(y).div(WAD);
    },
    div: (x: BigNumberish, y: BigNumberish) => WAD.mul(x).mul(WAD).div(y).div(WAD),
    min: (a: BigNumberish, b: BigNumberish, c: BigNumberish) => minBNS(a, b, c),
    safeSub: (a: BigNumberish, b: BigNumberish) => {
        a = BigNumber.from(a);
        return a.gte(b) ? a.sub(b) : constants.Zero;
    },
    average: (a: BigNumberish, b: BigNumberish) => {
        a = BigNumber.from(a);
        b = BigNumber.from(b);
        return a // (a + b) / 2 can overflow, so we distribute.
            .div(2)
            .add(b.div(2))
            .add(a.mod(2).add(b.mod(2)).div(2));
    },
};
export default CompoundMath;
