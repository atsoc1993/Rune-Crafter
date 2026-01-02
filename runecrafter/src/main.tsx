import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { GameStateContext, type GameState, type RuneSupply } from './context/GameStateContext.tsx'
import { useRef, useState } from 'react';


export default function Main() {

    const runesSupply: RuneSupply = {
        Air: 0,
        Mind: 0,
        Water: 0,
        Earth: 0,
        Fire: 0,
    }
    
    const [runesSupplyState, setRuneSupplyState] = useState<RuneSupply>(runesSupply);
    const [miningLevel, setMiningLevel] = useState<number>(1);
    const miningProgress = useRef<number>(0)
    const [essenceCount, setEssenceCount] = useState<number>(0);


    const startingGameState: GameState = {
        miningLevelState: [miningLevel, setMiningLevel],
        miningProgress: miningProgress,
        essenceCount: [essenceCount, setEssenceCount],
        runeSupplyState: [runesSupplyState, setRuneSupplyState]
    };

    return (
        <GameStateContext.Provider value={startingGameState}>
            <App />
        </GameStateContext.Provider>)
}
createRoot(document.getElementById('root')!).render(
    <Main />
);

