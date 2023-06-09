import React from "react";
import { Header } from "./header";
import Head from "next/head";

export const Layout = ({ children, title }: { children: React.ReactNode, title? : string }) => (
    <>
        <Head>
            <title>{title}</title>
        </Head>

        <div className="min-h-full">
            <Header />

            <header className="bg-white shadow">
                <div className="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">{title}</h1>
                </div>
            </header>

            <main>
                <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                    {children}
                </div>
            </main>
        </div>
    </>
);
