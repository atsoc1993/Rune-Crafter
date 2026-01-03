import { useContext, useEffect, useRef } from "react"
import Frame from "./components/MainFrame"
import RuneMining from "./components/Runes"
import { GameStateContext } from "./context/GameStateContext"


export default function App() {

  const gameStateCtx = useContext(GameStateContext);
  if (!gameStateCtx) return;

  const [miningLevel, setMiningLevel] = gameStateCtx.miningLevelState

  const [essenceCount, setEssenceCount] = gameStateCtx.essenceCount

  const lockEssenceCount = useRef<boolean>(false);

  const tabs = [
    { name: 'Runes', forward: RuneMining() },
    { name: 'Combat', forward: undefined },
    { name: 'Spell Selection', forward: undefined },
    { name: 'Level', forward: undefined }
  ];

  useEffect(() => {
    const miningProgress = gameStateCtx.miningProgress.current
    if (lockEssenceCount.current === true && (miningProgress >= 0 && miningProgress < 100)) lockEssenceCount.current = false;
  }, [essenceCount, gameStateCtx.miningProgress.current])

  useEffect(() => {
    const interval = setInterval(() => {
      let newMiningProgress = gameStateCtx.miningProgress.current + miningLevel 
      if (newMiningProgress >= 100 && !lockEssenceCount.current) {
        lockEssenceCount.current = true;
        setEssenceCount(prev => prev + 1)
      };
      gameStateCtx.miningProgress.current = newMiningProgress > 100 ? newMiningProgress % 100 : newMiningProgress
    }, 100)

    return () => clearInterval(interval);
  }, [miningLevel, gameStateCtx.miningProgress]);

  return (
    <Frame tabs={tabs} />
  );
};