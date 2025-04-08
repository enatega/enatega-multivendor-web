export function toSlug(input: string): string {
  return input
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, "-"); // Replace spaces with hyphens
}
