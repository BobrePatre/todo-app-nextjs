import HomePage from "@/components/pages/main_page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gosha Todo App",
};

export default function Home() {
  return (
    <>
      <HomePage />
    </>
  );
}
