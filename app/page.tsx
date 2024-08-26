"use client";
import type { NextPage } from "next";
import { Layout } from "@components/Layout/Layout";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="mx-auto max-w-2xl py-32 sm:py-10 lg:py-32 dark">
        <div className="hidden sm:mb-8 sm:flex sm:justify-center">
          <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-white/10 hover:ring-white/20">
            Comprehensive word definitions and grammar rules for English
            learners.{" "}
            <Link href="/academy" className="font-semibold text-indigo-400">
              Read more <span aria-hidden="true">&rarr;</span>
            </Link>
          </div>
        </div>
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Unlock the power of language knowledge
          </h1>
          <p className="mt-6 text-lg leading-8">
            Explore a vast collection of word meanings and grammar rules to
            enhance your language skills. Our comprehensive dictionary provides
            detailed explanations and examples to help you master English.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/words"
              className="rounded-md bg-indigo-400 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-indigo-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-400"
            >
              Get started
            </Link>
            <Link
              href="/words"
              className="text-sm font-semibold leading-6 text-gray-300"
            >
              Learn more <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
