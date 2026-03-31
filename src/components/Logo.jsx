"use client";

export default function Logo({ height = "h-12", onClick }) {
  return (
    <img
      src="/logo-tienda.svg"
      alt="Tienda Macro"
      onClick={onClick}
      className={`${height} cursor-pointer select-none`}
      style={{ width: "auto" }}
    />
  );
}
