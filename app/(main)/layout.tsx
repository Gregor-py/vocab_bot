import {CreateSetButton} from "@/components/create-set-button";
import {UserButton} from "@clerk/nextjs";

type Props = {
    children: React.ReactNode;
}

const MainLayout = ({children}: Props) => {

    return (
        <div className={"flex h-full"}>
            <div className={"w-[256px] border-r-white/60 border-r"}>
                <div>Vocab bot</div>
                <CreateSetButton />
                <UserButton />
            </div>
            <main className={"flex-1"}>
                <div className={"max-w-[1120px] mx-auto"}>{children}</div>
            </main>
        </div>
    )
}

export default MainLayout;