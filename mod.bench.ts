import { rangeIterator } from "./mod.ts";
Deno.bench("BigInteger 1~9", { permissions: "none" }, () => {
	for (const element of rangeIterator(1n, 9n)) {
		void element;
	}
});
Deno.bench("BigInteger 1~9 Excludes 4", { permissions: "none" }, () => {
	for (const element of rangeIterator(1n, 9n, { excludes: [4n] })) {
		void element;
	}
});
Deno.bench("BigInteger 1~1000", { permissions: "none" }, () => {
	for (const element of rangeIterator(1n, 1000n)) {
		void element;
	};
});
Deno.bench("BigInteger 9~1 ExcludeEnd", { permissions: "none" }, () => {
	for (const element of rangeIterator(9n, 1n, { excludeEnd: true })) {
		void element;
	}
});
Deno.bench("BigInteger 1000~1", { permissions: "none" }, () => {
	for (const element of rangeIterator(1000n, 1n)) {
		void element;
	}
});
Deno.bench("Number 1~9", { permissions: "none" }, () => {
	for (const element of rangeIterator(1, 9)) {
		void element;
	}
});
Deno.bench("Number 1~9 Step 0.5", { permissions: "none" }, () => {
	for (const element of rangeIterator(1, 9, { step: 0.5 })) {
		void element;
	}
});
Deno.bench("Number 1~1000", { permissions: "none" }, () => {
	for (const element of rangeIterator(1, 1000)) {
		void element;
	}
});
Deno.bench("Number 9~1", { permissions: "none" }, () => {
	for (const element of rangeIterator(9, 1)) {
		void element;
	}
});
Deno.bench("Number 9~1 Step 0.5", { permissions: "none" }, () => {
	for (const element of rangeIterator(9, 1, { step: 0.5 })) {
		void element;
	}
});
Deno.bench("Number 1000~1", { permissions: "none" }, () => {
	for (const element of rangeIterator(1000, 1)) {
		void element;
	}
});
Deno.bench("Character a~z", { permissions: "none" }, () => {
	for (const element of rangeIterator("a", "z")) {
		void element;
	}
});
Deno.bench("Character z~a", { permissions: "none" }, () => {
	for (const element of rangeIterator("z", "a")) {
		void element;
	}
});
Deno.bench("Character u0~u1114111", { permissions: "none" }, () => {
	for (const element of rangeIterator("\u0000", "\u{10FFFF}")) {
		void element;
	}
});
Deno.bench("Character u1114111~u0", { permissions: "none" }, () => {
	for (const element of rangeIterator("\u{10FFFF}", "\u0000")) {
		void element;
	}
});
