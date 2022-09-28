import React from "react";

type Props = {
  children?: JSX.Element;
  style?: string;
};

export default function Divider({ children, style }: Props) {
  if (children) {
    return (
      <div className={`flex flex-row w-full justify-center ${style}`}>
        <div className={`flex flex-1 border-b mt-4 w-1/2 h-0`}></div>
        <span className="mx-3">{children}</span>
        <div className={`flex flex-1 border-b mt-4 w-1/2 h-0`}></div>
      </div>
    );
  }
  return <div className={`flex flex-row border-b mt-4 w-full ${style}`}></div>;
}
