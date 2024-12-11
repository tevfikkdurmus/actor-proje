"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchTextInput = useRef(null);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const [searchText, setSearchText] = useState("");

  const handlePush = () => {
    if (searchText == "") {
      router.push("/");
    } else {
      router.push(pathname + "?" + createQueryString("name", searchText));
    }
  };

  const clearSearchText = () => {
    setSearchText("");
    router.push("/");
    searchTextInput.current.focus();
  };

  return (
    <div className=" w-1/2 h-[50px] flex flex-row">
      <div className="border-2 w-[80%] h-[50px] relative">
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
      <button
        onClick={handlePush}
        className="bg-slate-600 w-[19%] h-full text-white ml-[1%]"
      >
        Ara
      </button>
    </div>
  );
}