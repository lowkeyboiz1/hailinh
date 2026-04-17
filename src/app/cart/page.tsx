import { CartContent } from "./CartContent";
import { Metadata } from "next";

/**
 * Rendering Strategy: CSR (Client Side Rendering) for dynamic cart state.
 * Wrapped in Server Component for SEO and layout.
 */

export const metadata: Metadata = {
  title: "Giỏ hàng của bạn",
  description: "Quản lý sản phẩm trong giỏ hàng và tiến hành thanh toán tại Hải Linh.",
};

export default function CartPage() {
  return <CartContent />;
}
