import { useState, useEffect } from 'react'

import { NPCs } from './Backend'

import './App.css'

const EMPTY_BATTLE = { npcs: [], exchange: 1 }

const MODES = { SEARCH: "search", BATTLE: "battle" }

const ICONS = {
  minor: "",
  major: "",
  master: "",
  group: "",
  NEXT: "",
  RESET: ""
}

function App() {
  const [mode, setMode] = useState(MODES.SEARCH)
  const [battle, setBattle] = useState({ ...EMPTY_BATTLE })
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    (async () => {
      setResults(await NPCs.filter(search))
    })()
  }, [search, setResults])

  const generateNPC = template => ({
    ...template,
    ...(NPCs.tier_templates[template.tier]),
    conditions: Object.fromEntries(template.conditions.map(condition => [condition, false]))
  })

  const reset = () => {
    setBattle({ ...EMPTY_BATTLE })
  }

  const start = () => {
    setMode(MODES.BATTLE)    
  }

  const select = (npc, approach) => {
    npc.selectedApproach = (npc.selectedApproach === approach) ? undefined : approach
    setBattle(prev => ({ ...prev }))
  }

  const ready = () => battle.npcs.every(npc => npc.selectedApproach)

  const next = () => {
    battle.npcs.forEach(npc => { npc.selectedApproach = undefined })
    setBattle(prev => ({ ...prev, exchange: prev.exchange + 1 }))
  }

  return <div className={`main ${mode}`}>
    <div className='search'>
      <div className='search-line'>
        <input name="search" value={search} onChange={e => setSearch(e.target.value)} />
      </div>
      <div className='search-results'>
        {results.map(npc => <div className='search-result' onMouseUp={() => setBattle(prev => ({ ...prev, npcs: [...prev.npcs, generateNPC(npc)] }))}>
          <div className='title'>{npc.title}</div>
          <div className='tier'>{ICONS[npc.tier]} {npc.tier}</div>
          <div className='description'>{npc.description}</div>
          <div className='drive'>{npc.drive}</div>
          {npc.principle ? <div className='principle'>{npc.principle}</div> : ''}
          <div className='techniques'>{npc.techniques.join(',')}</div>
          <div className='techniques'>{npc.conditions.join(',')}</div>
        </div>)}
      </div>
    </div>
    <div className={`battle ${ready() ? 'ready' : ''}`}>
      <div className='npcs'>
        {battle.npcs.map(npc => <div className='npc'>
          <div className='title'>{npc.title}</div>
          <div className='tier'>{ICONS[npc.tier]} {npc.tier}</div>
          <div className='description'>{npc.description}</div>
          <div className='drive'>{npc.drive}</div>
          {npc.principle ? <div className='principle'>{npc.principle}</div> : ''}
          <div className='techniques'>{npc.techniques.join(',')}</div>
          <div className='approaches'>
            {['Defend & Maneuver', 'Advance & Attack' , 'Evade & Observe'].map(approach => <div className={`approach ${approach} ${npc.selectedApproach === approach ? 'selected' : ''}`} onClick={() => select(npc, approach)}>
              {approach}
            </div>)}
          </div>
        </div>)}
      </div>
      <div className='actions'>
        <div className='exchange-number'>Exchange #{battle.exchange}</div>
        <div className='reset' onClick={next}>{ICONS.NEXT} next</div>
        <div className='reset' onClick={reset}>{ICONS.RESET} reset</div>
      </div>
    </div>
  </div>
}

export default App
