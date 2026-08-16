"use client";

import { useRef, useState, useTransition } from "react";
import { uploadProductImage } from "@/lib/image-upload";
import { useLanguage } from "@/app/lib/LanguageContext";
import { dashboardText } from "@/app/lib/i18n";

type ProductFormValues = {
  id?: string;
  name: string;
  price: number;
  originalPrice: number | null;
  imagePath: string;
  tag: "New" | "Bestseller" | "Sale" | null;
};

export default function ProductForm({
  tenantId,
  product,
  action,
  onDone,
}: {
  tenantId: string;
  product?: ProductFormValues;
  action: (formData: FormData) => Promise<void>;
  onDone?: () => void;
}) {
  const [imagePath, setImagePath] = useState(product?.imagePath ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);
  const { locale } = useLanguage();
  const t = dashboardText[locale];

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const url = await uploadProductImage(file, tenantId);
      setImagePath(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <form
      ref={formRef}
      action={(formData) => {
        startTransition(async () => {
          await action(formData);
          if (!product) {
            formRef.current?.reset();
            setImagePath("");
          }
          onDone?.();
        });
      }}
      className="flex flex-col gap-3"
    >
      <input type="hidden" name="imagePath" value={imagePath} />

      <label className="flex flex-col gap-1 text-sm text-foreground/80">
        {t.productNameLabel}
        <input
          name="name"
          defaultValue={product?.name}
          required
          className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-foreground/80">
        {t.priceLabel}
        <input
          name="price"
          type="number"
          step="0.01"
          min="0"
          defaultValue={product?.price}
          required
          dir="ltr"
          className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-foreground/80">
        {t.originalPriceLabel}
        <input
          name="originalPrice"
          type="number"
          step="0.01"
          min="0"
          defaultValue={product?.originalPrice ?? undefined}
          dir="ltr"
          className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-foreground/80">
        {t.tagLabel}
        <select
          name="tag"
          defaultValue={product?.tag ?? ""}
          className="rounded-lg border border-gold/20 bg-surface px-3 py-2 text-foreground"
        >
          <option value="">{t.tagNone}</option>
          <option value="New">New</option>
          <option value="Bestseller">Bestseller</option>
          <option value="Sale">Sale</option>
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-foreground/80">
        {t.photoLabel}
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </label>
      {uploading && <p className="text-xs text-foreground/50">{t.uploadingImage}</p>}
      {imagePath && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imagePath} alt={t.previewAlt} className="h-32 w-32 rounded-lg object-cover" />
      )}
      {error && <p className="text-xs text-red-500">{error}</p>}

      <button
        type="submit"
        disabled={uploading || isPending || !imagePath}
        className="rounded-full bg-gradient-to-r from-gold-bright to-gold px-4 py-2.5 text-sm font-semibold text-[#171009] disabled:opacity-50"
      >
        {isPending ? t.saving : product ? t.saveChanges : t.addProductButton}
      </button>
    </form>
  );
}
