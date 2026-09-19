import { describe, expect, it } from "vitest";

describe("restaurant title configuration", () => {
  it("uses the official restaurant name", () => {
    expect(import.meta.env.VITE_APP_TITLE).toBe("عز الدمشقي | مطعم سوري");
  });
});
