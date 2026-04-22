import { useState, useEffect } from 'react'

import { NPCs } from './Backend'

import './App.css'
import backgroundImage from './assets/background.png'

const EMPTY_BATTLE = { npcs: [], exchange: 1 }

const MODES = { SEARCH: "search", BATTLE: "battle" }

const ICONS = {
  minor: "",
  major: "",
  master: "",
  group: "",
  START: "",
  NEXT: "",
  ADD: "",
  END: ""
}

function App() {
  const [mode, setMode] = useState(MODES.SEARCH)
  const [battle, setBattle] = useState({ ...EMPTY_BATTLE })
  const [search, setSearch] = useState("")
  const [results, setResults] = useState([])

  useEffect(() => {
    (async () => {
      setResults(await NPCs.filter(""))
    })()
  }, [setResults])

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
    setSearch("")    
  }

  const select = (npc, approach) => {
    return update(() => {
      npc.selectedApproach = (npc.selectedApproach === approach) ? undefined : approach
    })
  }

  const update = (callback) => {
    callback()
    setBattle(prev => ({ ...prev }))
  }

  const ready = () => battle.npcs.every(npc => npc.selectedApproach)

  const next = () => {
    battle.npcs.forEach(npc => { npc.selectedApproach = undefined })
    setBattle(prev => ({ ...prev, exchange: prev.exchange + 1 }))
  }

  const end = () => {
    reset()
    setMode(MODES.SEARCH)
  }

  return <div className={`main ${mode}`} style={{ backgroundImage: `url(${backgroundImage})` }}>
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
          <div className='techniques'>{npc.conditions.join(', ')}</div>
        </div>)}
      </div>
      <div className='actions'>
        <div className='start button' onClick={start}>{ICONS.START} start</div>
      </div>
    </div>
    <div className={`battle ${ready() ? 'ready' : ''}`}>
      <div className='npcs'>
        {battle.npcs.map(npc => <div className='npc'>
          <div className='title'>{npc.title}</div>
          <div className='tier'>{ICONS[npc.tier]} {npc.tier}</div>
          <div className='description'>{npc.description}</div>
          <div className='drive'>{npc.drive}</div>
          <div className='principle'>{npc.principle ? npc.principle : ''}</div>
          <div className='balance'>
            <div style={{ flexGrow: 1 }} />
            <input type="range" min="0" max={npc.maxBalance} value={npc.balance} onChange={e => update(() => { npc.balance = e.target.value })} />
            {npc.balance}
          </div>
          <div className='conditions'>
            {Object.keys(npc.conditions).map(condition => <div className={`condition ${npc.conditions[condition] ? 'selected' : ''}`} onClick={() => update(() => { npc.conditions[condition] = !npc.conditions[condition] })}>{condition}</div>)}
          </div>
          <div className='fatigue'>
            <div style={{ flexGrow: 1 }} />
            <input type="range" min="0" max={npc.maxFatigue} value={npc.fatigue} onChange={e => update(() => { npc.fatigue = e.target.value })} />
            {npc.fatigue}
          </div>
          {npc.techniques.length > 0 ? <div className='techniques'>{npc.techniques.join(', ')}</div> : ''}
          <div className='approaches'>
            {['Defend & Maneuver', 'Advance & Attack' , 'Evade & Observe'].map(approach => <div className={`approach button ${approach} ${npc.selectedApproach === approach ? 'selected' : ''}`} onClick={() => select(npc, approach)}>
              {approach}
            </div>)}
          </div>
        </div>)}
      </div>
      <div className='actions'>
        <div className='exchange-number'>Exchange #{battle.exchange}</div>
        <div style={{ flexGrow: 1 }} />
        <div className='next button' onClick={next}>{ICONS.NEXT}next exchange</div>
        <div className='add button' onClick={() => setMode(MODES.SEARCH)}>{ICONS.ADD}add doug</div>
        <div className='end button' onClick={end}>{ICONS.END} end battle</div>
      </div>
    </div>
  </div>
}

export default App
