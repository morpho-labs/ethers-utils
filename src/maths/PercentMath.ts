import { BigNumber, BigNumberish, constants } from "ethers";

import { pow10 } from "../utils";

const BASE_PERCENT = BigNumber.from(10_000);
const HALF_PERCENT = BASE_PERCENT.div(2);

const percentMul = (x: BigNumberish, pct: BigNumberish) => {
    x = BigNumber.from(x);
    if (x.eq(0) || BigNumber.from(pct).eq(0)) return constants.Zero;

    return x.mul(pct).add(HALF_PERCENT).div(BASE_PERCENT);
};

const percentDiv = (x: BigNumberish, pct: BigNumberish) => {
    x = BigNumber.from(x);
    pct = BigNumber.from(pct);
    if (x.eq(0) || BigNumber.from(pct).eq(0)) return constants.Zero;

    return x.mul(BASE_PERCENT).add(pct.div(2)).div(pct);
};

const weiToPercent = (weiNumber: BigNumberish) =>
    BigNumber.from(weiNumber).mul(BASE_PERCENT).div(pow10(14)).add(HALF_PERCENT).div(BASE_PERCENT);

const PercentMath = {
    BASE_PERCENT,
    HALF_PERCENT,
    percentMul,
    percentDiv,
    weiToPercent,
};
export default PercentMath;
