import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ReferenceLine, ResponsiveContainer
} from 'recharts'

/* ─── Styles ──────────────────────────────────────────────────────────────── */
const Styles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    .vw { min-height: 100vh; background: #f4f7f4; color: #1a2e1c; font-family: 'DM Sans', sans-serif; font-weight: 300; }

    .vw-header { border-bottom: 1px solid #d4e0d6; padding: 22px 48px; display: flex; align-items: center; justify-content: space-between; background: #fff; }
    .vw-logo { font-family: 'Playfair Display', serif; font-size: 20px; color: #3a6e45; letter-spacing: 0.04em; }
    .vw-logo em { font-style: italic; color: #1a2e1c; }
    .vw-badge { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #5a8a62; border: 1px solid #b8d4bc; padding: 4px 12px; border-radius: 2px; }

    .vw-main { max-width: 780px; margin: 0 auto; padding: 52px 24px 100px; }

    .vw-hero { text-align: center; margin-bottom: 44px; }
    .vw-eyebrow { font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase; color: #5a8a62; margin-bottom: 12px; }
    .vw-title { font-family: 'Playfair Display', serif; font-size: clamp(26px, 4.5vw, 40px); font-weight: 400; color: #1a2e1c; line-height: 1.2; margin-bottom: 12px; }
    .vw-subtitle { font-size: 14px; color: #6a9070; max-width: 480px; margin: 0 auto; line-height: 1.7; }

    .vw-modes { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; margin-bottom: 44px; }
    @media (max-width: 520px) { .vw-modes { grid-template-columns: 1fr; } }

    .vw-mode-btn {
      background: #fff; border: 2px solid #d4e0d6; border-radius: 10px;
      padding: 28px 24px; cursor: pointer; text-align: left; transition: all 0.18s;
      position: relative; overflow: hidden;
    }
    .vw-mode-btn:hover { border-color: #7ab88a; background: #f8fbf8; }
    .vw-mode-btn.active { border-color: #3a6e45; background: #f0f7f1; }
    .vw-mode-icon { font-size: 26px; margin-bottom: 12px; display: block; }
    .vw-mode-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase; color: #5a8a62; margin-bottom: 6px; }
    .vw-mode-btn.active .vw-mode-label { color: #3a6e45; }
    .vw-mode-name { font-family: 'Playfair Display', serif; font-size: 19px; color: #1a2e1c; margin-bottom: 6px; }
    .vw-mode-desc { font-size: 12px; color: #8aaa8e; line-height: 1.5; }
    .vw-mode-check {
      position: absolute; top: 14px; right: 14px;
      width: 20px; height: 20px; border-radius: 50%;
      background: #3a6e45; display: flex; align-items: center; justify-content: center;
      opacity: 0; transition: opacity 0.15s;
    }
    .vw-mode-btn.active .vw-mode-check { opacity: 1; }
    .vw-mode-check svg { width: 11px; height: 11px; stroke: #fff; fill: none; stroke-width: 2.5; }

    .vw-tabs { display: flex; gap: 0; border: 1px solid #d4e0d6; border-radius: 8px; overflow: hidden; margin-bottom: 36px; background: #fff; }
    .vw-tab {
      flex: 1; padding: 14px 20px; cursor: pointer; border: none; background: none;
      font-family: 'DM Sans', sans-serif; font-size: 13px; color: #6a9070;
      border-right: 1px solid #d4e0d6; transition: all 0.15s; text-align: center;
    }
    .vw-tab:last-child { border-right: none; }
    .vw-tab:hover { background: #f8fbf8; color: #3a6e45; }
    .vw-tab.active { background: #f0f7f1; color: #3a6e45; font-weight: 500; position: relative; }
    .vw-tab.active::after { content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 2px; background: #3a6e45; }
    .vw-tab-tag { font-size: 9px; letter-spacing: 0.14em; text-transform: uppercase; display: block; margin-bottom: 2px; opacity: 0.7; }

    .vw-section-head { margin-bottom: 32px; padding-bottom: 16px; border-bottom: 1px solid #e4eee6; }
    .vw-section-name { font-family: 'Playfair Display', serif; font-size: 20px; color: #1a2e1c; margin-bottom: 4px; }
    .vw-section-desc { font-size: 13px; color: #8aaa8e; line-height: 1.5; }

    .vw-questions { display: flex; flex-direction: column; gap: 20px; }

    .vw-qcard {
      background: #fff; border: 1.5px solid #d4e0d6; border-radius: 10px;
      padding: 24px 28px; position: relative; transition: border-color 0.15s;
      box-shadow: 0 1px 3px rgba(30,70,35,0.04);
    }
    .vw-qcard.filled { border-color: #9ecba8; }
    .vw-qcard.error { border-color: #d03f3f; background: #fff8f8; }

    .vw-qcard-header { display: flex; align-items: center; gap: 10px; margin-bottom: 6px; }
    .vw-dot { width: 9px; height: 9px; border-radius: 50%; flex-shrink: 0; }
    .vw-dot-tc { background: #3b9edb; }
    .vw-dot-bv { background: #2fa862; }
    .vw-dot-exp { background: #e07c1a; }
    .vw-dot-te { background: #d03f3f; }

    .vw-q-label { font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #6a9070; }
    .vw-qcard.filled .vw-q-label { color: #3a6e45; }

    .vw-q-text { font-family: 'Playfair Display', serif; font-size: 16px; color: #1a2e1c; line-height: 1.45; margin-bottom: 4px; }
    .vw-q-hint { font-size: 11px; color: #8aaa8e; margin-bottom: 20px; line-height: 1.5; }

    .vw-slider-area { display: flex; flex-direction: column; gap: 10px; }
    .vw-price-row { display: flex; align-items: baseline; gap: 3px; }
    .vw-price-sym { font-size: 15px; color: #3a6e45; font-weight: 400; }
    .vw-price-num { font-family: 'Playfair Display', serif; font-size: 34px; min-width: 80px; }
    .vw-price-unit { font-size: 12px; color: #8aaa8e; }

    .vw-range {
      -webkit-appearance: none; appearance: none;
      width: 100%; height: 4px; border-radius: 2px; outline: none; cursor: pointer;
    }
    .vw-range::-webkit-slider-thumb {
      -webkit-appearance: none; width: 22px; height: 22px; border-radius: 50%;
      background: #3a6e45; cursor: pointer;
      border: 3px solid #fff; box-shadow: 0 0 0 1.5px #3a6e45, 0 2px 6px rgba(58,110,69,0.25);
      transition: transform 0.12s;
    }
    .vw-range::-webkit-slider-thumb:hover { transform: scale(1.15); }

    .vw-range-labels { display: flex; justify-content: space-between; font-size: 10px; color: #aac8ae; }
    .vw-constraint { font-size: 11px; color: #aac8ae; margin-top: 2px; }
    .vw-constraint strong { color: #5a8a62; }
    .vw-error-msg { font-size: 11px; color: #d03f3f; margin-top: 6px; }

    .vw-progress { display: flex; gap: 6px; margin-bottom: 32px; align-items: center; }
    .vw-prog-dot { width: 7px; height: 7px; border-radius: 50%; background: #d4e0d6; transition: background 0.2s; }
    .vw-prog-dot.done { background: #3a6e45; }
    .vw-prog-dot.current { background: #7ab88a; }
    .vw-prog-label { font-size: 11px; color: #8aaa8e; margin-left: 8px; }

    .vw-actions { margin-top: 36px; display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
    .vw-btn-primary {
      background: #3a6e45; color: #fff; font-family: 'DM Sans', sans-serif;
      font-size: 13px; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
      border: none; padding: 14px 38px; border-radius: 4px; cursor: pointer; transition: all 0.18s;
    }
    .vw-btn-primary:hover { background: #2e5737; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(58,110,69,0.2); }
    .vw-btn-primary:disabled { opacity: 0.45; cursor: not-allowed; transform: none; box-shadow: none; }
    .vw-btn-ghost {
      background: none; color: #6a9070; font-family: 'DM Sans', sans-serif;
      font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase;
      border: 1px solid #c8deca; padding: 14px 24px; border-radius: 4px; cursor: pointer; transition: all 0.15s;
    }
    .vw-btn-ghost:hover { border-color: #3a6e45; color: #3a6e45; }

    /* Thank-you banner */
    .vw-thankyou {
      background: linear-gradient(135deg, #f0f7f1, #e4f0e6);
      border: 1px solid #9ecba8; border-radius: 10px;
      padding: 28px 32px; margin-top: 36px; text-align: center;
    }
    .vw-thankyou-icon { font-size: 32px; margin-bottom: 12px; }
    .vw-thankyou-title { font-family: 'Playfair Display', serif; font-size: 20px; color: #3a6e45; margin-bottom: 8px; }
    .vw-thankyou-text { font-size: 13px; color: #6a9070; line-height: 1.6; }
    .vw-thankyou-again { margin-top: 18px; font-size: 12px; color: #8aaa8e; }
    .vw-thankyou-again button { background: none; border: none; color: #3a6e45; cursor: pointer; font-size: 12px; text-decoration: underline; }

    .vw-footer { text-align: center; padding: 32px 24px; font-size: 11px; color: #aac8ae; border-top: 1px solid #e4eee6; margin-top: 60px; }
  `}</style>
)

/* ─── Survey config ───────────────────────────────────────────────────────── */
function makeQuestions(product) {
  return [
    { id: 'tc',  label: '太便宜',   text: `您會對「${product}」感到太便宜、品質令人懷疑的價格是？`,  hint: '低於此價位，您會擔心服務品質不佳' },
    { id: 'bv',  label: '物超所值', text: `您認為「${product}」物超所值、讓您馬上購買的價格是？`,   hint: '感覺完全值得，不需要猶豫' },
    { id: 'exp', label: '有點貴',   text: `您認為「${product}」有點貴，但還在可接受範圍的價格是？`, hint: '需要稍加考量，但不至於打消念頭' },
    { id: 'te',  label: '太貴',     text: `您認為「${product}」貴到完全不考慮購買的價格是？`,       hint: '超過此價位無論如何都不會購買' },
  ]
}

const MODES = [
  {
    id: 'subscription', icon: '♾️', label: '訂閱制', name: 'Monthly Subscription',
    desc: '按月訂閱，無限次使用 AI 分析功能',
    tabs: [
      { id: 'tier1', tag: 'Tier 1', name: 'General AI', desc: '無限次 General AI 揮桿分析，不含教練 Feedback', unit: '/ mo', min: 0, max: 40, step: 1, questions: makeQuestions('General AI 月訂閱') },
      { id: 'tier2', tag: 'Tier 2', name: "Coach's AI Agent", desc: '訂閱教練專屬 AI Agent，無限 AI 分析＋教練 Feedback', unit: '/ mo', min: 0, max: 120, step: 2, questions: makeQuestions("Coach's AI Agent 月訂閱") },
    ],
  },
  {
    id: 'ppv', icon: '🎯', label: 'Pay Per Use', name: 'Pay Per Use',
    desc: '單次購買，按需使用各項功能',
    tabs: [
      { id: 'swing',    tag: 'AI 分析',      name: '單次揮桿 AI 分析',  desc: '購買單次 AI 揮桿動作分析',  unit: '/ session', min: 0, max: 20, step: 0.5, questions: makeQuestions('單次 AI 揮桿分析') },
      { id: 'feedback', tag: '教練 Feedback', name: '單次教練 Feedback', desc: '購買單次教練人工 Feedback', unit: '/ session', min: 0, max: 60, step: 1,   questions: makeQuestions('單次教練 Feedback') },
    ],
  },
]

const Q_META = [
  { id: 'tc',  dotClass: 'vw-dot-tc',  label: '太便宜',   color: '#3b9edb' },
  { id: 'bv',  dotClass: 'vw-dot-bv',  label: '物超所值', color: '#2fa862' },
  { id: 'exp', dotClass: 'vw-dot-exp', label: '有點貴',   color: '#e07c1a' },
  { id: 'te',  dotClass: 'vw-dot-te',  label: '太貴',     color: '#d03f3f' },
]

const ORDER = ['tc', 'bv', 'exp', 'te']

/* ─── Helpers ─────────────────────────────────────────────────────────────── */
const fmt = (v) => (v == null ? '—' : v % 1 === 0 ? v.toLocaleString() : v.toFixed(1))
const sliderBg = (val, min, max) => {
  const p = max === min ? 0 : ((val - min) / (max - min)) * 100
  return `linear-gradient(to right,#3a6e45 0%,#3a6e45 ${p}%,#d4e0d6 ${p}%,#d4e0d6 100%)`
}

/* ─── Main component ──────────────────────────────────────────────────────── */
export default function App() {
  const [modeId, setModeId]   = useState(null)
  const [tabIdx, setTabIdx]   = useState(0)
  const [answers, setAnswers] = useState({})
  const [errors, setErrors]   = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const mode = MODES.find(m => m.id === modeId)
  const tab  = mode?.tabs[tabIdx]

  const aKey = (qid) => `${modeId}__${tab?.id}__${qid}`
  const getA = (qid) => answers[aKey(qid)] ?? tab?.min ?? 0

  /* cascade: nudge downstream values up when upstream is dragged */
  const handleSlide = (qid, raw) => {
    const val = Number(raw)
    const idx = ORDER.indexOf(qid)
    const updates = { [aKey(qid)]: val }
    let floor = val
    for (let i = idx + 1; i < ORDER.length; i++) {
      const nk = aKey(ORDER[i])
      const cur = answers[nk] ?? tab.min
      floor += tab.step
      if (cur <= floor - tab.step) {
        updates[nk] = Math.min(+floor.toFixed(10), tab.max)
      } else break
    }
    setAnswers(prev => ({ ...prev, ...updates }))
    setErrors(prev => {
      const n = { ...prev }
      ORDER.forEach(id => { n[aKey(id)] = null })
      return n
    })
  }

  const validate = () => {
    const vals = ORDER.map(id => getA(id))
    const errs = {}
    let ok = true
    for (let i = 1; i < vals.length; i++) {
      if (vals[i] <= vals[i - 1]) {
        errs[aKey(ORDER[i])] = `必須高於「${Q_META[i - 1].label}」($${fmt(vals[i - 1])})`
        ok = false
      }
    }
    setErrors(errs)
    return ok
  }

  const handleSubmit = async () => {
    if (!validate()) return

    const payload = {
      pricing_mode: modeId,
      pricing_tab:  tab.id,
      pricing_tab_name: tab.name,
      price_too_cheap:    getA('tc'),
      price_best_value:   getA('bv'),
      price_expensive:    getA('exp'),
      price_too_expensive: getA('te'),
      acceptable_range_width: +(getA('te') - getA('tc')).toFixed(2),
      currency: 'USD',
      survey_version: '1.0',
    }

    setSubmitting(true)
    setSubmitError(null)

    try {
      const url = import.meta.env.VITE_GOOGLE_SCRIPT_URL
      await fetch(url, {
        method: 'POST',
        redirect: 'follow',
        headers: { 'Content-Type': 'text/plain' },
        body: JSON.stringify(payload),
      })

      setSubmitted(true)
    } catch (err) {
      setSubmitError('提交失敗，請稍後再試。')
    } finally {
      setSubmitting(false)
    }
  }

  const handleReset = () => {
    ORDER.forEach(id => {
      setAnswers(prev => { const n = { ...prev }; delete n[aKey(id)]; return n })
    })
    setErrors({})
    setSubmitted(false)
  }

  const handleModeSelect = (id) => {
    setModeId(id)
    setTabIdx(0)
    setSubmitted(false)
  }

  const handleTabSelect = (i) => {
    setTabIdx(i)
    setSubmitted(false)
  }

  const strictlyIncFilled = ORDER.filter((id, i, arr) =>
    i === 0 || getA(id) > getA(arr[i - 1])
  ).length

  return (
    <div className="vw">
      <Styles />

      <header className="vw-header">
        <div className="vw-logo">Swing<em>IQ</em></div>
        <div className="vw-badge">Price Sensitivity Survey</div>
      </header>

      <main className="vw-main">

        {/* Hero */}
        <div className="vw-hero">
          <p className="vw-eyebrow">Van Westendorp 定價研究</p>
          <h1 className="vw-title">您認為合理的<br />價格是多少？</h1>
          <p className="vw-subtitle">
            請根據直覺回答四個關於價格感受的問題，協助我們找到最適合所有人的定價方案。
          </p>
        </div>

        {/* Step 1 — Mode */}
        <p className="vw-eyebrow" style={{ marginBottom: 14 }}>請選擇您偏好的計費方式</p>
        <div className="vw-modes">
          {MODES.map(m => (
            <button key={m.id} className={`vw-mode-btn ${modeId === m.id ? 'active' : ''}`}
              onClick={() => handleModeSelect(m.id)}>
              <div className="vw-mode-check">
                <svg viewBox="0 0 12 12"><polyline points="2,6 5,9 10,3" /></svg>
              </div>
              <span className="vw-mode-icon">{m.icon}</span>
              <p className="vw-mode-label">{m.label}</p>
              <p className="vw-mode-name">{m.name}</p>
              <p className="vw-mode-desc">{m.desc}</p>
            </button>
          ))}
        </div>

        {/* Step 2 — Tabs + Questions */}
        {mode && (
          <>
            <div className="vw-tabs">
              {mode.tabs.map((t, i) => (
                <button key={t.id} className={`vw-tab ${tabIdx === i ? 'active' : ''}`}
                  onClick={() => handleTabSelect(i)}>
                  <span className="vw-tab-tag">{t.tag}</span>
                  {t.name}
                </button>
              ))}
            </div>

            <div className="vw-section-head">
              <p className="vw-section-name">{tab.name}</p>
              <p className="vw-section-desc">{tab.desc}</p>
            </div>

            {/* Progress bar */}
            <div className="vw-progress">
              {ORDER.map((id, i) => (
                <div key={id} className={`vw-prog-dot ${i < strictlyIncFilled ? 'done' : i === strictlyIncFilled ? 'current' : ''}`} />
              ))}
              <span className="vw-prog-label">
                {strictlyIncFilled < 4 ? '請確保每個價格依序遞增' : '✓ 價格設定正確，可以提交'}
              </span>
            </div>

            {/* Questions */}
            {!submitted ? (
              <>
                <div className="vw-questions">
                  {tab.questions.map((q, idx) => {
                    const meta    = Q_META[idx]
                    const val     = getA(q.id)
                    const errMsg  = errors[aKey(q.id)]
                    const prevVal = idx > 0 ? getA(ORDER[idx - 1]) : null
                    const isFilled = idx === 0 ? true : val > (prevVal ?? 0)

                    return (
                      <div key={q.id} className={`vw-qcard ${errMsg ? 'error' : idx > 0 && isFilled ? 'filled' : ''}`}>
                        <div className="vw-qcard-header">
                          <span className={`vw-dot ${meta.dotClass}`} />
                          <span className="vw-q-label">{meta.label}</span>
                        </div>
                        <p className="vw-q-text">{q.text}</p>
                        <p className="vw-q-hint">{q.hint}</p>

                        <div className="vw-slider-area">
                          <div className="vw-price-row">
                            <span className="vw-price-sym">$</span>
                            <span className="vw-price-num" style={{ color: meta.color }}>{fmt(val)}</span>
                            <span className="vw-price-unit">{tab.unit}</span>
                          </div>

                          <input type="range" className="vw-range"
                            min={tab.min} max={tab.max} step={tab.step} value={val}
                            onChange={e => handleSlide(q.id, e.target.value)}
                            style={{ background: sliderBg(val, tab.min, tab.max) }}
                          />

                          <div className="vw-range-labels">
                            <span>${fmt(tab.min)}</span>
                            <span>${fmt(tab.max)}</span>
                          </div>

                          {prevVal !== null && (
                            <p className="vw-constraint">
                              必須高於 <strong>${fmt(prevVal)}</strong>（「{Q_META[idx - 1].label}」）
                            </p>
                          )}
                          {errMsg && <p className="vw-error-msg">⚠ {errMsg}</p>}
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="vw-actions">
                  <button className="vw-btn-primary" onClick={handleSubmit} disabled={submitting}>
                    {submitting ? '提交中...' : '提交回答'}
                  </button>
                  <button className="vw-btn-ghost" onClick={handleReset}>
                    重置
                  </button>
                </div>
                {submitError && <p style={{ color: '#d03f3f', fontSize: 13, marginTop: 12 }}>{submitError}</p>}
              </>
            ) : (
              /* Thank-you state */
              <div className="vw-thankyou">
                <div className="vw-thankyou-icon">⛳</div>
                <p className="vw-thankyou-title">感謝您的回答！</p>
                <p className="vw-thankyou-text">
                  您的意見已成功記錄。<br />
                  我們將彙整所有用戶的回饋，找到最合適的定價。
                </p>
                <p className="vw-thankyou-again">
                  想回答其他方案的問題？
                  <button onClick={handleReset}>繼續填寫</button>
                </p>
              </div>
            )}
          </>
        )}
      </main>

      <footer className="vw-footer">
        © {new Date().getFullYear()} SwingIQ · 本問卷資料僅用於產品定價研究，不會對外分享或販售。
      </footer>
    </div>
  )
}
