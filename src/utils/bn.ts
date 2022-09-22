import {BigNumber, BigNumberish} from "ethers";

export const pow10 = (power: BigNumberish) => BigNumber.from(10).pow(power);

export const minBN = (b1: BigNumberish, b2: BigNumberish) => {
    b1 = BigNumber.from(b1)
    return b1.gt(b2) ? BigNumber.from(b2) : b1
}
export const maxBN = (b1: BigNumberish, b2: BigNumberish) => {
    b1 = BigNumber.from(b1)
    return b1.gt(b2) ? b1 : BigNumber.from(b2)
}