import { signOut } from "next-auth/react";
import Image from "next/image";
import React, { MouseEventHandler } from "react";

interface ButtonProps {
  title: string;
  type?: "button" | "submit";
  leftIcon?: string | null;
  rightIcon?: string | null;
  handleClick?: MouseEventHandler;
  isSubmitting?: boolean;
  bgColor?: string;
  textColor?: string;
}

const Button = ({
  title,
  type,
  leftIcon,
  rightIcon,
  handleClick,
  isSubmitting,
  bgColor,
  textColor,
}: ButtonProps) => {
  return (
    <button
      type={type || "button"}
      className={`flexCenter gap-3 px-4 py-3 
       ${textColor ? textColor : "text-white"} 
      ${
        isSubmitting ? "bg-black/50" : bgColor ? bgColor : "bg-primary-purple"
      } rounded-xl text-sm font-medium max-md:w-full`}
      disabled={isSubmitting}
      onClick={handleClick}
    >
      {leftIcon && (
        <Image src={leftIcon} alt="Left icon" width={14} height={14} />
      )}

      {title}

      {rightIcon && (
        <Image src={rightIcon} alt="Right icon" width={14} height={14} />
      )}
    </button>
  );
};

export default Button;
