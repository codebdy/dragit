import useSWR from "swr";

export default function useMe() {
  const { data, mutate, error } = useSWR("/api/me");

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate
  };
}
