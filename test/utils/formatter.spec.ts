import { parseUnits } from "ethers/lib/utils";

import { safeNumberToString, formatBN, Format } from "../../src/utils/formatter";

describe("Test ethers-utils formatters", () => {
    describe("safeNumberToString", () => {
        it("should parse any kind of number to a string", () => {
            expect(safeNumberToString(1)).toEqual("1");
            expect(safeNumberToString(-1)).toEqual("-1");
            expect(safeNumberToString(1.3e2)).toEqual("130");
            expect(safeNumberToString(1.3e-2)).toEqual("0.013");
        });
    });

    describe("formatBN", () => {
        const decimals = 18;
        const bn = parseUnits("123456.7890", decimals);
        const negBN = parseUnits("-123456.7890", decimals);
        describe("should format a BigNumber in a `number` format", () => {
            it("without options", () => {
                expect(formatBN(bn, decimals, { format: Format.number })).toEqual(
                    "123456.789000000000000000"
                );
                expect(formatBN(negBN, decimals, { format: Format.number })).toEqual(
                    "-123456.789000000000000000"
                );
            });

            it("with digits", () => {
                expect(formatBN(bn, decimals, { format: Format.number, digits: 2 })).toEqual(
                    "123456.78"
                );
                expect(formatBN(negBN, decimals, { format: Format.number, digits: 2 })).toEqual(
                    "-123456.78"
                );
                expect(formatBN(bn, decimals, { format: Format.number, digits: 6 })).toEqual(
                    "123456.789000"
                );
                expect(formatBN(negBN, decimals, { format: Format.number, digits: 6 })).toEqual(
                    "-123456.789000"
                );
            });

            it("without trailing zeros", () => {
                // without trailing zeros
                expect(
                    formatBN(bn, decimals, { format: Format.number, removeTrailingZero: true })
                ).toEqual("123456.789");
                expect(
                    formatBN(negBN, decimals, { format: Format.number, removeTrailingZero: true })
                ).toEqual("-123456.789");
            });

            it("with sign", () => {
                expect(formatBN(bn, decimals, { format: Format.number, sign: true })).toEqual(
                    "+123456.789000000000000000"
                );
                expect(formatBN(negBN, decimals, { format: Format.number, sign: true })).toEqual(
                    "-123456.789000000000000000"
                );
            });

            it("with unit", () => {
                expect(formatBN(bn, decimals, { format: Format.number, unit: "$" })).toEqual(
                    "$123456.789000000000000000"
                );
                expect(formatBN(bn, decimals, { format: Format.number, unit: "%" })).toEqual(
                    "123456.789000000000000000%"
                );
                expect(formatBN(bn, decimals, { format: Format.number, unit: "UNIT" })).toEqual(
                    "123456.789000000000000000 UNIT"
                );
                expect(formatBN(negBN, decimals, { format: Format.number, unit: "$" })).toEqual(
                    "$-123456.789000000000000000"
                );
                expect(formatBN(negBN, decimals, { format: Format.number, unit: "%" })).toEqual(
                    "-123456.789000000000000000%"
                );
                expect(formatBN(negBN, decimals, { format: Format.number, unit: "UNIT" })).toEqual(
                    "-123456.789000000000000000 UNIT"
                );
            });

            it("with a max value", () => {
                expect(formatBN(bn, decimals, { format: Format.number, max: 1000 })).toEqual(
                    "> 1000.000000000000000000"
                );
                expect(formatBN(negBN, decimals, { format: Format.number, max: -200000 })).toEqual(
                    "> -200000.000000000000000000"
                );
            });

            it("with a min value", () => {
                expect(formatBN(bn, decimals, { format: Format.number, min: 200000 })).toEqual(
                    "< 200000.000000000000000000"
                );
                expect(formatBN(negBN, decimals, { format: Format.number, min: 0 })).toEqual(
                    "< 0.000000000000000000"
                );
            });

            it("with several options set", () => {
                expect(
                    formatBN(bn, decimals, {
                        format: Format.number,
                        unit: "$",
                        sign: true,
                        digits: 6,
                    })
                ).toEqual("$+123456.789000");
            });
        });
    });
});