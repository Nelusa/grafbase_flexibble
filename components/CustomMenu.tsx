import React from "react";

import { Menu } from "@headlessui/react";
import Image from "next/image";

interface CustomMenuProps {
  title: string;
  state: string;
  filters: Array<string>;
  setState: (value: string) => void;
}

const CustomMenu = ({ title, state, filters, setState }: CustomMenuProps) => {
  return (
    <div className="flexStart flex-col w-full gap-7 relative">
      <label htmlFor={title} className="w-full text-gray-100">
        {title}
      </label>

      <Menu as="div" className="self-start relative">
        <div>
          <Menu.Button
            id="menu-button-id"
            className="flexCenter custom_menu-btn"
          >
            {state || "Category"}
            <Image
              src="/arrow-down.svg"
              alt="Arrow Down"
              width={10}
              height={5}
            />
          </Menu.Button>
        </div>

        <Menu.Items className="flexStart custom_menu-items">
          {filters.map((tag) => {
            return (
              <Menu.Item key={tag}>
                <button
                  type="button"
                  value={tag}
                  onClick={(e) => setState(e.currentTarget.value)}
                  className="custom_menu-item"
                >
                  {tag}
                </button>
              </Menu.Item>
            );
          })}
        </Menu.Items>
      </Menu>
    </div>
  );
};

export default CustomMenu;
