import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <main>
            <h1 className={"text-5xl text-center font-bold pt-4"}>Vocab bot</h1>
            <div className={"text-center mt-5"}>Create flashcards using AI and save your time</div>
            <div className={"flex justify-center mt-6"}>
                <Link href={"/dashboard"}>
                    <Button>Get Started</Button>
                </Link>
            </div>
        </main>
    );
}
