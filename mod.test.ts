import { deepStrictEqual } from "node:assert";
import { rangeIterator } from "./mod.ts";
Deno.test("Number 1~9", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(1, 9)), [1, 2, 3, 4, 5, 6, 7, 8, 9]);
});
Deno.test("BigInteger 1~9 ExcludeEnd", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(1n, 9n, { excludeEnd: true })), [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]);
});
Deno.test("Number 1~9 Step 0.5", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(1, 9, { step: 0.5 })), [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]);
});
Deno.test("Character a~z", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator("a", "z")), ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"]);
});
Deno.test("Number 9~1", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(9, 1)), [9, 8, 7, 6, 5, 4, 3, 2, 1]);
});
Deno.test("BigInteger 9~1 ExcludeEnd", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(9n, 1n, { excludeEnd: true })), [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n]);
});
Deno.test("Number 9~1 Step 0.5", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(9, 1, { step: 0.5 })), [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1]);
});
Deno.test("Character z~a", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator("z", "a")), ["z", "y", "x", "w", "v", "u", "t", "s", "r", "q", "p", "o", "n", "m", "l", "k", "j", "i", "h", "g", "f", "e", "d", "c", "b", "a"]);
});
Deno.test("BigInteger 1~1000", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(1n, 1000n)).length, 1000);
});
Deno.test("Number 1~1000", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(1, 1000)).length, 1000);
});
Deno.test("CharacterCodePoint 0~1114111", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator("\u0000", "\u{10FFFF}")).length, 1114112);
});
Deno.test("BigInteger 1000~1", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(1000n, 1n)).length, 1000);
});
Deno.test("Number 1000~1", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator(1000, 1)).length, 1000);
});
Deno.test("CharacterCodePoint 1114111~0", { permissions: "none" }, () => {
	deepStrictEqual(Array.from(rangeIterator("\u{10FFFF}", "\u0000")).length, 1114112);
});
