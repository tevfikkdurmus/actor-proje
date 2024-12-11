"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import PaginationItem from "./PaginationItem";

export default function Search({
  pageCount,
  activePagee,
}: {
  pageCount: number;
  activePagee: number;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [activePage, setActivePage] = useState(activePagee);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());

    if (activePage != 1) {
      params.set("page", activePage);
    } else {
      params.delete("page");
    }

    const newQueryString = params.toString();
    const newPath = newQueryString ? `${pathname}?${newQueryString}` : pathname;
    router.push(newPath);
  }, [activePage, searchParams]);

  //   const handlePush = () => {
  //     setSearchedText(searchText);

  //     if (searchText != searchedText) {
  //       router.push(pathname + "?" + createQueryString("name", searchText));
  //     }
  //   };

  //   const clearSearchText = () => {
  //     setSearchText("");
  //     setSearchedText("");

  //     const params = new URLSearchParams(searchParams.toString());
  //     params.delete("name");
  //     const newQueryString = params.toString();
  //     router.push(newQueryString ? `${pathname}?${newQueryString}` : pathname);

  //     if (searchTextInput.current) {
  //       searchTextInput.current.focus();
  //     }
  //   };

  return (
    <div className="mt-2 flex flex-row gap-2">
      {Array.from({ length: pageCount }).map((_, index) => (
        <PaginationItem
          selected={activePage == index + 1}
          key={index + 1}
          number={index + 1}
          setActivePage={setActivePage}
        />
      ))}
    </div>
  );
}
