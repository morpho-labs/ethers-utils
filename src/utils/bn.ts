import {BigNumber, BigNumberish} from "ethers";

export const pow10 = (power: BigNumberish) => BigNumber.from(10).pow(power)