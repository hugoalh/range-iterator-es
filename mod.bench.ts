import { rangeIterator } from "./mod.ts";
Deno.bench("Number 1~9", { permissions: "none" }, () => {
	for (const value of rangeIterator(1, 9)) {
		void value;
	}
});
Deno.bench("BigInteger 1~9 ExcludeEnd", { permissions: "none" }, () => {
	for (const value of rangeIterator(1n, 9n, { excludeEnd: true })) {
		void value;
	}
});
Deno.bench("Number 1~9 Step 0.5", { permissions: "none" }, () => {
	for (const value of rangeIterator(1, 9, { step: 0.5 })) {
		void value;
	}
});
Deno.bench("Character a~z", { permissions: "none" }, () => {
	for (const value of rangeIterator("a", "z")) {
		void value;
	}
});
Deno.bench("Number 9~1", { permissions: "none" }, () => {
	for (const value of rangeIterator(9, 1)) {
		void value;
	}
});
Deno.bench("BigInteger 9~1 ExcludeEnd", { permissions: "none" }, () => {
	for (const value of rangeIterator(9n, 1n, { excludeEnd: true })) {
		void value;
	}
});
Deno.bench("Number 9~1 Step 0.5", { permissions: "none" }, () => {
	for (const value of rangeIterator(9, 1, { step: 0.5 })) {
		void value;
	}
});
Deno.bench("Character z~a", { permissions: "none" }, () => {
	for (const value of rangeIterator("z", "a")) {
		void value;
	}
});

Deno.bench("BigInteger 1~1000", { permissions: "none" }, () => {
	for (const value of rangeIterator(1n, 1000n)) {
		void value;
	}
});
Deno.bench("Number 1~1000", { permissions: "none" }, () => {
	for (const value of rangeIterator(1, 1000)) {
		void value;
	}
});
Deno.bench("CharacterCodePoint 0~1114111", { permissions: "none" }, () => {
	for (const value of rangeIterator("\u0000", "\u{10FFFF}")) {
		void value;
	}
});
Deno.bench("BigInteger 1000~1", { permissions: "none" }, () => {
	for (const value of rangeIterator(1000n, 1n)) {
		void value;
	}
});
Deno.bench("Number 1000~1", { permissions: "none" }, () => {
	for (const value of rangeIterator(1000, 1)) {
		void value;
	}
});
Deno.bench("CharacterCodePoint 1114111~0", { permissions: "none" }, () => {
	for (const value of rangeIterator("\u{10FFFF}", "\u0000")) {
		void value;
	}
});
