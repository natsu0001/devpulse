export function getAccountAge(
  createdAt: string
) {
  const created =
    new Date(createdAt);

  const now = new Date();

  let years =
    now.getFullYear() -
    created.getFullYear();

  let months =
    now.getMonth() -
    created.getMonth();

  if (
    months < 0 ||
    (months === 0 &&
      now.getDate() <
        created.getDate())
  ) {
    years--;
    months += 12;
  }

  return {
    years,
    months,
  };
}