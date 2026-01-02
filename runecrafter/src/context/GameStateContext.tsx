import { createContext, type SetStateAction } from "react";

export type RuneSupply = { [key: string]: number };

export type GameState = {
    miningLevelState: [number, React.Dispatch<SetStateAction<number>>]
    miningProgress:  React.RefObject<number>
    essenceCount: [number, React.Dispatch<SetStateAction<number>>]
    runeSupplyState: [RuneSupply, React.Dispatch<SetStateAction<RuneSupply>>]
};


export const GameStateContext = createContext<GameState | null>(null);