import { useState } from "react";
import cloudsUpper from "./assets/halloween/clouds-upper.svg";
import moonArt from "./assets/halloween/moon.svg";
import hooneyLogo from "./assets/halloween/hooney-plus.svg";
import cloudAccentLeft from "./assets/halloween/cloud-accent-left.svg";
import cloudAccentRight from "./assets/halloween/cloud-accent-right.svg";
import "./splash-playground.css";

type VariantId = "static" | "subtle" | "moon" | "clouds" | "cinematic" | "combined";

const animationVariants: { id: VariantId; label: string; description: string }[] = [
  { id: "static", label: "STATIC", description: "Composição sem movimento" },
  { id: "subtle", label: "SUBTLE", description: "Entrada delicada da lua e da logo" },
  { id: "moon", label: "MOON", description: "A lua conduz a entrada" },
  { id: "clouds", label: "CLOUDS", description: "Parallax suave das nuvens" },
  { id: "cinematic", label: "CINEMATIC", description: "Luz e profundidade em sequência" },
  { id: "combined", label: "COMBINED", description: "Movimento breve e equilibrado" },
];

function CloudPlanes() {
  return (
    <div className="splash-clouds" aria-hidden="true">
      <div className="cloud-plane cloud-plane--far">
        <img className="cloud-image cloud-image--upper" src={cloudsUpper} alt="" />
        <img className="cloud-image cloud-image--lower" src={cloudsUpper} alt="" />
      </div>
      <div className="cloud-plane cloud-plane--mid">
        <img className="cloud-image cloud-image--upper" src={cloudsUpper} alt="" />
        <img className="cloud-image cloud-image--lower" src={cloudsUpper} alt="" />
      </div>
      <div className="cloud-plane cloud-plane--near">
        <img className="cloud-accent cloud-accent--left" src={cloudAccentLeft} alt="" />
        <img className="cloud-accent cloud-accent--right" src={cloudAccentRight} alt="" />
      </div>
    </div>
  );
}

function Moon() {
  return (
    <div className="splash-moon" aria-hidden="true">
      <span className="moon-aura" />
      <img className="moon-art" src={moonArt} alt="" />
    </div>
  );
}

function SplashScene({ variant, onReplay }: { variant: VariantId; onReplay: () => void }) {
  return (
    <div
      className={`splash-scene motion-${variant}`}
      role="button"
      tabIndex={0}
      aria-label="Reproduzir novamente a animação da splash"
      onClick={onReplay}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          onReplay();
        }
      }}
    >
      <div className="splash-base" />
      <div className="moonlight-cloud-glow" aria-hidden="true" />
      <CloudPlanes />
      <Moon />
      <img className="splash-logo" src={hooneyLogo} alt="hooney+" draggable={false} />
      <span className="scene-replay-cue" aria-hidden="true">↻</span>
    </div>
  );
}

export default function SplashPlayground() {
  const [variant, setVariant] = useState<VariantId>("static");
  const [replayKey, setReplayKey] = useState(0);
  const selected = animationVariants.find((item) => item.id === variant)!;

  const replay = () => setReplayKey((key) => key + 1);
  const selectVariant = (next: VariantId) => {
    setVariant(next);
    replay();
  };

  return (
    <main className="motion-playground">
      <header className="playground-header">
        <div className="playground-heading">
          <span className="playground-kicker">HOONEY+ · HALLOWEEN</span>
          <h1>Splash motion playground</h1>
        </div>
        <button className="replay-button" onClick={replay} type="button">
          <span aria-hidden="true">↻</span> Replay
        </button>
      </header>

      <nav className="variant-tabs" aria-label="Propostas de animação">
        {animationVariants.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`variant-tab${variant === item.id ? " is-active" : ""}`}
            aria-pressed={variant === item.id}
            onClick={() => selectVariant(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <section className="preview-area" aria-label={`Preview ${selected.label}`}>
        <div className="preview-frame" key={`${variant}-${replayKey}`}>
          <SplashScene variant={variant} onReplay={replay} />
        </div>
        <div className="preview-caption">
          <span className="caption-variant">{selected.label}</span>
          <span>{selected.description}</span>
          <span className="replay-hint">Click/tap preview to replay</span>
        </div>
      </section>
    </main>
  );
}
