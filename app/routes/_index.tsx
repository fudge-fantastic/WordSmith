import type { MetaFunction } from "@remix-run/node";
import AdsBanner from "~/components/AdsBanner";
import Hero from "~/components/Hero";

export const meta: MetaFunction = () => {
  return [
    { title: "WordSmith" },
    { name: "description", content: "Welcome to WordSmith!" },
  ];
};

export default function Index() {
  return (
    <div className="">
      <Hero />
      <AdsBanner />
    </div>
  );
}

