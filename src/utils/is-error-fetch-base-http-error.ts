import { type FetchBaseHttpError } from "src/types";

export function isErrorFetchBaseHttpError(
  error: unknown,
): error is FetchBaseHttpError {
  return (
    typeof error === "object" &&
    error !== null &&
    "status" in error &&
    typeof error.status === "number"
  );
}
