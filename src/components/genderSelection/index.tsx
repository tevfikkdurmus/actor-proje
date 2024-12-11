"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function GenderSelection() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [gender, setGender] = useState("");

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  const handleGender = (gender: string) => {
    setGender(gender);

    if (gender == "all") {
      const params = new URLSearchParams(searchParams.toString());
      params.delete("gender");
      const newQueryString = params.toString();
      router.push(newQueryString ? `${pathname}?${newQueryString}` : pathname);
    } else {
      router.push(pathname + "?" + createQueryString("gender", gender));
    }
  };

  return (
    <div className="w-[20%] bg-slate-600 flex items-center justify-center ml-1">
      <select
        onChange={(e) => handleGender(e.target.value)}
        name="gender"
        id="gender"
        className="h-[90%] w-[90%] bg-slate-600 text-white"
      >
        <option value="all">Hepsi</option>
        <option value="woman">Kadın</option>
        <option value="man">Erkek</option>
      </select>
    </div>
  );
}
