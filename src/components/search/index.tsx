"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import GenderSelection from "@/components/genderSelection";

export default function Search() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTextInput = useRef<HTMLInputElement | null>(null);
  const [searchText, setSearchText] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handlePush = () => {
    if (searchText == "") {
      const params = new URLSearchParams(searchParams.toString());
      const newQueryString = params.toString();
      router.push(newQueryString ? `${pathname}?${newQueryString}` : pathname);
    } else {
      router.push(pathname + "?" + createQueryString("name", searchText));
    }
  };

  const clearSearchText = () => {
    setSearchText("");

    const params = new URLSearchParams(searchParams.toString());
    params.delete("name");
    const newQueryString = params.toString();
    router.push(newQueryString ? `${pathname}?${newQueryString}` : pathname);

    if (searchTextInput.current) {
      searchTextInput.current.focus();
    }
  };

  return (
    <>
      <div className="border-2 sm:w-[80%] lg:w-[70%] w-[100%] h-[50px] relative">
        <input
          ref={searchTextInput}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Oyuncu ismi girin..."
          type="text"
          className="w-full h-full pl-2"
        />
        {searchText.length > 0 && (
          <div
            onClick={clearSearchText}
            className="absolute right-0 top-0 h-[50px] w-[30px] flex items-center justify-center cursor-pointer"
          >
            <Image
              src="/close.png"
              width={20}
              height={20}
              alt="Search close icon"
            />
          </div>
        )}
      </div>
      <div className="lg:w-[19%] sm:w-[30%] w-[100%] flex flex-row h-[50px] sm:mt-0 mt-2">
        <button
          onClick={handlePush}
          className="bg-slate-600 h-full text-white sm:ml-[1%] ml-0 w-[49%]"
        >
          Ara
        </button>
        <GenderSelection />
      </div>
    </>
  );
}
