"use client";

import { useState } from "react";
import Image from "next/image";
import ProductForm from "./product-form";
import { updateProduct, deleteProduct } from "@/app/dashboard/actions";

type Row = {
  id: string;
  name: string;
  price: number;
  originalPrice: number | null;
  imagePath: string;
  tag: "New" | "Bestseller" | "Sale" | null;
};

export default function ProductRow({ tenantId, product }: { tenantId: string; product: Row }) {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="rounded-2xl border border-gold/15 bg-surface p-4">
        <ProductForm
          tenantId={tenantId}
          product={product}
          action={updateProduct.bind(null, product.id)}
          onDone={() => setEditing(false)}
        />
        <button
          type="button"
          onClick={() => setEditing(false)}
          className="mt-2 text-xs text-foreground/50 underline"
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-gold/15 bg-surface p-3">
      <Image
        src={product.imagePath}
        alt={product.name}
        width={56}
        height={56}
        className="h-14 w-14 shrink-0 rounded-lg object-cover"
      />
      <div className="flex-1">
        <p className="text-sm font-medium text-foreground">{product.name}</p>
        <p className="text-xs text-foreground/50">
          ₪{product.price}
          {product.tag ? ` · ${product.tag}` : ""}
        </p>
      </div>
      <button
        type="button"
        onClick={() => setEditing(true)}
        className="rounded-full border border-gold/20 px-3 py-1.5 text-xs text-foreground/80"
      >
        Edit
      </button>
      <form action={deleteProduct.bind(null, product.id)}>
        <button
          type="submit"
          className="rounded-full border border-red-400/40 px-3 py-1.5 text-xs text-red-500"
        >
          Delete
        </button>
      </form>
    </div>
  );
}
