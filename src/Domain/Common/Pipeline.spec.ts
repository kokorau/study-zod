import { describe, test, expect } from "vitest";
import { pipe, asyncPipe } from "./Pipeline";

describe("Pipeline", () => {
  test("pipe composes functions from left to right", () => {
    const add2 = (x: number) => x + 2;
    const multiply3 = (x: number) => x * 3;
    const subtract5 = (x: number) => x - 5;
    
    const composed = pipe(add2, multiply3, subtract5);
    const result = composed(10);
    
    // (10 + 2) * 3 - 5 = 36 - 5 = 31
    expect(result).toBe(31);
  });
  
  test("pipe with a single function returns the same result as the function", () => {
    const add2 = (x: number) => x + 2;
    const composed = pipe(add2);
    const result = composed(10);
    
    expect(result).toBe(12);
  });
  
  test("pipe with no functions returns the input value", () => {
    const composed = pipe<number>();
    const result = composed(10);
    
    expect(result).toBe(10);
  });
  
  test("asyncPipe composes async functions from left to right", async () => {
    const asyncAdd2 = async (x: number) => x + 2;
    const asyncMultiply3 = async (x: number) => x * 3;
    const asyncSubtract5 = async (x: number) => x - 5;
    
    const composed = asyncPipe(asyncAdd2, asyncMultiply3, asyncSubtract5);
    const result = await composed(10);
    
    // (10 + 2) * 3 - 5 = 36 - 5 = 31
    expect(result).toBe(31);
  });
  
  test("asyncPipe with a single function returns the same result as the function", async () => {
    const asyncAdd2 = async (x: number) => x + 2;
    const composed = asyncPipe(asyncAdd2);
    const result = await composed(10);
    
    expect(result).toBe(12);
  });
  
  test("asyncPipe with no functions returns the input value", async () => {
    const composed = asyncPipe<number>();
    const result = await composed(10);
    
    expect(result).toBe(10);
  });
});
