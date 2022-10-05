import { maxBN, maxBNS, minBN, minBNS, pow10 } from "../src/utils";

describe("Test ethers-utils helpers", () => {
    describe("maths", () => {
        it("should compute correctly the power of a number", async () => {
            expect(pow10(3)).toBnEquals(1000);
        });

        it("should compute correctly the minimum between two big numbers ", async () => {
            expect(minBN(10, 20)).toBnEquals(10);
            expect(minBN(20, 1)).toBnEquals(1);
            expect(minBN(10, 10)).toBnEquals(10);
            expect(minBN(0, 10)).toBnBeZero();
            expect(minBN(-10, 10)).toBnBeNegative();
            expect(minBN(-10, 10)).toBnEquals(-10);
        });

        it("should compute correctly the minimum between multiple big numbers with a recursive function", async () => {
            expect(minBNS(10, 20, 30)).toBnEquals(10);
            expect(minBNS(20, 14, 4, 1, 15)).toBnEquals(1);
            expect(minBNS(10, 10, 10)).toBnEquals(10);
            expect(minBNS(0, 10, 20, 43, 44)).toBnBeZero();
            expect(minBNS(-10, 10, 56, 32)).toBnBeNegative();
            expect(minBNS(-10, 10)).toBnEquals(-10);
            expect(() => minBNS(1)).toThrowError("minBNS need at least 2 BigNumbers");
        });
        it("should compute correctly the maximum between two big numbers ", async () => {
            expect(maxBN(10, 20)).toBnEquals(20);
            expect(maxBN(20, 1)).toBnEquals(20);
            expect(maxBN(10, 10)).toBnEquals(10);
            expect(maxBN(0, -10)).toBnBeZero();
            expect(maxBN(-10, -5)).toBnBeNegative();
            expect(maxBN(-10, -5)).toBnEquals(-5);
            expect(maxBN(-10, 10)).toBnEquals(10);
        });

        it("should compute correctly the minimum between multiple big numbers with a recursive function", async () => {
            expect(maxBNS(10, 20, 30)).toBnEquals(30);
            expect(maxBNS(20, 14, 4, 1, 15)).toBnEquals(20);
            expect(maxBNS(10, 10, 10)).toBnEquals(10);
            expect(maxBNS(0, -10, -20, -43, -44)).toBnBeZero();
            expect(maxBNS(-10, 10, 56, 32)).toBnBePositive();
            expect(maxBNS(-10, -11, -5)).toBnEquals(-5);
            expect(() => maxBNS(1)).toThrowError("maxBNS need at least 2 BigNumbers");
        });
    });
});
