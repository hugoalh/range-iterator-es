function resolveCharacterCodePoint(parameterName: string, item: string): number {
	const codePoint: number | undefined = item.codePointAt(0);
	if (item.length > 0 && typeof codePoint !== "undefined" && item.length === String.fromCodePoint(codePoint).length) {
		return codePoint;
	}
	throw new RangeError(`\`${item}\` (parameter \`${parameterName}\`) is not a character which is in code point range 0 ~ 1114111!`);
}
/**
 * Options of the {@linkcode rangeIterator}.
 */
export interface RangeIteratorOptions<T extends bigint | number | string> {
	/**
	 * Whether to exclude the end value of the range.
	 * @default {false}
	 */
	excludeEnd?: boolean;
	/**
	 * Exclude specify values.
	 */
	excludes?: readonly T[] | Set<T>;
	/**
	 * Whether to exclude the start value of the range.
	 * @default {false}
	 */
	excludeStart?: boolean;
	/**
	 * Step of the increment (when `start` is smaller than `end`) or decrement (when `start` is bigger than `end`) of the iterate. By default, it is 1 step.
	 * 
	 * When iterate numbers, this property also accept float number.
	 */
	step?: T extends string ? number : T;
}
interface RangeIteratorOptionsInternal<T extends bigint | number | string> extends Required<Pick<RangeIteratorOptions<T>, "excludes" | "step">> {
	excludes: Set<T>;
}
function rangeIteratorNumerics(start: bigint, end: bigint, options: RangeIteratorOptionsInternal<bigint>): Generator<bigint>;
function rangeIteratorNumerics(start: number, end: number, options: RangeIteratorOptionsInternal<number>): Generator<number>;
function* rangeIteratorNumerics(start: bigint | number, end: bigint | number, options: RangeIteratorOptionsInternal<bigint | number>): Generator<bigint | number> {
	const {
		excludes,
		step
	}: RangeIteratorOptionsInternal<bigint | number> = options;
	if (start <= end) {
		// Increment
		//@ts-ignore Overload.
		for (let current: bigint | number = start; current <= end; current += step) {
			if (!excludes.has(current)) {
				yield current;
			}
		}
	} else {
		// Decrement
		//@ts-ignore Overload.
		for (let current: bigint | number = start; current >= end; current -= step) {
			if (!excludes.has(current)) {
				yield current;
			}
		}
	}
}
function* rangeIteratorCharacters(start: number, end: number, options: RangeIteratorOptionsInternal<string>): Generator<string> {
	const { excludes }: RangeIteratorOptionsInternal<string> = options;
	for (const current of rangeIteratorNumerics(start, end, {
		...options,
		excludes: new Set<number>()
	})) {
		const currentString: string = String.fromCodePoint(current);
		if (!excludes.has(currentString)) {
			yield currentString;
		}
	}
}
/**
 * Range iterator with big integers.
 * @param {bigint} start A big integer to start the iterate.
 * @param {bigint} end A big integer to end the iterate.
 * @param {RangeIteratorOptions<bigint>} [options] Options.
 * @returns {Generator<bigint>}
 * @example
 * ```ts
 * Array.from(rangeIterator(1n, 9n));
 * //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n, 9n]
 * ```
 * @example
 * ```ts
 * Array.from(rangeIterator(1n, 9n, { excludeEnd: true }));
 * //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]
 * ```
 * @example
 * ```ts
 * Array.from(rangeIterator(9n, 1n));
 * //=> [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n, 1n]
 * ```
 */
export function rangeIterator(start: bigint, end: bigint, options?: RangeIteratorOptions<bigint>): Generator<bigint>;
/**
 * Range iterator with big integers.
 * @param {bigint} start A big integer to start the iterate.
 * @param {bigint} end A big integer to end the iterate.
 * @param {bigint} step Step of the decrement/increment of the iterate.
 * @returns {Generator<bigint>}
 * @example
 * ```ts
 * Array.from(rangeIterator(1n, 9n, 2n));
 * //=> [1n, 3n, 5n, 7n, 9n]
 * ```
 * @example
 * ```ts
 * Array.from(rangeIterator(9n, 1n, 2n));
 * //=> [9n, 7n, 5n, 3n, 1n]
 * ```
 */
export function rangeIterator(start: bigint, end: bigint, step: bigint): Generator<bigint>;
/**
 * Range iterator with numbers.
 * @param {number} start A number to start the iterate.
 * @param {number} end A number to end the iterate.
 * @param {RangeIteratorOptions<number>} [options] Options.
 * @returns {Generator<number>}
 * @example
 * ```ts
 * Array.from(rangeIterator(1, 9));
 * //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
 * ```
 * @example
 * ```ts
 * Array.from(rangeIterator(1, 9, { excludeEnd: true }));
 * //=> [1, 2, 3, 4, 5, 6, 7, 8]
 * ```
 * @example
 * ```ts
 * Array.from(rangeIterator(9, 1));
 * //=> [9, 8, 7, 6, 5, 4, 3, 2, 1]
 * ```
 */
