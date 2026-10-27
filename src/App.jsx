import { useEffect, useState } from 'react'
import './App.css'

const CURRENT_YEAR = new Date().getFullYear()

const callLines = [
  { speaker: 'Hydropulse assistant', text: 'Hi Amina, this is Hydropulse calling about your North Plot.' },
  { speaker: 'Hydropulse assistant', text: 'Soil moisture is at 18%, below your 25% alert threshold.' },
  { speaker: 'Hydropulse assistant', text: 'Would you like me to switch on irrigation for 20 minutes?' },
  { speaker: 'Amina', text: 'Yes, go ahead.' },
  { speaker: 'Hydropulse assistant', text: 'Done. I’ll check the moisture reading again and let you know.' },
]

function Icon({ name, size = 20 }) {
  const paths = {
    arrow: <><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></>,
    water: <><path d="M12 3.5S5.5 10.2 5.5 14.5a6.5 6.5 0 0 0 13 0C18.5 10.2 12 3.5 12 3.5Z"/><path d="M9 15a3 3 0 0 0 3 3"/></>,
    wave: <><path d="M2 12c2.5 0 2.5-4 5-4s2.5 8 5 8 2.5-8 5-8 2.5 4 5 4"/></>,
    phone: <><path d="M21 16.4v3a2 2 0 0 1-2.2 2A19.8 19.8 0 0 1 10.2 18a19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.8 3.2 2 2 0 0 1 3.8 1h3a2 2 0 0 1 2 1.7l.5 3a2 2 0 0 1-.6 1.7L7 9.1a16 16 0 0 0 6 6l1.7-1.7a2 2 0 0 1 1.7-.6l3 .5a2 2 0 0 1 1.6 2.1Z"/></>,
    check: <><path d="m5 12 4 4L19 6"/></>,
    bolt: <><path d="m13 2-3 8h7l-6 12 2-9H6l7-11Z"/></>,
  }
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>
}

