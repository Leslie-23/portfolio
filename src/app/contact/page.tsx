import type { Metadata } from "next";
import Ask from "@/components/Ask";

export const metadata: Metadata = { title: "Contact", description: "Engineering roles, product collaborations and well-scoped builds. Email is the fastest way to reach Leslie." };

export default function Contact() {
  return <Ask />;
}
