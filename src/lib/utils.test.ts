import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn utility", () => {
  it("deve combinar classes simples", () => {
    expect(cn("foo", "bar")).toBe("foo bar");
  });

  it("deve remover classes duplicadas", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("deve lidar com valores condicionais", () => {
    expect(cn("foo", false && "bar", "baz")).toBe("foo baz");
  });

  it("deve lidar com undefined e null", () => {
    expect(cn("foo", undefined, null, "bar")).toBe("foo bar");
  });

  it("deve mesclar classes do Tailwind corretamente", () => {
    expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
  });
});