export function rangeIterator(start: number, end: number, options?: RangeIteratorOptions<number>): Generator<number>;
/**
 * Range iterator with numbers.
 * @param {number} start A number to start the iterate.
 * @param {number} end A number to end the iterate.
 * @param {number} step Step of the decrement/increment of the iterate.
 * @returns {Generator<number>}
 * @example
 * ```ts
 * Array.from(rangeIterator(1, 9, 2));
 * //=> [1, 3, 5, 7, 9]
 * ```
 * @example
 * ```ts
 * Array.from(rangeIterator(9, 1, 2));
 * //=> [9, 7, 5, 3, 1]
 * ```
 */
export function rangeIterator(start: number, end: number, step: number): Generator<number>;
/**
 * Range iterator with characters.
 * @param {string} start A character to start the iterate.
 * @param {string} end A character to end the iterate.
 * @param {RangeIteratorOptions<string>} [options] Options.
 * @returns {Generator<string>}
 * @example
 * ```ts
 * Array.from(rangeIterator("a", "g"));
 * //=> ["a", "b", "c", "d", "e", "f", "g"]
 * ```
 * @example
 * ```ts
 * Array.from(rangeIterator("a", "g", { excludeEnd: true }));
 * //=> ["a", "b", "c", "d", "e", "f"]
 * ```
 * @example
 * ```ts
 * Array.from(rangeIterator("g", "a"));
 * //=> ["g", "f", "e", "d", "c", "b", "a"]
 * ```
 */
export function rangeIterator(start: string, end: string, options?: RangeIteratorOptions<string>): Generator<string>;
/**
 * Range iterator with characters.
 * @param {string} start A character to start the iterate.
 * @param {string} end A character to end the iterate.
 * @param {number} step Step of the decrement/increment of the iterate.
 * @returns {Generator<string>}
 * @example
 * ```ts
 * Array.from(rangeIterator("a", "g", 2));
 * //=> ["a", "c", "e", "g"]
 * ```
 * @example
 * ```ts
 * Array.from(rangeIterator("g", "a", 2));
 * //=> ["g", "e", "c", "a"]
 * ```
 */
export function rangeIterator(start: string, end: string, step: number): Generator<string>;
export function rangeIterator(start: bigint | number | string, end: bigint | number | string, param2?: bigint | number | RangeIteratorOptions<bigint | number | string>): Generator<bigint | number | string> {
	const options: RangeIteratorOptions<bigint | number | string> = (
		typeof param2 === "bigint" ||
		typeof param2 === "number"
	) ? { step: param2 } : (param2 ?? {});
	const {
		excludeEnd = false,
		excludes,
		excludeStart = false
	}: RangeIteratorOptions<bigint | number | string> = options;
	const excludesFmt: Set<bigint | number | string> = (excludes instanceof Set) ? excludes : new Set(excludes);
	if (excludeEnd) {
		excludesFmt.add(end);
	}
	if (excludeStart) {
		excludesFmt.add(start);
	}
	if (typeof start === "bigint" && typeof end === "bigint") {
		if (typeof options.step !== "undefined") {
			if (!(typeof options.step === "bigint" && options.step > 0n)) {
				throw new RangeError(`\`${options.step}\` (parameter \`options.step\`) is not a bigint which is > 0!`);
			}
		}
		return rangeIteratorNumerics(start, end, {
			excludes: excludesFmt as Set<bigint>,
			step: options.step ?? 1n
		});
	}
	if (typeof start === "number" && typeof end === "number") {
		if (typeof options.step !== "undefined") {
			if (!(typeof options.step === "number" && options.step > 0)) {
				throw new RangeError(`\`${options.step}\` (parameter \`options.step\`) is not a number which is > 0!`);
			}
		}
		return rangeIteratorNumerics(start, end, {
			excludes: excludesFmt as Set<number>,
			step: options.step ?? 1
		});
	}
	if (typeof start === "string" && typeof end === "string") {
		const startCodePoint: number = resolveCharacterCodePoint("start", start);
		const endCodePoint: number = resolveCharacterCodePoint("end", end);
		if (typeof options.step !== "undefined") {
			if (!(typeof options.step === "number" && Number.isSafeInteger(options.step) && options.step > 0)) {
				throw new RangeError(`\`${options.step}\` (parameter \`options.step\`) is not a number which is integer, safe, and > 0!`);
			}
		}
		return rangeIteratorCharacters(startCodePoint, endCodePoint, {
			excludes: excludesFmt as Set<string>,
			step: options.step ?? 1
		});
	}
	throw new TypeError(`Parameters \`start\` and \`end\` are not bigints, numbers, or strings (character)!`);
}
export default rangeIterator;
