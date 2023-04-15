import { localStorageCache, sessionStorageCache } from "@/utils/cache";
import { Anchor } from "antd";
import { CanceledError } from "axios";
import { useRef } from "react";
import { useMemo } from "react";
import { useEffect, useState } from "react";

const _cache = {
  localStorage: localStorageCache,
  sessionStorage: sessionStorageCache,
};

const _asyncFunction = {};

export const useQuery = ({
  queryFn,
  queryKey,
  dependencyList = [],
  enabled = true,
  cacheTime,
  keepPreviousData = false,
  storeDriver = "localStorage",
} = {}) => {
  const dataRef = useRef({});

  const cache = _cache[storeDriver];
  const refetchRef = useRef();

  const [data, setData] = useState();
  const [loading, setLoading] = useState(enabled);
  const [error, setError] = useState();
  const [status, setStatus] = useState("idle");

  const cacheName = Array.isArray(queryKey) ? queryKey[0] : queryKey;
  const controllerRef = useRef(new AbortController());
  // useEffect(() => {
  //   if (typeof refetchRef.current === "boolean") {
  //     refetchRef.current = true;
  //   }
  // }, dependencyList);
  useEffect(() => {
    return () => {
      controllerRef.current.abort();
    };
  }, []);

  useEffect(() => {
    if (enabled) {
      fetchData();
    }
  }, [enabled].concat(queryKey));

  const getDataOrPreviousData = () => {
    if (cacheName) {
      if (keepPreviousData && dataRef.current[cacheName]) {
        return dataRef.current[cacheName];
      }
      if (_asyncFunction[cacheName]) {
        return _asyncFunction[cacheName];
      }
      return cache.get(queryKey);
    }
  };

  const setDataOrPreviousData = (data) => {
    if (keepPreviousData) {
      dataRef.current[cacheName] = data;
    }
    if (cacheName && cacheTime) {
      let expired = cacheTime;
      if (cacheTime) {
        expired += Date.now();
      }
      cache.set(cacheName, data, expired);
    }
  };
  const fetchData = async () => {
    controllerRef.current.abort();
    controllerRef.current = new AbortController();
    try {
      setLoading(true);
      setStatus("pending");

      let res = getDataOrPreviousData();
      // Kiểm tra cache xem có dữ liệu hay không
      if (!res) {
        res = queryFn({ signal: controllerRef.current.signal });
        if (cacheName) {
          _asyncFunction[cacheName] = res;
        }
      }
      if (res instanceof Promise) {
        res = await res;
      }
      if (res) setStatus("success");
      setData(res);
      setDataOrPreviousData(res);
      // update lại thời gian expired trong trường hợp cache đã tồn tại

      refetchRef.current = false;
      setLoading(false);
    } catch (err) {
      if (err instanceof CanceledError) {
      } else {
        setError(err);
        setStatus("error");
        setLoading(false);
      }
    }
  };
  return {
    loading,
    error,
    data,
    status,
    refetch: fetchData,
  };
};

const promise = new Promise((res, rej) => {
  setTimeout(() => res(100), 1000);
});
