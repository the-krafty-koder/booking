const buildQueryString = (
  url: string,
  searchParams: Record<string, unknown>
) => {
  const apiUrl = new URL(url);
  Object.entries(searchParams).map(([key, value]) =>
    apiUrl.searchParams.append(key, String(value))
  );

  return apiUrl;
};

export default buildQueryString;
