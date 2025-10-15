# Range Iterator (ES)

[**⚖️** MIT](./LICENSE.md)

[![GitHub: hugoalh/range-iterator-es](https://img.shields.io/github/v/release/hugoalh/range-iterator-es?label=hugoalh/range-iterator-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh/range-iterator-es")](https://github.com/hugoalh/range-iterator-es)
[![JSR: @hugoalh/range-iterator](https://img.shields.io/jsr/v/@hugoalh/range-iterator?label=@hugoalh/range-iterator&labelColor=F7DF1E&logo=jsr&logoColor=000000&style=flat "JSR: @hugoalh/range-iterator")](https://jsr.io/@hugoalh/range-iterator)
[![NPM: @hugoalh/range-iterator](https://img.shields.io/npm/v/@hugoalh/range-iterator?label=@hugoalh/range-iterator&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/range-iterator")](https://www.npmjs.com/package/@hugoalh/range-iterator)

An ECMAScript module to iterate between range.

## 🎯 Targets

| **Runtime \\ Source** | **GitHub Raw** | **JSR** | **NPM** |
|:--|:-:|:-:|:-:|
| **[Bun](https://bun.sh/)** >= v1.1.0 | ❌ | ✔️ | ✔️ |
| **[Deno](https://deno.land/)** >= v2.1.0 | ✔️ | ✔️ | ✔️ |
| **[NodeJS](https://nodejs.org/)** >= v20.9.0 | ❌ | ✔️ | ✔️ |

## 🛡️ Runtime Permissions

This does not request any runtime permission.

## #️⃣ Sources

- GitHub Raw
  ```
  https://raw.githubusercontent.com/hugoalh/range-iterator-es/{Tag}/mod.ts
  ```
- JSR
  ```
  jsr:@hugoalh/range-iterator[@{Tag}]
  ```
- NPM
  ```
  npm:@hugoalh/range-iterator[@{Tag}]
  ```

> [!NOTE]
> - It is recommended to include tag for immutability.
> - These are not part of the public APIs hence should not be used:
>   - Benchmark/Test file (e.g.: `example.bench.ts`, `example.test.ts`).
>   - Entrypoint name or path include any underscore prefix (e.g.: `_example.ts`, `foo/_example.ts`).
>   - Identifier/Namespace/Symbol include any underscore prefix (e.g.: `_example`, `Foo._example`).

## ⤵️ Entrypoints

| **Name** | **Path** | **Description** |
|:--|:--|:--|
| `.` | `./mod.ts` | Default. |

## 🧩 APIs

- ```ts
  function rangeIterator(start: bigint, end: bigint, options?: RangeIteratorOptions<bigint>): Generator<bigint>;
  function rangeIterator(start: bigint, end: bigint, step: bigint): Generator<bigint>;
  function rangeIterator(start: number, end: number, options?: RangeIteratorOptions<number>): Generator<number>;
  function rangeIterator(start: number, end: number, step: number): Generator<number>;
  function rangeIterator(start: string, end: string, options?: RangeIteratorOptions<string>): Generator<string>;
  function rangeIterator(start: string, end: string, step: number): Generator<string>;
  ```
- ```ts
  interface RangeIteratorOptions<T extends bigint | number | string> {
    excludeEnd?: boolean;
    excludes?: readonly T[] | Set<T>;
    excludeStart?: boolean;
    step?: T extends string ? number : T;
  }
  ```

> [!NOTE]
> - For the full or prettier documentation, can visit via:
>   - [Deno CLI `deno doc`](https://docs.deno.com/runtime/reference/cli/doc/)
>   - [JSR](https://jsr.io/@hugoalh/range-iterator)

## ✍️ Examples

- ```ts
  Array.from(rangeIterator(1, 9));
  //=> [1, 2, 3, 4, 5, 6, 7, 8, 9]
  ```
- ```ts
  Array.from(rangeIterator(1n, 9n, { excludeEnd: true }));
  //=> [1n, 2n, 3n, 4n, 5n, 6n, 7n, 8n]
  ```
- ```ts
  Array.from(rangeIterator(1, 9, { step: 0.5 }));
  //=> [1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9]
  ```
- ```ts
  Array.from(rangeIterator("a", "z"));
  //=> ["a", "b", "c", ... +20 ..., "x", "y", "z"]
  ```
- ```ts
  Array.from(rangeIterator(9, 1));
  //=> [9, 8, 7, 6, 5, 4, 3, 2, 1]
  ```
- ```ts
  Array.from(rangeIterator(9n, 1n, { excludeEnd: true }));
  //=> [9n, 8n, 7n, 6n, 5n, 4n, 3n, 2n]
  ```
- ```ts
  Array.from(rangeIterator(9, 1, { step: 0.5 }));
  //=> [9, 8.5, 8, 7.5, 7, 6.5, 6, 5.5, 5, 4.5, 4, 3.5, 3, 2.5, 2, 1.5, 1]
  ```
- ```ts
  Array.from(rangeIterator("z", "a"));
  //=> ["z", "y", "x", ... +20 ..., "c", "b", "a"]
  ```
