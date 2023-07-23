"use client";

import { useRouter } from "next/navigation";

import Button from "./Button";

interface PaginationProps {
  startCursor: string;
  endCursor: string;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

const Pagination = ({
  startCursor,
  endCursor,
  hasPreviousPage,
  hasNextPage,
}: PaginationProps) => {
  const router = useRouter();

  const handleNavigation = (type: string) => {
    const currentParams = new URLSearchParams(window.location.search); //this is the current url, we are getting the search params from it

    if (type === "prev" && hasPreviousPage) {
      currentParams.delete("endcursor");
      currentParams.set("startcursor", startCursor);
    } else if (type === "next" && hasNextPage) {
      currentParams.delete("startcursor");
      currentParams.set("endcursor", endCursor);
    }
    //here we check if the type is prev and if there is a previous page, if there is we delete the endcursor and set the startcursor to the startcursor we got from the props

    const newSearchParams = currentParams.toString();
    const newPathname = `${window.location.pathname}?${newSearchParams}`;

    router.push(newPathname);
  };

  return (
    <div className="w-full flexCenter gap-5 mt-10">
      {hasPreviousPage && (
        <Button
          title="First Page"
          handleClick={() => handleNavigation("prev")}
        />
      )}
      {hasNextPage && (
        <Button
          title="Next Shots"
          handleClick={() => handleNavigation("next")}
        />
      )}
    </div>
  );
};

export default Pagination;
