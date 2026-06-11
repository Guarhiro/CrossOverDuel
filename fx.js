/* =========================================================
 * CROSSOVER DUEL - Battle FX Engine
 * ゼロ依存の戦闘演出モジュール。
 * - Canvasパーティクル（火花・破片・モート・紙吹雪・残り火）
 * - Web Animations APIによる突進アタック（溜め→突進→ヒットストップ→戻り）
 * - 画面シェイク / ビネットフラッシュ / 衝撃波 / 斬撃
 * - ターン・フェーズバナー / スキルカットイン / 勝敗演出
 * - prefers-reduced-motion 対応（重い演出を自動無効化）
 * ========================================================= */

const FX = (() => {
  const REDUCED_MOTION = window.matchMedia?.("(prefers-reduced-motion: reduce)") || null;
  const MAX_PARTICLES = 420;
  const SHAKE_TARGET_SELECTOR = ".app-shell";

  let canvas = null;
  let ctx = null;
  let domLayer = null;
  let vignetteEl = null;
  let bannerLayer = null;
  let resultLayer = null;
  let particles = [];
  let rafId = 0;
  let lastTime = 0;
  let dprCap = 2;

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  const enabled = () => !(REDUCED_MOTION && REDUCED_MOTION.matches);
  const rand = (min, max) => min + Math.random() * (max - min);
  const pick = (items) => items[Math.floor(Math.random() * items.length)];

  function hexToRgb(hex) {
    const value = hex.replace("#", "");
    const full = value.length === 3 ? value.split("").map((c) => c + c).join("") : value;
    const num = Number.parseInt(full, 16);
    return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 };
  }

  function rgba(hex, alpha) {
    const { r, g, b } = hexToRgb(hex);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  function lighten(hex, amount = 0.5) {
    const { r, g, b } = hexToRgb(hex);
    const mix = (v) => Math.round(v + (255 - v) * amount);
    return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
  }

  /* ---------- レイヤー管理 ---------- */

  function ensureLayers() {
    if (canvas) return;
    vignetteEl = document.createElement("div");
    vignetteEl.id = "fxVignette";
    vignetteEl.setAttribute("aria-hidden", "true");

    domLayer = document.createElement("div");
    domLayer.id = "fxLayer";
    domLayer.setAttribute("aria-hidden", "true");

    bannerLayer = document.createElement("div");
    bannerLayer.id = "fxBannerLayer";
    bannerLayer.setAttribute("aria-hidden", "true");

    resultLayer = document.createElement("div");
    resultLayer.id = "fxResultLayer";
    resultLayer.setAttribute("aria-hidden", "true");

    canvas = document.createElement("canvas");
    canvas.id = "fxCanvas";
    canvas.setAttribute("aria-hidden", "true");
    ctx = canvas.getContext("2d");

    document.body.append(vignetteEl, domLayer, bannerLayer, resultLayer, canvas);
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
  }

  function resizeCanvas() {
    if (!canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    canvas.width = Math.round(window.innerWidth * dpr);
    canvas.height = Math.round(window.innerHeight * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function centerOf(el) {
    const rect = el.getBoundingClientRect();
    return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, rect };
  }

  /* ---------- パーティクルエンジン ---------- */

  function spawn(particle) {
    if (particles.length >= MAX_PARTICLES) particles.shift();
    particles.push(particle);
    if (!rafId) {
      lastTime = performance.now();
      rafId = requestAnimationFrame(tick);
    }
  }

  function tick(now) {
    const dt = Math.min((now - lastTime) / 1000, 0.04);
    lastTime = now;
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles = particles.filter((p) => {
      p.t += dt;
      if (p.t >= p.life) return false;
      p.vy += (p.g || 0) * dt;
      const drag = p.drag || 0;
      if (drag) {
        p.vx -= p.vx * drag * dt;
        p.vy -= p.vy * drag * dt;
      }
      p.x += p.vx * dt + (p.sway ? Math.sin(p.t * p.swaySpeed + p.phase) * p.sway * dt : 0);
      p.y += p.vy * dt;
      if (p.vr) p.rot += p.vr * dt;
      drawParticle(p);
      return true;
    });
    if (particles.length) {
      rafId = requestAnimationFrame(tick);
    } else {
      rafId = 0;
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    }
  }

  function drawParticle(p) {
    const progress = p.t / p.life;
    const fade = progress < 0.7 ? 1 : 1 - (progress - 0.7) / 0.3;
    const alpha = (p.alpha ?? 1) * fade;
    if (alpha <= 0) return;
    ctx.save();
    switch (p.type) {
      case "spark": {
        ctx.globalCompositeOperation = "lighter";
        const speed = Math.hypot(p.vx, p.vy) || 1;
        const len = Math.min(p.size * 4, speed * 0.05 * p.size);
        const nx = p.vx / speed;
        const ny = p.vy / speed;
        const grad = ctx.createLinearGradient(p.x - nx * len, p.y - ny * len, p.x, p.y);
        grad.addColorStop(0, rgba(p.color, 0));
        grad.addColorStop(1, rgba(p.color, alpha));
        ctx.strokeStyle = grad;
        ctx.lineWidth = Math.max(1, p.size * (1 - progress * 0.6));
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(p.x - nx * len, p.y - ny * len);
        ctx.lineTo(p.x, p.y);
        ctx.stroke();
        break;
      }
      case "dot": {
        ctx.globalCompositeOperation = "lighter";
        const radius = p.size * (1 - progress * 0.5);
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
        grad.addColorStop(0, rgba(p.bright || p.color, alpha));
        grad.addColorStop(0.45, rgba(p.color, alpha * 0.85));
        grad.addColorStop(1, rgba(p.color, 0));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
      case "shard": {
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const w = p.size;
        const h = p.size * 0.62;
        const grad = ctx.createLinearGradient(-w / 2, 0, w / 2, 0);
        grad.addColorStop(0, rgba(p.color, alpha));
        grad.addColorStop(1, rgba(p.edge || "#0c0f15", alpha));
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.moveTo(-w / 2, 0);
        ctx.lineTo(0, -h / 2);
        ctx.lineTo(w / 2, 0);
        ctx.lineTo(0, h / 2);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case "confetti": {
        ctx.globalAlpha = alpha;
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        const flutter = Math.abs(Math.sin(p.t * p.swaySpeed + p.phase));
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, (-p.size * 0.6 * flutter) / 2, p.size, Math.max(1.4, p.size * 0.6 * flutter));
        break;
      }
      default:
        break;
    }
    ctx.restore();
  }

  /* ---------- エミッター ---------- */

  function burst(x, y, { color = "#f6c85f", count = 22, power = 1, spread = Math.PI * 2, baseAngle = 0 } = {}) {
    if (!enabled()) return;
    ensureLayers();
    for (let i = 0; i < count; i += 1) {
      const angle = baseAngle + (spread === Math.PI * 2 ? rand(0, Math.PI * 2) : rand(-spread / 2, spread / 2));
      const speed = rand(140, 420) * power;
      spawn({
        type: Math.random() < 0.7 ? "spark" : "dot",
        x, y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        g: 320,
        drag: 2.4,
        life: rand(0.32, 0.62),
        t: 0,
        size: rand(1.6, 3.4) * power,
        color,
        bright: lighten(color, 0.7),
      });
    }
  }

  function shards(x, y, { color = "#f6c85f", count = 16, power = 1 } = {}) {
    if (!enabled()) return;
    ensureLayers();
    for (let i = 0; i < count; i += 1) {
      const angle = rand(-Math.PI, 0) + rand(-0.4, 0.4);
      const speed = rand(90, 300) * power;
      spawn({
        type: "shard",
        x: x + rand(-18, 18),
        y: y + rand(-24, 24),
        vx: Math.cos(angle) * speed * rand(0.4, 1),
        vy: Math.sin(angle) * speed,
        g: 760,
        drag: 0.6,
        life: rand(0.55, 0.95),
        t: 0,
        size: rand(5, 13),
        color,
        rot: rand(0, Math.PI * 2),
        vr: rand(-9, 9),
      });
    }
  }

  function motes(el, { color = "#73d88a", count = 12 } = {}) {
    if (!enabled() || !el?.isConnected) return;
    ensureLayers();
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < count; i += 1) {
      spawn({
        type: "dot",
        x: rand(rect.left + 6, rect.right - 6),
        y: rand(rect.top + rect.height * 0.3, rect.bottom),
        vx: 0,
        vy: rand(-70, -30),
        drag: 0.4,
        sway: rand(18, 42),
        swaySpeed: rand(3, 6),
        phase: rand(0, Math.PI * 2),
        life: rand(0.7, 1.2),
        t: 0,
        size: rand(2.4, 5),
        color,
        bright: lighten(color, 0.75),
        alpha: 0.9,
      });
    }
  }

  function confettiRain() {
    if (!enabled()) return;
    ensureLayers();
    const colors = ["#f6c85f", "#ff5f57", "#58a6ff", "#73d88a", "#f6f2e9", "#c89cff"];
    for (let wave = 0; wave < 3; wave += 1) {
      setTimeout(() => {
        for (let i = 0; i < 46; i += 1) {
          spawn({
            type: "confetti",
            x: rand(0, window.innerWidth),
            y: rand(-60, -10),
            vx: rand(-40, 40),
            vy: rand(120, 260),
            g: 60,
            sway: rand(30, 70),
            swaySpeed: rand(2, 5),
            phase: rand(0, Math.PI * 2),
            life: rand(1.6, 2.6),
            t: 0,
            size: rand(6, 11),
            color: pick(colors),
            rot: rand(0, Math.PI * 2),
            vr: rand(-7, 7),
          });
        }
      }, wave * 320);
    }
  }

  function emberFall() {
    if (!enabled()) return;
    ensureLayers();
    for (let i = 0; i < 36; i += 1) {
      spawn({
        type: "dot",
        x: rand(0, window.innerWidth),
        y: rand(window.innerHeight * 0.1, window.innerHeight),
        vx: rand(-14, 14),
        vy: rand(-46, -16),
        sway: rand(14, 34),
        swaySpeed: rand(1.4, 3),
        phase: rand(0, Math.PI * 2),
        life: rand(1.4, 2.4),
        t: 0,
        size: rand(1.6, 3.6),
        color: "#ff7a5c",
        bright: "#ffd2a8",
        alpha: 0.62,
      });
    }
  }

  /* ---------- DOMエフェクト ---------- */

  function shockwave(x, y, { color = "#f6c85f", size = 150, duration = 460 } = {}) {
    if (!enabled()) return;
    ensureLayers();
    const ring = document.createElement("div");
    ring.className = "fx-shockwave";
    ring.style.setProperty("--fx-color", color);
    ring.style.setProperty("--fx-size", `${size}px`);
    ring.style.setProperty("--fx-duration", `${duration}ms`);
    ring.style.left = `${x}px`;
    ring.style.top = `${y}px`;
    domLayer.appendChild(ring);
    setTimeout(() => ring.remove(), duration + 80);
  }

  function slash(x, y, { color = "#f6c85f", angle = -32, length = 170 } = {}) {
    if (!enabled()) return;
    ensureLayers();
    const blade = document.createElement("div");
    blade.className = "fx-slash";
    blade.style.setProperty("--fx-color", color);
    blade.style.setProperty("--fx-length", `${length}px`);
    blade.style.left = `${x}px`;
    blade.style.top = `${y}px`;
    blade.style.setProperty("--fx-angle", `${angle}deg`);
    domLayer.appendChild(blade);
    setTimeout(() => blade.remove(), 420);
  }

  function flashAt(x, y, { color = "#ffffff", size = 90 } = {}) {
    if (!enabled()) return;
    ensureLayers();
    const flash = document.createElement("div");
    flash.className = "fx-impact-flash";
    flash.style.setProperty("--fx-color", color);
    flash.style.setProperty("--fx-size", `${size}px`);
    flash.style.left = `${x}px`;
    flash.style.top = `${y}px`;
    domLayer.appendChild(flash);
    setTimeout(() => flash.remove(), 360);
  }

  function shake(power = 1) {
    if (!enabled()) return;
    const target = document.querySelector(SHAKE_TARGET_SELECTOR);
    if (!target) return;
    const amplitude = 3 + power * 3.4;
    const steps = 7;
    const frames = [{ transform: "translate(0, 0)" }];
    for (let i = 1; i < steps; i += 1) {
      const decay = 1 - i / steps;
      frames.push({
        transform: `translate(${rand(-amplitude, amplitude) * decay}px, ${rand(-amplitude * 0.7, amplitude * 0.7) * decay}px)`,
      });
    }
    frames.push({ transform: "translate(0, 0)" });
    target.animate(frames, { duration: 220 + power * 90, easing: "linear" });
  }

  function vignetteFlash(kind = "damage") {
    if (!enabled()) return;
    ensureLayers();
    vignetteEl.classList.remove("is-damage", "is-heal", "is-gold");
    void vignetteEl.offsetWidth;
    vignetteEl.classList.add(`is-${kind}`);
    setTimeout(() => vignetteEl.classList.remove(`is-${kind}`), 540);
  }

  function hitStop(ms = 90) {
    return sleep(enabled() ? ms : 0);
  }

  /* ---------- 複合エフェクト ---------- */

  function impact(x, y, { color = "#f6c85f", power = 1, angle } = {}) {
    if (!enabled()) return;
    const slashAngle = angle ?? rand(-46, -18);
    flashAt(x, y, { color: lighten(color, 0.82), size: 60 + power * 36 });
    slash(x, y, { color, angle: slashAngle, length: 120 + power * 46 });
    if (power >= 2) slash(x, y, { color: lighten(color, 0.5), angle: slashAngle + rand(56, 84), length: 90 + power * 34 });
    shockwave(x, y, { color, size: 110 + power * 56 });
    burst(x, y, { color, count: 12 + power * 10, power: 0.7 + power * 0.4 });
    shake(power);
  }

  function guardFlash(x, y, color = "#58a6ff") {
    if (!enabled()) return;
    shockwave(x, y, { color, size: 96, duration: 380 });
    burst(x, y, { color, count: 10, power: 0.55 });
  }

  function counterFlash(x, y) {
    if (!enabled()) return;
    const color = "#c89cff";
    flashAt(x, y, { color, size: 110 });
    shockwave(x, y, { color, size: 150, duration: 520 });
    burst(x, y, { color, count: 26, power: 1.1 });
    shake(2);
  }

  function summonAt(el, color = "#f6c85f") {
    if (!enabled() || !el?.isConnected) return;
    const { x, y } = centerOf(el);
    shockwave(x, y, { color, size: 130, duration: 520 });
    motes(el, { color: lighten(color, 0.35), count: 10 });
  }

  function healAt(el) {
    motes(el, { color: "#73d88a", count: 12 });
  }

  function lpHit(isPlayer, amount = 1) {
    if (!enabled()) return;
    if (isPlayer) {
      vignetteFlash("damage");
      shake(Math.min(3, 1 + amount / 4));
    } else {
      shake(amount >= 5 ? 2 : 1);
    }
  }

  /* ---------- 突進アタック ---------- */

  async function animateTo(el, frames, options) {
    const animation = el.animate(frames, options);
    try {
      await animation.finished;
    } catch {
      /* キャンセル時は無視 */
    }
    return animation;
  }

  async function attackRush(attackerEl, targetEl, { color = "#f6c85f", power = 1 } = {}) {
    if (!attackerEl?.isConnected || !targetEl?.isConnected) return null;
    if (!enabled()) {
      await sleep(140);
      const t = centerOf(targetEl);
      return { x: t.x, y: t.y, angle: 0 };
    }
    ensureLayers();
    const a = centerOf(attackerEl);
    const t = centerOf(targetEl);
    const dx = t.x - a.x;
    const dy = t.y - a.y;
    const dist = Math.hypot(dx, dy) || 1;
    const ux = dx / dist;
    const uy = dy / dist;
    const reach = Math.max(0, dist - Math.min(44, dist * 0.24));
    const tilt = Math.max(-7, Math.min(7, ux * 9));

    attackerEl.classList.add("fx-attacking");

    await animateTo(attackerEl, [
      { transform: "translate(0, 0) scale(1)", filter: "brightness(1)" },
      {
        transform: `translate(${-ux * 16}px, ${-uy * 16}px) scale(1.08) rotate(${-tilt * 0.6}deg)`,
        filter: `brightness(1.12) drop-shadow(0 0 14px ${rgba(color, 0.55)})`,
      },
    ], { duration: 180, easing: "cubic-bezier(0.3, 0.7, 0.4, 1)", fill: "forwards" });

    if (!attackerEl.isConnected) return { x: t.x, y: t.y, angle: Math.atan2(dy, dx) * (180 / Math.PI) };

    await animateTo(attackerEl, [
      {
        transform: `translate(${-ux * 16}px, ${-uy * 16}px) scale(1.08) rotate(${-tilt * 0.6}deg)`,
        filter: `brightness(1.12) drop-shadow(0 0 14px ${rgba(color, 0.55)})`,
      },
      {
        transform: `translate(${ux * reach}px, ${uy * reach}px) scale(1.05) rotate(${tilt}deg)`,
        filter: `brightness(1.2) drop-shadow(0 0 18px ${rgba(color, 0.65)})`,
      },
    ], { duration: Math.max(100, Math.min(190, dist * 0.34)), easing: "cubic-bezier(0.62, 0, 0.92, 0.62)", fill: "forwards" });

    const impactPoint = {
      x: t.x - ux * 12,
      y: t.y - uy * 12,
      angle: Math.atan2(dy, dx) * (180 / Math.PI),
    };

    (async () => {
      await sleep(95 + power * 30);
      if (!attackerEl.isConnected) return;
      await animateTo(attackerEl, [
        { transform: `translate(${ux * reach}px, ${uy * reach}px) scale(1.05) rotate(${tilt}deg)` },
        { transform: `translate(${ux * reach * 0.86}px, ${uy * reach * 0.86}px) scale(1.02) rotate(${tilt * 0.5}deg)`, offset: 0.22 },
        { transform: "translate(0, 0) scale(1) rotate(0deg)" },
      ], { duration: 300, easing: "cubic-bezier(0.2, 0.85, 0.3, 1)", fill: "forwards" });
      if (!attackerEl.isConnected) return;
      attackerEl.getAnimations().forEach((animation) => animation.cancel());
      attackerEl.classList.remove("fx-attacking");
    })();

    return impactPoint;
  }

  /* ---------- カード破壊 ---------- */

  function dissolveCard(el, color = "#f6c85f") {
    if (!el?.isConnected) return;
    if (!enabled()) return;
    ensureLayers();
    const rect = el.getBoundingClientRect();
    const clone = el.cloneNode(true);
    clone.classList.add("fx-card-death");
    clone.classList.remove("fx-attacking", "selected", "targetable");
    clone.style.cssText += `;position: fixed; left: ${rect.left}px; top: ${rect.top}px; width: ${rect.width}px; height: ${rect.height}px; margin: 0; z-index: 4;`;
    clone.style.setProperty("--fx-color", color);
    domLayer.appendChild(clone);
    el.style.visibility = "hidden";
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    flashAt(cx, cy, { color: lighten(color, 0.6), size: Math.max(rect.width, 90) });
    setTimeout(() => {
      shards(cx, cy, { color, count: 16, power: 1 });
      burst(cx, cy, { color, count: 14, power: 0.8 });
    }, 140);
    setTimeout(() => clone.remove(), 700);
  }

  /* ---------- バナー / カットイン ---------- */

  async function banner(text, { sub = "", theme = "player", duration = 1050 } = {}) {
    ensureLayers();
    const node = document.createElement("div");
    node.className = `fx-banner is-${theme}`;
    node.innerHTML = `
      <div class="fx-banner-band"></div>
      <div class="fx-banner-inner">
        <span class="fx-banner-text">${text}</span>
        ${sub ? `<span class="fx-banner-sub">${sub}</span>` : ""}
      </div>
    `;
    bannerLayer.appendChild(node);
    await sleep(enabled() ? duration : 420);
    node.classList.add("is-leaving");
    await sleep(240);
    node.remove();
  }

  function turnBanner(isPlayer) {
    return banner(isPlayer ? "YOUR TURN" : "ENEMY TURN", {
      sub: isPlayer ? "あなたのターン" : "相手のターン",
      theme: isPlayer ? "player" : "enemy",
      duration: 940,
    });
  }

  function phaseBanner(text, theme = "player") {
    return banner(text, { sub: "バトルフェイズ", theme, duration: 880 });
  }

  async function cutInCard(card, label, { color = "#f6c85f", hold = 1150 } = {}) {
    ensureLayers();
    const node = document.createElement("div");
    node.className = "fx-cutin";
    node.style.setProperty("--fx-color", color);
    const art = `assets/cards/${card.id}.png`;
    node.innerHTML = `
      <div class="fx-cutin-bg"></div>
      <div class="fx-cutin-panel">
        <div class="fx-cutin-art" style="background-image: url('${art}')"></div>
        <div class="fx-cutin-copy">
          <span class="fx-cutin-label">${label}</span>
          <span class="fx-cutin-name">${card.name}</span>
          <span class="fx-cutin-skill">${card.skill || ""}</span>
        </div>
      </div>
    `;
    bannerLayer.appendChild(node);
    if (enabled()) {
      setTimeout(() => {
        const rect = node.querySelector(".fx-cutin-panel")?.getBoundingClientRect();
        if (rect) burst(rect.left + rect.width * 0.32, rect.top + rect.height / 2, { color, count: 18, power: 1 });
      }, 360);
    }
    await sleep(enabled() ? hold : 480);
    node.classList.add("is-leaving");
    await sleep(260);
    node.remove();
  }

  /* ---------- 勝敗演出 ---------- */

  async function gameResult(playerWon) {
    ensureLayers();
    const node = document.createElement("div");
    node.className = `fx-result ${playerWon ? "is-win" : "is-lose"}`;
    node.innerHTML = `
      <div class="fx-result-dim"></div>
      <div class="fx-result-rays"></div>
      <div class="fx-result-copy">
        <span class="fx-result-text">${playerWon ? "VICTORY" : "DEFEAT"}</span>
        <span class="fx-result-sub">${playerWon ? "勝利" : "敗北"}</span>
      </div>
    `;
    resultLayer.appendChild(node);
    if (enabled()) {
      setTimeout(() => {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        if (playerWon) {
          shockwave(x, y, { color: "#f6c85f", size: Math.min(window.innerWidth, 560), duration: 640 });
          burst(x, y, { color: "#f6c85f", count: 36, power: 1.6 });
          shake(2.4);
          confettiRain();
        } else {
          shake(1.4);
          emberFall();
        }
      }, 340);
    }
    await sleep(enabled() ? 2350 : 900);
    node.classList.add("is-leaving");
    await sleep(340);
    node.remove();
  }

  return {
    enabled,
    centerOf,
    burst,
    shards,
    motes,
    shockwave,
    slash,
    shake,
    hitStop,
    vignetteFlash,
    impact,
    guardFlash,
    counterFlash,
    summonAt,
    healAt,
    lpHit,
    attackRush,
    dissolveCard,
    banner,
    turnBanner,
    phaseBanner,
    cutInCard,
    gameResult,
  };
})();

window.FX = FX;
