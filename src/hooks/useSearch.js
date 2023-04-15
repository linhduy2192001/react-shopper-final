import { useSearchParams } from "react-router-dom";
import queryString from "query-string";
export const useSearch = ({ defaultValue }) => {
  const [search, setSearch] = useSearchParams();
  const value = { ...defaultValue };
  for (let [key, val] of search) {
    try {
      value[key] = JSON.parse(val || defaultValue);
    } catch (err) {
      value[key] = val || defaultValue;
    }
  }
  const setValue = (valueObj) => {
    const qs = queryString.stringify({ ...value, ...valueObj });
    setSearch(qs);
  };
  return [value, setValue];
};
