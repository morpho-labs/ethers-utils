import { BigNumber, BigNumberish } from "ethers";

export const pow10 = (power: BigNumberish) => BigNumber.from(10).pow(power);

export const minBN = (b1: BigNumberish, b2: BigNumberish) => {
    b1 = BigNumber.from(b1);
    return b1.gt(b2) ? BigNumber.from(b2) : b1;
};

export const minBNS = (...bns: BigNumberish[]): BigNumber => {
    if (bns.length < 2) {
        throw Error("minBNS need at least 2 BigNumbers");
    }
    if (bns.length === 2) {
        const [b1, b2] = bns;
        return minBN(b1, b2);
    }
    const b1 = bns.pop();
    return minBN(b1!, minBNS(...bns));
};

export const maxBN = (b1: BigNumberish, b2: BigNumberish) => {
    b1 = BigNumber.from(b1);
    return b1.gt(b2) ? b1 : BigNumber.from(b2);
};

export const maxBNS = (...bns: BigNumberish[]): BigNumber => {
    if (bns.length < 2) {
        throw Error("maxBNS need at least 2 BigNumbers");
    }
    if (bns.length === 2) {
        const [b1, b2] = bns;
        return maxBN(b1, b2);
    }
    const b1 = bns.pop();
    return maxBN(b1!, maxBNS(...bns));
};
