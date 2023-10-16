"use client";

import React, { ChangeEventHandler, useEffect, useState } from "react";
import qs from "query-string";
import { LuSearch } from "react-icons/lu";
import { Input } from "@/shadcn-ui/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import useDebounce from "@/hooks/use-debounce";

const SearchInput = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");
  const name = searchParams.get("name");

  const [value, setValue] = useState(name || "");
  const debouncedValue = useDebounce<string>(value, 500);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };

  useEffect(() => {
    const query = {
      name: debouncedValue,
      categoryId: categoryId,
    };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      { skipEmptyString: true, skipNull: true }
    );

    router.push(url);
  }, [debouncedValue, categoryId, router]);

  return (
    <div className="relative ">
      <LuSearch className="ml-2 absolute h-4 w-4 top-2.5 text-muted-foreground" />
      <Input
        placeholder="Search..."
        onChange={onChange}
        value={value}
        className="pl-8 bg-primary/10"
      />
    </div>
  );
};

export default SearchInput;
