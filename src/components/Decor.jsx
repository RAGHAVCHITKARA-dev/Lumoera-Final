// Purely decorative floating emojis — no logic, just JSX + CSS animation
function Decor() {
  return (
    <>
      <span className="decor float" style={{ top: '10%', left: '6%', fontSize: 34 }}>🌸</span>
      <span className="decor float-slow" style={{ top: '18%', right: '8%', fontSize: 30 }}>☁️</span>
      <span className="decor twinkle" style={{ top: '38%', left: '3%', fontSize: 22 }}>✦</span>
      <span className="decor twinkle" style={{ top: '70%', right: '5%', fontSize: 26 }}>✧</span>
      <span className="decor float" style={{ bottom: '8%', left: '10%', fontSize: 28 }}>🌷</span>
      <span className="decor float-slow" style={{ bottom: '14%', right: '12%', fontSize: 30 }}>🍃</span>
    </>
  )
}

export default Decor
