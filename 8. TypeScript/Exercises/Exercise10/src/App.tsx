import "./index.css"
import useNumberStorage from "./hooks/useNumberStorage"
import useSettingStorage, { type SettingStorage } from "./hooks/useSettingStorage"
import useLocalStorage from "./hooks/useLocalStorage"

function App() {
  // Use Number Storage
  const [score, setScore] = useNumberStorage('score',1988)
  // Use Setting Storage { }
  const [settings, setSettings] = useSettingStorage('settings', { language: 'italy', notification: true })
  // Use Local Storage (Generic)
  const [genericscore, setGenericScore] = useLocalStorage<number>('generic-score', 2086)
  const [genericsettings, setGenericSettings] = useLocalStorage<SettingStorage>('generic-settings', { language: 'france', notification: true })


  const handleSetScore = () => {
    setScore(2030)
  }

    const handleSetGenericScore = () => {
    setGenericScore(2011)
  }

  const handleSetSettings = () => {
    setSettings({ language: 'italy', notification: true })
  }

  const handleSetSettingsBack = () => {
    setSettings({ language: 'eng', notification: false })
  }

  const handlesetGenericSettings = () => {
    setGenericSettings({ language: 'china', notification: true })
  }

  const handlesetGenericSettingsBack = () => {
    setGenericSettings({ language: 'france', notification: false })
  }

  return (
    <div className="app">
      <section className="card">
        <h2 className="card-title">Score</h2>
        <div className="score-display">{score}</div>
        <button className="btn btn-primary" onClick={handleSetScore}>
          Set Score
        </button>
      </section>

      <section className="card">
        <h2 className="card-title">Generic Score</h2>
        <div className="score-display">{genericscore}</div>
        <button className="btn btn-primary" onClick={handleSetGenericScore}>
          Set Score
        </button>
      </section>

      <section className="card">
        <h2 className="card-title">Settings</h2>
        <div className="settings-row">
          <span className="settings-label">Language</span>
          <span className="settings-value">{settings.language}</span>
        </div>
        <div className="settings-row">
          <span className="settings-label">Notification</span>
          <span className={`badge ${settings.notification ? 'badge-on' : 'badge-off'}`}>
            {settings.notification ? 'On' : 'Off'}
          </span>
        </div>
        <button className="btn btn-primary" onClick={handleSetSettings}>
          Set Settings
        </button>
           <button className="btn btn-primary" onClick={handleSetSettingsBack}>
          Set Language Back
        </button>
      </section>

      <section className="card">
        <h2 className="card-title">Generic Fn</h2>
        <div className="settings-row">
          <span className="settings-label">Language</span>
          <span className="settings-value">{genericsettings.language}</span>
        </div>
        <div className="settings-row">
          <span className="settings-label">Notification</span>
          <span className={`badge ${genericsettings.notification ? 'badge-on' : 'badge-off'}`}>
            {genericsettings.notification ? 'On' : 'Off'}
          </span>
        </div>
        <button className="btn btn-primary" id='btn' onClick={handlesetGenericSettings}>
          Set Generic Fn
        </button>
           <button className="btn btn-primary" id='btn' onClick={handlesetGenericSettingsBack}>
          Set Generic Language Back
        </button>
      </section>

    </div>
  )
}

export default App