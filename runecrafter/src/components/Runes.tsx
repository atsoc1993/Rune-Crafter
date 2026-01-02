import { useContext, useEffect, useRef, useState } from "react";
import { GameStateContext, type RuneSupply } from "../context/GameStateContext";



export default function RuneMining() {

    const gameStateCtx = useContext(GameStateContext);
    if (!gameStateCtx) return;

    const [maxBarWidth, setMaxBarWidth] = useState<number | undefined>(undefined)
    const progressBar = useRef<HTMLDivElement | null>(null);

    const miningLevel = gameStateCtx.miningLevelState[0]

    const essenceCount = gameStateCtx.essenceCount


    useEffect(() => {
        if (!progressBar.current) return;
        if (!maxBarWidth) return;
        const newWidth = maxBarWidth * (gameStateCtx.miningProgress.current / 100);
        progressBar.current.style.width = newWidth + 'px';
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            if (!progressBar.current) return;
            if (!maxBarWidth) return;
            const newWidth = maxBarWidth * (gameStateCtx.miningProgress.current / 100);
            progressBar.current.style.width = newWidth + 'px';
        }, 100)

        return () => clearInterval(interval)
    }, [gameStateCtx.miningProgress.current, miningLevel, maxBarWidth, progressBar.current])

    const runesSupply = gameStateCtx.runeSupplyState

    const insetShadowColorMap: { [key: string]: string } = {
        'Air': 'inset-shadow-gray-500',
        'Mind': 'inset-shadow-amber-500',
        'Water': 'inset-shadow-blue-500',
        'Earth': 'inset-shadow-amber-900',
        'Fire': 'inset-shadow-red-500'
    }

    const craftRune = (rune: string) => {
        if (essenceCount[0] <= 0) return;
        let currentSupply: RuneSupply = runesSupply[0]
        currentSupply[rune] += 1
        runesSupply[1](currentSupply);
        essenceCount[1](prev => prev - 1)
    };

    return (
        <div className="h-5/6 w-full flex flex-col justify-evenly">
            <h1 className="text-center text-5xl">Mining Level: {miningLevel}</h1>
            <div className="h-75 w-75 bg-gray-300 inset-shadow-sm inset-shadow-black rounded-full text-2xl px-10 place-self-center text-center flex flex-col justify-evenly">Essence: {essenceCount[0]}
                <div className="h-1/4 w-3/4 bg-white inset-shadow-sm inset-shadow-black rounded-2xl place-self-center"
                    ref={el => setMaxBarWidth(el?.getBoundingClientRect().width)}>
                    <div className="h-full w-0 bg-green-400 rounded-2xl shadow-sm shadow-black transition-[width] duration-100"
                        ref={progressBar}>
                    </div>
                </div>
            </div>
            <div className='w-full flex justify-evenly flex-row text-center items-center '>
                {Object.entries(runesSupply[0]).map((rune) => (
                    <div className={'h-36 w-36 rounded-full content-center bg-white shadow-md shadow-teal-600 inset-shadow-sm text-3xl scale-100 relative transition-transform hover:scale-125 duration-300 ' + (insetShadowColorMap[rune[0]])}
                        onClick={() => craftRune(rune[0])}>
                        <p>{rune[0]}: {rune[1]}</p>
                        <div className="h-35 w-35 border-white border-2 hover:animate-ping rounded-full absolute left-0 top-0">
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}