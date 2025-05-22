import { describe, test, expect } from "vitest";
import { success, failure, match, map, flatMap } from "./Result";
import type { Success, Failure } from "./Result";

describe("Result", () => {
  test("success creates a success result", () => {
    const result = success(42);
    expect(result._tag).toBe("success");
    // Type assertion to access value property
    expect((result as Success<number>).value).toBe(42);
  });

  test("failure creates a failure result", () => {
    const error = new Error("Test error");
    const result = failure(error);
    expect(result._tag).toBe("failure");
    // Type assertion to access error property
    expect((result as Failure<Error>).error).toBe(error);
  });

  test("match applies the success function for success results", () => {
    const result = success(42);
    const matched = match(
      result,
      (value) => `Success: ${value}`,
      (error: Error) => `Error: ${error.message}`
    );
    expect(matched).toBe("Success: 42");
  });

  test("match applies the failure function for failure results", () => {
    const error = new Error("Test error");
    const result = failure(error);
    const matched = match(
      result,
      (value) => `Success: ${value}`,
      (error: Error) => `Error: ${error.message}`
    );
    expect(matched).toBe("Error: Test error");
  });

  test("map transforms the value of a success result", () => {
    const result = success(42);
    const mapped = map(result, (value) => value * 2);
    expect(mapped._tag).toBe("success");
    // Type assertion to access value property
    expect((mapped as Success<number>).value).toBe(84);
  });

  test("map does not transform a failure result", () => {
    const error = new Error("Test error");
    const result = failure(error);
    const mapped = map(result, (value: number) => value * 2);
    expect(mapped._tag).toBe("failure");
    // Type assertion to access error property
    expect((mapped as Failure<Error>).error).toBe(error);
  });

  test("flatMap applies a function that returns a Result for success results", () => {
    const result = success(42);
    const flatMapped = flatMap(result, (value) => success(value * 2));
    expect(flatMapped._tag).toBe("success");
    // Type assertion to access value property
    expect((flatMapped as Success<number>).value).toBe(84);
  });

  test("flatMap does not transform a failure result", () => {
    const error = new Error("Test error");
    const result = failure(error);
    const flatMapped = flatMap(result, (value: number) => success(value * 2));
    expect(flatMapped._tag).toBe("failure");
    // Type assertion to access error property
    expect((flatMapped as Failure<Error>).error).toBe(error);
  });
});
