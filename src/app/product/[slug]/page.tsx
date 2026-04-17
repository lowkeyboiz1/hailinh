import { ProductDetailContent } from "@/modules/product/pages/ProductDetailContent";
import { PRODUCTS } from "@/modules/product/data/products";
import { CATEGORIES } from "@/modules/category/data/categories";
import { Metadata } from "next";

/**
 * Rendering Strategy: SSG with generateStaticParams
 */

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  
  if (!product) return { title: "Sản phẩm không tồn tại" };
  
  return {
    title: product.name,
    description: product.shortDescription,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      images: product.images.map(img => ({ url: img.url, alt: img.alt })),
    },
  };
}

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);
  
  if (!product) return <div>Product not found</div>;
  
  const category = CATEGORIES.find((c) => c.slug === product.categorySlug);
  const relatedProducts = PRODUCTS.filter(
    (p) => p.categorySlug === product.categorySlug && p.id !== product.id
  ).slice(0, 4);
  
  return (
    <ProductDetailContent 
      product={product} 
      category={category} 
      relatedProducts={relatedProducts} 
    />
  );
}