function App() {
  const [playing, setPlaying] = useState(false)
  const [line, setLine] = useState(-1)
  const [reply, setReply] = useState(null)
  const [notice, setNotice] = useState('')
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '')
  const contactEmail = import.meta.env.VITE_CONTACT_EMAIL?.trim()
  const whatsappLink = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent('Hi Hydropulse, I would like to learn more about moisture monitoring.')}`
    : ''
  const conversation = reply === 'later'
    ? [...callLines.slice(0, 3), { speaker: 'Amina', text: 'Remind me later.' }, { speaker: 'Hydropulse assistant', text: 'Sure. I’ll check again and call if it still needs attention.' }]
    : callLines

  useEffect(() => {
    if (!playing) return undefined
    if (line >= callLines.length - 1) {
      const timeout = window.setTimeout(() => setPlaying(false), 1800)
      return () => window.clearTimeout(timeout)
    }
    const timeout = window.setTimeout(() => {
      const nextLine = line + 1
      setLine(nextLine)
      if (nextLine === 2 && !reply) setPlaying(false)
    }, line < 0 ? 400 : 1500)
    return () => window.clearTimeout(timeout)
  }, [playing, line, reply])

  const startCallPreview = () => {
    setLine(-1)
    setReply(null)
    setPlaying(true)
  }

  const chooseCallReply = (answer) => {
    setReply(answer)
    setLine(answer === 'yes' ? 3 : 4)
    setPlaying(true)
  }

  const handleWhatsApp = () => {
    if (!whatsappLink) {
      setNotice('WhatsApp is ready to connect. Add VITE_WHATSAPP_NUMBER to the deployment environment to enable the chat link.')
      window.setTimeout(() => setNotice(''), 6000)
    }
  }

  return (
    <div className="site-shell">
      <div className="topline"><span className="topline-dot"/> A clearer signal from the ground up <span className="topline-sep">·</span> Built for growers and water teams</div>
      <header className="nav-wrap">
        <a className="brand" href="#top" aria-label="Hydropulse home"><span className="brand-mark"><Icon name="wave" size={23}/></span><span>hydro<span className="brand-light">pulse</span></span></a>
        <nav className="nav-links" aria-label="Main navigation"><a href="#platform">Platform</a><a href="#how-it-works">How it works</a><a href="#voice">Voice alerts</a></nav>
        <a className="nav-cta" href="#contact">Talk to our team <Icon name="arrow" size={16}/></a>
      </header>

      <main id="top">
        <section className="hero section-wrap">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-icon"><Icon name="water" size={14}/></span> WATER &amp; SOIL, IN SYNC</div>
            <h1>Know what your<br/>land needs <em>next.</em></h1>
            <p className="hero-lede">Hydropulse brings soil moisture and water levels into one clear view, then helps you act before a small dip becomes a big problem.</p>
            <div className="hero-actions"><a className="button button-dark" href="#contact">Explore Hydropulse <Icon name="arrow" size={17}/></a><button className="text-button" onClick={startCallPreview}><span className="play-icon">▶</span> Hear an alert preview</button></div>
            <div className="hero-proof"><div className="avatar-stack"><span>A</span><span>K</span><span>M</span></div><p><strong>From field signal to next step</strong><br/>One connected view for your team</p></div>
          </div>
          <div className="hero-visual" aria-label="Illustration of a sample moisture dashboard">
            <div className="sun-orb"/><div className="visual-label"><span className="live-dot"/> FIELD SNAPSHOT <span className="demo-tag">SAMPLE</span></div>
            <div className="field-lines"><span/><span/><span/><span/><span/></div>
            <div className="sensor-pin pin-one"><span className="pin-wave"><Icon name="water" size={15}/></span><b>North plot</b><small>24% moisture</small></div>
            <div className="sensor-pin pin-two"><span className="pin-wave pin-alert"><Icon name="water" size={15}/></span><b>East beds</b><small>18% · needs water</small></div>
            <div className="dashboard-card">
              <div className="card-head"><div><span className="card-overline">SOIL MOISTURE</span><h3>East beds <span className="status-pill">Attention</span></h3></div><span className="more-dots">•••</span></div>
              <div className="moisture-value">18<span>%</span><small>−6% <i>since yesterday</i></small></div>
              <div className="chart"><div className="chart-grid"><span/><span/><span/></div><svg viewBox="0 0 360 85" preserveAspectRatio="none" role="img" aria-label="Sample moisture trend chart"><defs><linearGradient id="fill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stopColor="#47b99e" stopOpacity=".25"/><stop offset="1" stopColor="#47b99e" stopOpacity="0"/></linearGradient></defs><path d="M0 22 C25 20 30 32 58 28 S94 39 119 35 S152 42 179 49 S213 43 239 54 S277 53 299 66 S334 62 360 74 V85 H0Z" fill="url(#fill)"/><path d="M0 22 C25 20 30 32 58 28 S94 39 119 35 S152 42 179 49 S213 43 239 54 S277 53 299 66 S334 62 360 74" fill="none" stroke="#168b75" strokeWidth="3" strokeLinecap="round"/></svg><div className="threshold"><span>ALERT THRESHOLD · 25%</span><i/></div></div>
              <div className="chart-dates"><span>6 AM</span><span>10 AM</span><span>2 PM</span><span>6 PM</span></div>
              <div className="alert-strip"><span className="alert-bolt"><Icon name="bolt" size={14}/></span><span><b>Suggested action</b><small>Check irrigation at East beds</small></span><Icon name="arrow" size={15}/></div>
            </div>
            <div className="floating-stat"><span className="stat-icon"><Icon name="wave" size={18}/></span><span><small>WATER TANK</small><b>72% <i>· stable</i></b></span><span className="stat-check"><Icon name="check" size={14}/></span></div>
            <div className="visual-footnote">Illustrative sample readings</div>
          </div>
        </section>

        <section className="trust-band"><div className="trust-inner"><span>MADE FOR THE MOMENTS THAT MATTER</span><i/><p>Know sooner</p><i/><p>Waste less</p><i/><p>Act with confidence</p></div></section>

        <section className="platform section-wrap" id="platform">
          <div className="section-intro"><div className="eyebrow">ONE PULSE, TWO VITALS</div><h2>Water and moisture,<br/><em>working together.</em></h2><p>Get a practical picture of what’s happening across your plots and water system, without chasing readings from one place to another.</p></div>
          <div className="feature-grid"><article className="feature-card feature-dark"><div className="feature-icon"><Icon name="water" size={22}/></div><div className="feature-topline">01 / FIELD CONDITIONS</div><h3>Soil moisture<br/>you can act on.</h3><p>Follow moisture trends by plot and set thresholds that match your crop and conditions.</p><a href="#how-it-works">Explore field monitoring <Icon name="arrow" size={16}/></a><div className="soil-graphic"><div className="soil-sun"/><div className="soil-horizon"><span/><span/><span/></div><div className="root root-a"/><div className="root root-b"/><div className="root root-c"/><div className="soil-drop"><Icon name="water" size={18}/></div></div></article>
            <article className="feature-card feature-light"><div className="feature-icon"><Icon name="wave" size={22}/></div><div className="feature-topline">02 / WATER AVAILABILITY</div><h3>Know what’s<br/>in reserve.</h3><p>Keep an eye on tank and supply levels, with alerts when something needs a closer look.</p><a href="#how-it-works">Explore water monitoring <Icon name="arrow" size={16}/></a><div className="tank-graphic"><div className="tank"><div className="tank-water"><span/><span/><span/></div><i className="tank-mark mark-a"/><i className="tank-mark mark-b"/><i className="tank-mark mark-c"/></div><div className="tank-readout"><small>RESERVE LEVEL</small><b>72%</b><span>Within range</span></div><div className="tank-spark"><svg viewBox="0 0 140 42" preserveAspectRatio="none"><path d="M0 32 C15 28 17 16 31 20 S51 31 66 20 S87 14 100 17 S122 9 140 5" fill="none" stroke="#2b9f89" strokeWidth="2.5"/></svg></div></div></article></div>
        </section>

        <section className="steps-section" id="how-it-works"><div className="section-wrap steps-wrap"><div className="steps-heading"><div className="eyebrow">FROM SIGNAL TO RESPONSE</div><h2>Less guesswork.<br/><em>Better timing.</em></h2><p>Hydropulse turns sensor readings into a simple loop your team can understand and respond to.</p></div><div className="steps-list"><article><span className="step-index">01</span><div><h3>Connect your readings</h3><p>Bring supported moisture and water-level sensors into a shared view.</p></div><span className="step-line"/></article><article><span className="step-index">02</span><div><h3>Set what matters</h3><p>Choose the locations, thresholds, and alert preferences that fit your operation.</p></div><span className="step-line"/></article><article><span className="step-index">03</span><div><h3>Get a useful nudge</h3><p>Receive a timely alert with the reading and a suggested next step.</p></div></article></div></div></section>

        <section className="voice-section section-wrap" id="voice"><div className="voice-copy"><div className="eyebrow"><span className="voice-wave"><Icon name="wave" size={14}/></span> WHEN A PING ISN’T ENOUGH</div><h2>A voice that helps<br/>you <em>stay in the loop.</em></h2><p>For urgent changes, a voice assistant can call with the context, ask what you want to do, and keep the conversation moving.</p><ul><li><span><Icon name="check" size={14}/></span>Clear readings and alert context</li><li><span><Icon name="check" size={14}/></span>Two-way, natural-language response</li><li><span><Icon name="check" size={14}/></span>Escalation paths you can configure</li></ul><div className="voice-note">Interactive concept preview · No phone call is placed</div><button className="button button-green" onClick={startCallPreview}>{playing ? 'Restart call preview' : 'Preview an agent call'} <Icon name="arrow" size={17}/></button></div>
          <div className="phone-stage"><div className="phone-glow"/><div className="phone-frame"><div className="phone-notch"/><div className="phone-screen"><div className="call-status"><span className={playing ? 'calling-dot is-calling' : 'calling-dot'}/>{playing ? 'PREVIEW IN PROGRESS' : 'VOICE ALERT PREVIEW'}</div><div className="caller-avatar"><span className="caller-rings"/><span className="caller-logo"><Icon name="wave" size={27}/></span></div><h3>Hydropulse<br/>Field Assistant</h3><p className="caller-subtitle">North Plot · Moisture alert</p><div className="call-transcript">{line < 0 ? <div className="transcript-placeholder">{playing ? 'Connecting to sample conversation…' : 'Tap “Preview an agent call” to see a sample conversation.'}</div> : conversation.slice(0, line + 1).map((entry, index) => <div key={index} className={`transcript-line ${entry.speaker === 'Amina' ? 'transcript-user' : ''}`}><small>{entry.speaker}</small><p>{entry.text}</p></div>)}{line === 2 && !reply && <div className="call-choices"><button onClick={() => chooseCallReply('yes')}>Start irrigation</button><button onClick={() => chooseCallReply('later')}>Remind me later</button></div>}</div><div className="call-controls"><button aria-label="Mute sample" className="control-muted">•••</button><span>{playing ? 'Sample conversation' : 'Product concept'}</span><button aria-label="End preview" className="control-end" onClick={() => { setPlaying(false); setLine(-1); setReply(null) }}>×</button></div><div className="phone-home"/></div></div><div className="call-caption"><span className="caption-icon"><Icon name="phone" size={15}/></span><span><b>Choose your next step</b><small>Designed for real-world follow-through</small></span></div></div>
        </section>

        <section className="whatsapp-band"><div className="whatsapp-inner"><div className="whatsapp-icon">◔</div><div><span className="eyebrow">ALERTS WHERE YOUR TEAM ALREADY IS</span><h2>Bring the right people<br/><em>into the conversation.</em></h2><p>Connect WhatsApp as a notification channel for practical updates your team can act on.</p></div><a className="button button-white" href={whatsappLink || '#contact'} onClick={handleWhatsApp}>Connect on WhatsApp <Icon name="arrow" size={17}/></a></div></section>

        <section className="contact-section section-wrap" id="contact"><div><div className="eyebrow">LET’S GET CONNECTED</div><h2>Make every reading<br/>count for <em>something.</em></h2><p>Tell us what you’re monitoring. We’ll help shape a setup around your land, water system, and team.</p></div><div className="contact-card"><div className="contact-card-top"><span className="contact-mark"><Icon name="wave" size={22}/></span><div><b>Talk with Hydropulse</b><small>Choose a channel to get started</small></div></div><a className="contact-option" href={whatsappLink || '#contact'} onClick={handleWhatsApp}><span className="contact-option-icon whatsapp-mini">◔</span><span><b>WhatsApp</b><small>{whatsappNumber ? 'Start a conversation' : 'Configure a WhatsApp number to enable'}</small></span><Icon name="arrow" size={16}/></a><a className="contact-option" href={contactEmail ? `mailto:${contactEmail}?subject=Hydropulse%20enquiry` : '#contact'} onClick={() => { if (!contactEmail) { setNotice('Add VITE_CONTACT_EMAIL to the deployment environment to enable email contact.'); window.setTimeout(() => setNotice(''), 6000) } }}><span className="contact-option-icon mail-mini">✉</span><span><b>Email our team</b><small>{contactEmail || 'Configure a contact email to enable'}</small></span><Icon name="arrow" size={16}/></a></div></section>
      </main>

      <footer className="footer"><a className="brand brand-footer" href="#top"><span className="brand-mark"><Icon name="wave" size={21}/></span><span>hydro<span className="brand-light">pulse</span></span></a><span>Clear signals. Better decisions.</span><span>© {CURRENT_YEAR} Hydropulse</span></footer>
      {notice && <div className="toast" role="status">{notice}</div>}
    </div>
  )
}

export default App
