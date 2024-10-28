import type { MetaFunction } from "@remix-run/node";
import Hero from "~/components/Hero";

export const meta: MetaFunction = () => {
  return [
    { title: "WordSmith" },
    { name: "description", content: "Welcome to WordSmith!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Hero />
    </div>
  );
}

