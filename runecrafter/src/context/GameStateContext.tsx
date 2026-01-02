import { createContext, type SetStateAction } from "react";

export type RuneSupply = {
    Air: number
    Mind: number
    Water: number
    Earth: number
    Fire: number
};

export type GameState = {
    miningLevelState: [number, React.Dispatch<SetStateAction<number>>]
    miningProgress: [number, React.Dispatch<SetStateAction<number>>]
    essenceCount: [number, React.Dispatch<SetStateAction<number>>]
    runeSupplyState: [RuneSupply, React.Dispatch<SetStateAction<RuneSupply>>]
};


export const GameStateContext = createContext<GameState | null>(null);