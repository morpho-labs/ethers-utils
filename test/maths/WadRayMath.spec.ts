import { parseUnits } from "ethers/lib/utils";

import { WadRayMath } from "../../src/maths";

describe("Test ethers-utils WadRayMath library", () => {
    describe("maths", () => {
        it("should return the correct constants", async () => {
            expect(WadRayMath.WAD).toBnEquals("1000000000000000000");
            expect(WadRayMath.RAY).toBnEquals("1000000000000000000000000000");
            expect(WadRayMath.halfRAY).toBnEquals("500000000000000000000000000");
            expect(WadRayMath.halfWAD).toBnEquals("500000000000000000");
        });
        it("should parse correctly constants", async () => {
            expect(WadRayMath.parseRay("1")).toBnEquals("1000000000000000000000000000");
            expect(WadRayMath.parseWad("1")).toBnEquals("1000000000000000000");
            expect(WadRayMath.formatRay("1000000000000000000000000001")).toEqual(
                "1.000000000000000000000000001"
            );
            expect(WadRayMath.formatWad("1000000000000000001")).toEqual("1.000000000000000001");
            expect(WadRayMath.formatRay("1000000000000000000000000000")).toEqual("1.0");
            expect(WadRayMath.formatWad("1000000000000000000")).toEqual("1.0");
        });

        it("should compute correctly the multiplication with a wad number (wadMul)", async () => {
            const baseNumber = parseUnits("1");
            const two = parseUnits("2");
            expect(WadRayMath.wadMul(baseNumber, WadRayMath.WAD)).toBnEquals(baseNumber);
            expect(WadRayMath.wadMul(baseNumber, two)).toBnEquals(two);

            expect(WadRayMath.wadMul(two, 1)).toBnEquals("2"); // mul by 1e-18
        });
        it("should compute correctly the division with a wad number (wadDiv)", async () => {
            const baseNumber = parseUnits("1");
            const two = parseUnits("2");
            const three = parseUnits("3");
            expect(WadRayMath.wadDiv(baseNumber, WadRayMath.WAD)).toBnEquals(baseNumber);
            expect(WadRayMath.wadDiv(baseNumber, two)).toBnEquals(parseUnits("0.5"));
            expect(WadRayMath.wadDiv(two, 1)).toBnEquals(parseUnits("2", 18 * 2)); // mul by 1e-18
            expect(WadRayMath.wadDiv(baseNumber, three)).toBnEquals("3".repeat(18));
        });
        it("should compute correctly the multiplication with a wad number (rayMul)", async () => {
            const baseNumber = parseUnits("1", 27);
            const two = parseUnits("2", 27);
            const four = parseUnits("4", 27);
            expect(WadRayMath.rayMul(baseNumber, WadRayMath.RAY)).toBnEquals(baseNumber);
            expect(WadRayMath.rayMul(baseNumber, two)).toBnEquals(two);
            expect(WadRayMath.rayMul(two, two)).toBnEquals(four);
            expect(WadRayMath.rayMul(two, 1)).toBnEquals("2"); // mul by 1e-18
        });
        it("should compute correctly the division with a wad number (rayDiv)", async () => {
            const baseNumber = parseUnits("1", 27);
            const two = parseUnits("2", 27);
            const three = parseUnits("3", 27);
            expect(WadRayMath.rayDiv(baseNumber, WadRayMath.RAY)).toBnEquals(baseNumber);
            expect(WadRayMath.rayDiv(baseNumber, two)).toBnEquals(parseUnits("0.5", 27));
            expect(WadRayMath.rayDiv(two, 1)).toBnEquals(parseUnits("2", 27 * 2)); // mul by 1e-18
            expect(WadRayMath.rayDiv(baseNumber, three)).toBnEquals("3".repeat(27));
        });
        it("should convert ray to wad and vice-versa", async () => {
            expect(WadRayMath.wadToRay(WadRayMath.WAD)).toBnEquals(WadRayMath.RAY);
            expect(WadRayMath.rayToWad(WadRayMath.RAY)).toBnEquals(WadRayMath.WAD);

            const wadLike = WadRayMath.parseWad("123");
            const rayLike = WadRayMath.wadToRay(wadLike);
            expect(rayLike).toBnEquals("123000000000000000000000000000");
            expect(WadRayMath.formatRay(rayLike)).toEqual("123.0");
        });
        it("should compute correctly the rounded up division with a wad number (wadDivUp)", async () => {
            const baseNumber = parseUnits("1");
            const two = parseUnits("2");
            const three = parseUnits("3");
            expect(WadRayMath.wadDivUp(baseNumber, WadRayMath.WAD)).toBnEquals(baseNumber);
            expect(WadRayMath.wadDivUp(baseNumber, two)).toBnEquals(parseUnits("0.5"));
            expect(WadRayMath.wadDivUp(two, 1)).toBnEquals(parseUnits("2", 18 * 2)); // mul by 1e-18
            expect(WadRayMath.wadDivUp(baseNumber, three)).toBnEquals("3".repeat(17) + "4");
        });
        it("should compute correctly the rounded up division with a ray number (rayDivUp)", async () => {
            const baseNumber = parseUnits("1", 27);
            const two = parseUnits("2", 27);
            const three = parseUnits("3", 27);
            expect(WadRayMath.rayDivUp(baseNumber, WadRayMath.RAY)).toBnEquals(baseNumber);
            expect(WadRayMath.rayDivUp(baseNumber, two)).toBnEquals(parseUnits("0.5", 27));
            expect(WadRayMath.rayDivUp(two, 1)).toBnEquals(parseUnits("2", 27 * 2)); // mul by 1e-18
            expect(WadRayMath.rayDivUp(baseNumber, three)).toBnEquals("3".repeat(26) + "4");
        });
    });
});
