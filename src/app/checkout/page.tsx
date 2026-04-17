import { CheckoutContent } from "./CheckoutContent";
import { Metadata } from "next";

/**
 * Rendering Strategy: CSR (Client Side Rendering) for dynamic checkout state.
 */

export const metadata: Metadata = {
  title: "Thanh toán",
  description: "Hoàn tất đơn hàng và lựa chọn phương thức thanh toán tại Hải Linh.",
};

export default function CheckoutPage() {
  return <CheckoutContent />;
}
