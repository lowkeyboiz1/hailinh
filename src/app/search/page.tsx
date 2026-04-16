import { Suspense } from "react";
import { PRODUCTS } from "@/features/product/data/products";
import { ProductCard } from "@/features/product/components/ProductCard";
import { MAX_WIDTH } from "@/shared/constants/ui";
import { cn } from "@/lib/utils";
import { SearchResultsContent } from "./components/SearchResultsContent";

export const metadata = {
  title: "Kết quả tìm kiếm",
  description: "Tìm kiếm sản phẩm tại Hải Linh",
};

export default function SearchPage() {
  return (
    <div className={cn("mx-auto px-6 py-12", MAX_WIDTH.CONTAINER)}>
      <Suspense fallback={<div>Đang tìm kiếm...</div>}>
        <SearchResultsContent />
      </Suspense>
    </div>
  );
}
