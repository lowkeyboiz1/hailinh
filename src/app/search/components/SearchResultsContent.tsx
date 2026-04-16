"use client";

import { useSearchParams } from "next/navigation";
import { PRODUCTS } from "@/features/product/data/products";
import { ProductCard } from "@/features/product/components/ProductCard";
import { Search } from "lucide-react";

export function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const results = PRODUCTS.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.brand.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b pb-8">
        <div>
          <h1 className="text-3xl font-black flex items-center gap-3">
            <Search className="h-8 w-8 text-brand" />
            Tìm kiếm: <span className="text-brand">"{query}"</span>
          </h1>
          <p className="text-muted-foreground mt-2 font-medium">
            Tìm thấy {results.length} sản phẩm phù hợp
          </p>
        </div>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="py-24 text-center space-y-4">
          <div className="h-20 w-20 bg-muted rounded-full flex items-center justify-center mx-auto">
            <Search className="h-10 w-10 text-muted-foreground" />
          </div>
          <p className="text-xl font-bold">Rất tiếc, chúng tôi không tìm thấy kết quả phù hợp</p>
          <p className="text-muted-foreground">Hãy thử tìm kiếm với từ khóa khác</p>
        </div>
      )}
    </div>
  );
}
