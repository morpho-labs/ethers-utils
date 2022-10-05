import { parseUnits } from "ethers/lib/utils";

import { CompoundMath } from "../../src/maths";

describe("Test ethers-utils CompoundMath library", () => {
    describe("maths", () => {
        it("should return the correct constants", async () => {
            expect(CompoundMath.WAD).toBnEquals("1000000000000000000");
        });

        it("should compute correctly the CompoundMath operations", async () => {
            const one = parseUnits("1");
            const two = parseUnits("2");
            const four = parseUnits("4");
            expect(CompoundMath.mul(one, one)).toBnEquals(one);
            expect(CompoundMath.mul(one, two)).toBnEquals(two);
            expect(CompoundMath.mul(one, two)).toBnEquals(two);
            expect(CompoundMath.mul(two, two)).toBnEquals(four);

            expect(CompoundMath.div(one, one)).toBnEquals(one);
            expect(CompoundMath.div(one, two)).toBnEquals(one.div(2));
            expect(CompoundMath.div(two, two)).toBnEquals(one);

            expect(CompoundMath.min(1, 2, 3)).toBnEquals(1);

            expect(CompoundMath.average(one, one)).toBnEquals(one);
            expect(CompoundMath.average(one, two)).toBnEquals(one.add(one.div(2)));

            expect(CompoundMath.safeSub(one, two)).toBnBeZero();
            expect(CompoundMath.safeSub(two, one)).toBnEquals(one);
        });
    });
});
