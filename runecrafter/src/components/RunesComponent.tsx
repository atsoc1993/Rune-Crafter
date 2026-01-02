import { useContext } from "react"
import { GameStateContext } from "../context/GameStateContext"

const insetShadowColorMap: { [key: string]: string } = {
    'Air': 'inset-shadow-gray-500',
    'Mind': 'inset-shadow-amber-500',
    'Water': 'inset-shadow-blue-500',
    'Earth': 'inset-shadow-amber-900',
    'Fire': 'inset-shadow-red-500'
}

export default function Runes() {

    const gameStateCtx = useContext(GameStateContext);
    if (!gameStateCtx) return;

    const runesSupply = gameStateCtx.runeSupplyState[0]

    return (
        <div className='h-5/6 w-full p-6 flex justify-evenly flex-row text-center items-center '>
            {Object.entries(runesSupply).map((rune) => (
                <div className={'h-50 w-50 rounded-full content-center bg-white shadow-md shadow-teal-600 inset-shadow-sm text-3xl ' + (insetShadowColorMap[rune[0]])}>
                    <p>{rune[0]}: {rune[1]}</p>
                </div>
            ))}
        </div>
    )
}