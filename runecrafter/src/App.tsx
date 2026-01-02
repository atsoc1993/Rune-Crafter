import { useContext, useEffect } from "react"
import Frame from "./components/MainFrame"
import RuneMining from "./components/RuneMiningComponent"
import Runes from "./components/RunesComponent"
import { GameStateContext } from "./context/GameStateContext"


export default function App() {

  const gameStateCtx = useContext(GameStateContext);
  if (!gameStateCtx) return;

  const [miningLevel, setMiningLevel] = gameStateCtx.miningLevelState
  const [miningProgress, setMiningProgress] = gameStateCtx.miningProgress
  const setEssenceCount = gameStateCtx.essenceCount[1]


  const tabs = [
    { name: 'Runes', forward: Runes() },
    { name: 'Rune Mining', forward: RuneMining() },
    { name: 'Rune Crafting', forward: undefined },
    { name: 'Combat', forward: undefined },
    { name: 'Spell Selection', forward: undefined },
    { name: 'Level', forward: undefined }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      let newMiningProgress = miningProgress + miningLevel 
      if (newMiningProgress >= 100) setEssenceCount(prev => prev + 1);
      setMiningProgress(newMiningProgress > 100 ? newMiningProgress % 100 : newMiningProgress);
    }, 100)

    return () => clearInterval(interval);
  }, [miningLevel, miningProgress]);

  return (
    <Frame tabs={tabs} />
  );
};