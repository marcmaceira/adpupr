/**
 * Asserts that what Payload stored equals what the seed wrote. Catches silent data loss,
 * such as array rows saved under the wrong parent (payloadcms/payload#19798).
 *
 * Rules: generated `id`s are ignored; a related document may come back as an id or as a
 * populated object with that id; missing optional values equal null.
 */
export function assertRoundTrip(expected: unknown, actual: unknown, label: string): void {
  const problems: string[] = [];
  compare(expected, actual, label, problems);
  if (problems.length > 0) {
    throw new Error(`Round-trip mismatch:\n${problems.slice(0, 20).join("\n")}`);
  }
}

function isEmpty(value: unknown): boolean {
  return value === null || value === undefined;
}

function compare(expected: unknown, actual: unknown, path: string, problems: string[]): void {
  if (isEmpty(expected)) return;

  if (typeof expected === "number" && actual && typeof actual === "object" && "id" in actual) {
    if (actual.id !== expected) problems.push(`${path}: expected id ${expected}`);
    return;
  }

  if (Array.isArray(expected)) {
    if (!Array.isArray(actual)) {
      if (expected.length > 0)
        problems.push(`${path}: expected array, got ${JSON.stringify(actual)}`);
      return;
    }
    if (expected.length !== actual.length) {
      problems.push(`${path}: expected ${expected.length} items, got ${actual.length}`);
      return;
    }
    expected.forEach((item, i) => compare(item, actual[i], `${path}[${i}]`, problems));
    return;
  }

  if (expected && typeof expected === "object") {
    if (!actual || typeof actual !== "object") {
      problems.push(`${path}: expected object, got ${JSON.stringify(actual)}`);
      return;
    }
    for (const [key, value] of Object.entries(expected)) {
      if (key === "id") continue;
      const actualValue: unknown = Reflect.get(actual, key);
      compare(value, actualValue, `${path}.${key}`, problems);
    }
    return;
  }

  if (expected !== actual) {
    problems.push(`${path}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}
