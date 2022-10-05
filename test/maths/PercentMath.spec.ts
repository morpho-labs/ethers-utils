import { parseUnits } from "ethers/lib/utils";

import { PercentMath } from "../../src/maths";

describe("Test ethers-utils PercentMath library", () => {
    describe("maths", () => {
        it("should return the correct constants", async () => {
            expect(PercentMath.BASE_PERCENT).toBnEquals("10000");
            expect(PercentMath.HALF_PERCENT).toBnEquals("5000");
        });

        it("should compute correctly the PercentMath operations", async () => {
            const one = parseUnits("1");
            const two = parseUnits("2");
            const four = parseUnits("4");
            expect(PercentMath.percentMul(one, PercentMath.BASE_PERCENT)).toBnEquals(one);
            expect(PercentMath.percentMul(two, PercentMath.BASE_PERCENT)).toBnEquals(two);
            expect(PercentMath.percentMul(two, PercentMath.HALF_PERCENT)).toBnEquals(one);
            expect(PercentMath.percentMul(four, "2500")).toBnEquals(one);

            expect(PercentMath.percentDiv(one, PercentMath.BASE_PERCENT)).toBnEquals(one);
            expect(PercentMath.percentDiv(two, PercentMath.BASE_PERCENT)).toBnEquals(two);
            expect(PercentMath.percentDiv(two, PercentMath.HALF_PERCENT)).toBnEquals(four);
            expect(PercentMath.percentDiv(four, "40000")).toBnEquals(one);

            expect(PercentMath.weiToPercent(one)).toBnEquals("10000");
            expect(PercentMath.weiToPercent(two)).toBnEquals("20000");
        });
    });
});
