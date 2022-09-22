import * as dotenv from "dotenv";
import {pow10} from "../src/utils";

dotenv.config({ path: ".env.local" });

describe("Test ethers-utils helpers", () => {

  describe("pow10", () => {
    it("should compute correctly the power of a number", async () => {
      expect(pow10(3).eq(1000)).toBeTruthy();
    });

  });
});
