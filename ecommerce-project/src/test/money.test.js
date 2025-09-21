import { it, describe, expect } from "vitest";

import { formatMoney } from "../utils/money.js";

describe("formatMoney function", () => {
  it("formats 1090 cents as $10.90", () => {
    expect(formatMoney(1090)).toBe("$10.90");
  });

  it("displays 2 decimal places for cents", () => {
    expect(formatMoney(1090)).toBe("$10.90");
    expect(formatMoney(1000)).toBe("$10.00");
  });
});
