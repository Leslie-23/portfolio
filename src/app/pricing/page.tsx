import type { Metadata } from "next";
import Ask from "@/components/Ask";
import Slide, { H } from "@/components/Slide";
import PriceConfigurator from "@/components/PriceConfigurator";
import PricingExtras from "@/components/PricingExtras";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Pick what you're building and see an indicative price range and timeline, in Ghana cedis.",
};

export default function PricingPage() {
  return (
    <>
      <Slide label="Pricing">
        <div className="mt-7 grid gap-5 md:mt-10 md:gap-8 lg:grid-cols-[1fr_380px] lg:items-end">
          <H as="h1" className="t-hero">Price it your way</H>
          <p className="t-lead">Choose what you need and the estimate builds as you go. Starting prices and timelines are for a small build; every number below moves with what you pick. A range, not a quote.</p>
        </div>
        <PriceConfigurator />
        <PricingExtras />
      </Slide>
      <Ask />
    </>
  );
}
