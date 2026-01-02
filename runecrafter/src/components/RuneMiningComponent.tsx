import { useContext, useEffect, useRef, useState } from "react";
import { GameStateContext } from "../context/GameStateContext";



export default function RuneMining() {

    const gameStateCtx = useContext(GameStateContext);
    if (!gameStateCtx) return;

    const [maxBarWidth, setMaxBarWidth] = useState<number | undefined>(undefined)
    const progressBar = useRef<HTMLDivElement | null>(null);


    const miningLevel = gameStateCtx.miningLevelState[0]
    const miningProgress = gameStateCtx.miningProgress[0]
    const essenceCount = gameStateCtx.essenceCount[0]

    useEffect(() => {
        if (!progressBar.current) return;
        if (!maxBarWidth) return;
        const newWidth = maxBarWidth * (miningProgress / 100);
        progressBar.current.style.width = newWidth + 'px';
    }, [])
    useEffect(() => {
        const interval = setInterval(() => {
            if (!progressBar.current) return;
            if (!maxBarWidth) return;
            const newWidth = maxBarWidth * (miningProgress / 100);
            progressBar.current.style.width = newWidth + 'px';
        }, 10)

        return () => clearInterval(interval)
    }, [miningProgress, miningLevel])

    return (
        <div className="h-5/6 w-full flex flex-col justify-evenly">
            <h1 className="text-center text-5xl">Mining Level: {miningLevel}</h1>
            <div className="h-100 w-100 bg-gray-300 inset-shadow-sm inset-shadow-gray-500 rounded-full text-2xl px-10 place-self-center text-center flex flex-col justify-evenly">Essence: {essenceCount}
                <div className="h-1/4 w-3/4 bg-white inset-shadow-sm inset-shadow-black rounded-2xl place-self-center"
                    ref={el => setMaxBarWidth(el?.getBoundingClientRect().width)}>
                    <div className="h-full w-0 bg-green-400 rounded-2xl shadow-sm shadow-black transition-[width] duration-100"
                        ref={progressBar => {
                            if (!progressBar) return;
                            if (!maxBarWidth) return;
                            const newWidth = maxBarWidth * (miningProgress / 100);
                            progressBar.style.width = newWidth + 'px';
                        }}>

                    </div>

                </div>
            </div>
        </div>
    )
}