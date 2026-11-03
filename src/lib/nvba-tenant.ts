export const NVBA_TENANT_SLUGS = new Set([
  "noochie-varner-baseball-academy",
  "noochie-varner-baseball-softball-academy-2",
  "noochie-varner",
  "nvba",
  "noochievarner",
]);

export function isNvbaTenantRecord(
  record: { slug?: string | null; display_name?: string | null; name?: string | null } | null | undefined,
) {
  if (!record) return false;
  const names = [record.display_name, record.name].map((value) => value?.trim().toLowerCase() ?? "");
  return (
    names.some((value) =>
      value.includes("noochie varner") ||
      ["noochie varner baseball academy", "noochie varner baseball academy (nvba)", "nvba"].includes(value),
    ) || NVBA_TENANT_SLUGS.has(record.slug?.trim().toLowerCase() ?? "")
  );
}
