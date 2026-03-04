"use client";

import { toast } from "sonner";
import { useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import CTA from "@/components/cta";
import Form from "@/components/form";
import Logos from "@/components/logos";
import Particles from "@/components/ui/particles";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { EnhancedButton } from "@/components/ui/enhanced-btn";

export default function Home() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    if (!name || !email) {
      toast.error("Please fill in all fields 😠");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address 😠");
      return;
    }

    setLoading(true);

    const promise = new Promise<unknown>(async (resolve, reject) => {
      try {
        const baseResponse = await fetch("/api/base", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });

        if (!baseResponse.ok) {
          const msg =
            baseResponse.status === 400
              ? "Base insertion failed"
              : "Something went wrong";
          reject(new Error(msg));
          return;
        }

        const data = await baseResponse.json().catch(() => ({}));
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });

    toast.promise(promise, {
      loading: "Getting you on the waitlist... 🚀",
      success: (data) => {
        console.log("Data inserted into waitlist", data);
        setName("");
        setEmail("");
        return "Thank you for joining the waitlist 🎉";
      },
      error: (error) => {
        console.error("Error inserting into waitlist", error);
        const message = error instanceof Error ? error.message : String(error);
        if (message === "Base insertion failed") {
          return "Failed to save your details. Please try again 😢.";
        }
        return "An error occurred. Please try again 😢.";
      },
    });

    promise.finally(() => {
      console.log("Promise finally");
      setLoading(false);
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center overflow-x-clip pt-12 md:pt-24">
      <section className="flex flex-col items-center px-4 sm:px-6 lg:px-8">
        <Header />

        <CTA />

        <EnhancedButton
          variant="expandIcon"
          Icon={FaArrowRightLong}
          iconPlacement="right"
          className="mt-6"
          onClick={() => setIsModalOpen(true)}>
          Join waitlist
        </EnhancedButton>

        <Logos />
      </section>

      {/* <Footer /> */}

      <Particles
        quantityDesktop={350}
        quantityMobile={100}
        ease={80}
        color={"#F7FF9B"}
        refresh
      />

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setIsModalOpen(false)}>
          <div
            className="relative w-full max-w-md rounded-xl border border-zinc-800 bg-[#050509] p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              aria-label="Close join waitlist modal"
              className="absolute right-3 top-3 rounded-md p-1 text-zinc-400 transition hover:bg-zinc-800/70 hover:text-zinc-50"
              onClick={() => setIsModalOpen(false)}>
              ×
            </button>

            <Form
              name={name}
              email={email}
              handleNameChange={handleNameChange}
              handleEmailChange={handleEmailChange}
              handleSubmit={handleSubmit}
              loading={loading}
            />
          </div>
        </div>
      )}
    </main>
  );
}
