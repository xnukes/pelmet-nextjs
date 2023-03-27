import { DateFormat, Layout } from '../components'
import { motion } from "framer-motion";
import { CogIcon } from "@heroicons/react/24/outline";

export default function Home() {
    return (
        <Layout title={'Nástěnka'}>
            <section className="text-center my-10 max-sm:my-2">
                <p className="font-bold text-xl py-4 sm:py-2">
                    Vítej poutníku na křemikovém rozcestníku !
                </p>
                <p className="text-sm font-normal">
                    Toto je prezentační aplikace vytvořená na frameworku <span className="text-cyan-900 font-extrabold underline underline-offset-0">Next.js</span> a
                    dalších populárních knihoven TailwindCSS, TailwindUI, React-Query, Framer-Motion a dalších.
                </p>
                <figcaption className="font-medium text-right my-10 mx-20">
                    <motion.div
                        className="home-icon-box p-0 m-0 float-right opacity-10"
                        animate={{
                            rotate: [ 0, 360 ],
                        }}
                        transition={{
                            duration: 4,
                            ease: "linear",
                            repeat: Infinity,
                            repeatDelay: 0
                        }}
                        children={<CogIcon className="text-gray-800" />}
                    />
                    <div className="flex-row">
                        <div className="text-sky-500 font-extrabold">
                            Lukáš Vlček
                        </div>
                        <div className="text-slate-700 font-thin text-sm">
                            fullstack developer
                        </div>
                    </div>
                </figcaption>
            </section>
        </Layout>
    )
}
