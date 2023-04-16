import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";
import { useSearchParams } from "next/navigation";
import { PropertyCategory } from "types";

export const getCategoriesFromUrl = (
  searchParams: ReturnType<typeof useSearchParams>,
  categories: PropertyCategory[]
) => {
  const categoriesFromUrl = searchParams.get("category");
  let selectedCategoriesFromUrl: PropertyCategory[] = [];
  if (categoriesFromUrl) {
    const categoryArr = categoriesFromUrl?.split("+");
    selectedCategoriesFromUrl = categories.filter((cat) =>
      categoryArr.find((name) => name === cat?.slug?.current)
    );
    if (categoriesFromUrl.length > 0) return selectedCategoriesFromUrl;
  }
  return [];
};

export const setFilterParams = (
  key: string,
  value: string | string[] | number[] | undefined,
  queryParams: URLSearchParams
) => {
  if (
    queryParams.get(key) === value ||
    (Array.isArray(value) && queryParams.get(key) === value.join("+").trim())
  ) {
    return;
  }
  if (!value || value === "" || value.length <= 0) {
    queryParams.delete(key);
    queryParams.delete(key);
  } else if (
    queryParams
      .get(key)
      ?.split("+")
      ?.find(
        (item) =>
          item === (Array.isArray(value) ? value.join("+").trim() : value)
      )
  ) {
    const queryStringWithoutValue = queryParams
      .get(key)
      ?.replaceAll(Array.isArray(value) ? value.join("+").trim() : value, "")
      .replaceAll("++", "+");
    !queryStringWithoutValue
      ? queryParams.delete(key)
      : queryParams.set(key, queryStringWithoutValue);
  } else {
    queryParams.set(
      key,
      Array.isArray(value) ? value.join("+").trim() : value.toString()
    );
  }
};

export const deleteFilterParam = (
  key: string,
  router: AppRouterInstance,
  pathname: string | null,
  searchParams: ReturnType<typeof useSearchParams>
) => {
  if (typeof window === "undefined") return;
  const queryParams = new URLSearchParams(searchParams);

  queryParams.delete(key);
  router.push(pathname + "?" + queryParams.toString());
};
