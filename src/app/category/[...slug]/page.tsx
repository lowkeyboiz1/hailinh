import { CategoryContent } from "./CategoryContent";
import { CATEGORIES } from "@/modules/category/data/categories";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string[] }> }): Promise<Metadata> {
  const { slug } = await params;
  const mainSlug = slug[0];
  const subSlug = slug[1];
  
  const category = CATEGORIES.find(c => c.slug === mainSlug);
  const subcategory = category?.subcategories?.find(s => s.slug === subSlug);
  
  if (!category) return { title: "Không tìm thấy danh mục" };
  
  const title = subcategory ? subcategory.name : category.name;
  const description = category.description;
  
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];
  
  CATEGORIES.forEach((category) => {
    // Main category
    params.push({ slug: [category.slug] });
    
    // Subcategories
    category.subcategories?.forEach((sub) => {
      params.push({ slug: [category.slug, sub.slug] });
    });
  });
  
  return params;
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  
  return <CategoryContent slug={slug} />;
}
