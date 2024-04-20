export function mergeWithGetters<A, B>(a: A, b: B): A & B {
  return Object.defineProperties(
    {},
    {
      ...Object.getOwnPropertyDescriptors(a),
      ...Object.getOwnPropertyDescriptors(b),
    },
  ) as A & B
}
