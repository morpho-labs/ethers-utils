import { BigNumber } from "ethers";
import { parseUnits } from "ethers/lib/utils";

export enum Format {
    number = "number",
    commas = "commas",
    short = "short",
    hex = "hex",
    percent = "percent",
}

interface BaseFormatOptions {
    digits?: number;
    removeTrailingZero?: boolean;
    min?: number;
    max?: number;
    sign?: boolean;
    unit?: string;
}

interface FormatShortOptions extends BaseFormatOptions {
    format: Format.short;
    smallValuesWithComas?: boolean;
}
interface FormatHexOptions {
    format: Format.hex;
}
interface FormatComasOptions extends BaseFormatOptions {
    format: Format.commas;
}
interface FormatNumberOptions extends BaseFormatOptions {
    format: Format.number;
}

interface FormatPercentOptions extends BaseFormatOptions {
    format: Format.percent;
}

export type FormatOptions =
    | FormatHexOptions
    | FormatShortOptions
    | FormatNumberOptions
    | FormatComasOptions
    | FormatPercentOptions;

declare global {
    interface String {
        insert(index: number, substr: string, fillWith?: string): string;
    }
}

String.prototype.insert = function (index, substr, fillWith) {
    if (index < 0) index = this.length + index;

    let filler = "";
    if (index < 0) {
        if (fillWith) filler = fillWith.repeat(-index).slice(index);
        index = 0;
    }
    return this.slice(0, index) + substr + filler + this.slice(index);
};

const RANGES = [
    {
        minDecimals: 24,
        symbol: "Y",
    },
    {
        minDecimals: 21,
        symbol: "Z",
    },
    {
        minDecimals: 18,
        symbol: "E",
    },
    {
        minDecimals: 15,
        symbol: "P",
    },
    {
        minDecimals: 12,
        symbol: "T",
    },
    {
        minDecimals: 9,
        symbol: "B",
    },
    {
        minDecimals: 6,
        symbol: "M",
    },
    {
        minDecimals: 4,
        symbol: "k",
    },
];
const _formatShort = (
    bn: BigNumber,
    decimals: number,
    formatOptions: Omit<FormatShortOptions, "format">
) => {
    const stringValue = bn.toString();
    const params = RANGES.find((range) => stringValue.length > range.minDecimals + decimals);
    if (params) {
        return (
            _applyOptions(
                stringValue.insert(-(params.minDecimals + decimals), ".", "0"),
                formatOptions
            ) + params.symbol
        );
    }
    if (formatOptions.smallValuesWithComas) {
        return _formatComas(bn, decimals, formatOptions);
    }
    return _applyOptions(stringValue.insert(-decimals, ".", "0"), formatOptions);
};

const _formatComas = (
    bn: BigNumber,
    decimals: number,
    formatOptions: Omit<FormatComasOptions, "format">
) => {
    const stringValue = bn.toString();

    const wholePart = stringValue.slice(0, -decimals);
    const decimalPart = stringValue.slice(-decimals);

    return _applyOptions(
        wholePart
            .split("")
            .reduce(
                (formattedNumber, digit, i, arr) =>
                    `${formattedNumber}${!i || (arr.length - i) % 3 ? "" : ","}${digit}`,
                ""
            ) +
            "." +
            decimalPart,
        formatOptions
    );
};

const _formatNumber = (
    bn: BigNumber,
    decimals: number,
    formatOptions: Omit<FormatNumberOptions, "format">
) => {
    if (decimals === 0) return _applyOptions(bn.toString(), formatOptions);
    return _applyOptions(bn.toString().insert(-decimals, ".", "0"), formatOptions);
};

const _withUnit = (value: string, unit: string) => {
    switch (unit) {
        case "$":
            return `$${value}`;
        case "":
        case "%":
            return `${value}${unit}`;
        default:
            return `${value} ${unit}`;
    }
};

const _applyOptions = (value: string, formatOptions: BaseFormatOptions) => {
    // eslint-disable-next-line prefer-const
    let [wholePart, decimalPart = ""] = value.split(".");

    if (formatOptions.digits !== undefined) {
        decimalPart = (decimalPart + "0".repeat(formatOptions.digits)).slice(
            0,
            formatOptions.digits
        );
    }

    if (formatOptions.removeTrailingZero) {
        decimalPart = decimalPart.replace(/\.?0+$/, "");
    }

    value = (wholePart || "0") + (decimalPart ? "." + decimalPart : "");

    return value;
};

export function formatBN(
    bn: BigNumber,
    decimals: number,
    formatOptions: FormatOptions = { format: Format.hex }
): string {
    if (formatOptions.format === Format.hex) return bn.toHexString();

    const maxBN = formatOptions.max && parseUnits(formatOptions.max.toString(), decimals);
    if (maxBN && bn.gt(maxBN)) {
        return `> ${formatBN(maxBN, decimals, formatOptions)}`;
    }
    const minBN = formatOptions.min && parseUnits(formatOptions.min.toString(), decimals);
    if (minBN && bn.lt(minBN)) {
        return `< ${formatBN(minBN, decimals, formatOptions)}`;
    }

    let value: string;
    const isNegative = bn.isNegative();

    switch (formatOptions.format) {
        case Format.commas:
            value = _formatComas(bn.abs(), decimals, formatOptions);
            break;
        case Format.number:
            value = _formatNumber(bn.abs(), decimals, formatOptions);
            break;
        case Format.short:
            value = _formatShort(bn.abs(), decimals, formatOptions);
            break;
        case Format.percent:
            value = _formatNumber(bn.abs().mul(100), decimals, formatOptions);
            break;
    }

    const formattedValue =
        (isNegative && !/^0\.0+$/.test(value) ? "-" : formatOptions.sign ? "+" : "") + value;

    if (formatOptions.unit) {
        return _withUnit(formattedValue, formatOptions.unit);
    }

    return formattedValue;
}

/**
 * returns a string representation of a number, always in a decimal format (avoid the 1.34e-15 format for small numbers)
 * @param number
 */
const safeNumberToString = (number: number) => {
    const str = number.toString();

    if (!/[eE]/.test(str)) return str;

    const [a, n] = str.split(/[eE]/);

    if (n[0] === "+") {
        const [whole, decimal = ""] = a.split(".");
        return whole + decimal + "0".repeat(+n - decimal.length);
    }

    if (n[0] === "-") {
        const isNegative = a[0] === "-";
        return (
            (isNegative ? "-" : "") +
            "0." +
            "0".repeat(-+n - 1) +
            (isNegative ? a.slice(1) : a).split(".").join("")
        );
    }

    throw new Error(`Unhandled case: ${str}`);
};

export function formatNumber(
    number: number,
    formatOptions: FormatOptions = { format: Format.number },
    precision = 18
): string {
    return formatBN(parseUnits(safeNumberToString(number), precision), precision, formatOptions);
}
