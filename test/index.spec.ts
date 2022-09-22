import * as dotenv from "dotenv";
import {minBN, pow10} from "../src/utils";

dotenv.config({ path: ".env.local" });

describe("Test ethers-utils helpers", () => {

  describe("maths", () => {
    it("should compute correctly the power of a number", async () => {
      expect(pow10(3)).toBnEquals(1000)
    });

    it("should compute correctly the minimum between two big numbers ", async () => {
      expect(minBN(10, 20)).toBnEquals(10)
      expect(minBN(20, 1)).toBnEquals(1)
      expect(minBN(10, 10)).toBnEquals(10)
      expect(minBN(0, 10)).toBnBeZero()
      expect(minBN(-10, 10)).toBnBeNegative()
      expect(minBN(-10, 10)).toBnEquals(-10)
    });
  });
});
