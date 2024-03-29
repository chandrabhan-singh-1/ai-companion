"use client";

import { cn } from "@/lib/utils";
import { Category } from "@prisma/client";
import { useRouter, useSearchParams } from "next/navigation";
import qs from "query-string";

interface CategoriesProps {
  data: Category[];
}

export default function Categories({ data }: CategoriesProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const categoryId = searchParams.get("categoryId");

  const onClick = (id: string | null) => {
    const query = { categoryId: id };

    const url = qs.stringifyUrl(
      {
        url: window.location.href,
        query: query,
      },
      { skipNull: true }
    );

    router.push(url);
  };

  return (
    <div className="w-full overflow-auto space-x-2 flex p-1">
      <button
        onClick={() => onClick(null)}
        className={cn(
          `flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition
  `,
          !categoryId && "bg-primary/40 font-bold"
        )}
      >
        Newest
      </button>
      {data.map((item) => (
        <button
          key={item.id}
          onClick={() => onClick(item.id)}
          className={cn(
            `flex items-center text-center text-xs md:text-sm px-2 md:px-4 py-2 md:py-3 rounded-md bg-primary/10 hover:opacity-75 transition
    `,
            item.id === categoryId && "bg-primary/40 font-bold"
          )}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}
