/* Target selection and reference artwork for C66–C72. Rules live in new-cards.js. */
const NEW_CHARACTER_ART_PATHS = Object.freeze({
  C66: "assets/characters/C66-card-v2.png",
  C67: "assets/characters/C67-card-v2.png",
  C68: "assets/characters/C68-card-v2.png",
  C69: "assets/characters/C69-card-v2.png",
  C70: "assets/characters/C70-card-v2.png",
  C71: "assets/characters/C71-card-v2.png",
  C72: "assets/characters/C72-card-v2.png",
});

let newCardUIBound = false;
let renderedNewCardChoice = null;
let newCardChoicePreviousFocus = null;

function renderNewCharacterArt(card) {
  const path = NEW_CHARACTER_ART_PATHS[card?.id];
  if (!path) return "";
  const role = ROLE_LABELS[card.role] || card.role || "";
  return `<div class="new-character-art" aria-hidden="true">
    <img class="new-character-reference" src="${path}" alt="" loading="lazy" draggable="false">
    <div class="new-character-art-shade"></div>
    <div class="new-character-art-label">
      <strong>${escapeHtml(card.name || "")}</strong>
      <span>${escapeHtml(card.skill || "")} / ${escapeHtml(role)}</span>
    </div>
  </div>`;
}

function newCardChoicePreviewPath(card) {
  if (NEW_CHARACTER_ART_PATHS[card?.id]) return NEW_CHARACTER_ART_PATHS[card.id];
  // Only known local card identifiers can form an image path.
  if (/^(?:C|S)\d{2}$/.test(card?.id || "") && CARD_DB.has(card.id)) {
    return `assets/cards/${card.id}.png`;
  }
  return null;
}

function renderNewCardChoice() {
  const modal = document.querySelector("#newCardChoiceModal");
  if (!modal) return;
  const choice = typeof state === "undefined" ? null : state?.pendingCardChoice;
  if (!choice || choice.ownerKey !== "player") {
    const wasOpen = !modal.classList.contains("hidden");
    modal.classList.add("hidden");
    renderedNewCardChoice = null;
    document.querySelector("#newCardChoiceOptions")?.replaceChildren();
    if (wasOpen && newCardChoicePreviousFocus?.isConnected) {
      newCardChoicePreviousFocus.focus({ preventScroll: true });
    }
    newCardChoicePreviousFocus = null;
    return;
  }
  if (renderedNewCardChoice === choice && !modal.classList.contains("hidden")) return;

  const wasHidden = modal.classList.contains("hidden");
  if (wasHidden) newCardChoicePreviousFocus = document.activeElement;
  document.querySelector("#newCardChoiceTitle").textContent = choice.title || "対象を選択";
  document.querySelector("#newCardChoiceDescription").textContent = choice.description || "使用する対象を選んでください。";
  const options = document.querySelector("#newCardChoiceOptions");
  options.replaceChildren();
  (choice.options || []).forEach((option, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "new-card-choice-option";
    button.dataset.newCardChoiceIndex = String(index);

    const imagePath = newCardChoicePreviewPath(option.card);
    if (imagePath) {
      const art = document.createElement("span");
      art.className = "new-card-choice-portrait";
      art.dataset.cardId = option.card.id;
      const portrait = document.createElement("img");
      portrait.src = imagePath;
      portrait.alt = "";
      portrait.loading = "lazy";
      portrait.draggable = false;
      art.append(portrait);
      button.append(art);
    }

    const copy = document.createElement("span");
    copy.className = "new-card-choice-copy";
    const label = document.createElement("strong");
    label.textContent = option.label || option.card?.name || `対象 ${index + 1}`;
    copy.append(label);
    if (option.detail) {
      const detail = document.createElement("span");
      detail.textContent = option.detail;
      copy.append(detail);
    }
    button.append(copy);
    options.append(button);
  });
  renderedNewCardChoice = choice;
  modal.classList.remove("hidden");
  if (wasHidden) {
    (options.querySelector("button") || document.querySelector("#skipNewCardChoiceBtn"))?.focus({ preventScroll: true });
  }
}

function renderNewCardActions() {
  const panel = document.querySelector("#inspectPanel");
  if (!panel) return;
  let actions = document.querySelector("#newCardActions");
  if (!actions) {
    actions = document.createElement("div");
    actions.id = "newCardActions";
    panel.append(actions);
  }
  actions.replaceChildren();
  if (typeof state === "undefined" || !state?.selectedField || state.selectedHandIndex !== null) return;
  const selected = state.selectedField;
  if (selected.owner !== "player") return;
  const player = state.player;
  const card = player?.[selected.lane]?.[selected.index];
  if (card?.id !== "C72") return;

  const enabled = typeof canUseKanon === "function" && canUseKanon(card, player);
  const button = document.createElement("button");
  button.id = "useKanonCleanseBtn";
  button.type = "button";
  button.textContent = "祓いを使う · 1エネルギー";
  button.disabled = !enabled;
  button.setAttribute("aria-describedby", "kanonActionHint");
  button.addEventListener("click", () => {
    if (typeof canUseKanon === "function" && canUseKanon(card, player)) {
      requestKanonCleanse(card, player);
    }
  });
  const hint = document.createElement("p");
  hint.id = "kanonActionHint";
  hint.className = "new-card-action-hint";
  if (enabled) hint.textContent = "状態異常のある味方を選んで祓います。1ターンに1回使えます。";
  else if (state.current !== "player" || state.phase !== "main") hint.textContent = "自分のメインフェーズに使えます。";
  else if (card.status?.stun > 0 || card.status?.silenced > 0) hint.textContent = "カノンの行動不能・封印を解除すると使えます。";
  else if (player.energy < 1) hint.textContent = "使用には1エネルギーが必要です。";
  else hint.textContent = "祓える味方がいないか、このターンは使用済みです。";
  actions.append(button, hint);
}

function bindNewCardUI() {
  if (newCardUIBound) return;
  const modal = document.querySelector("#newCardChoiceModal");
  if (!modal) return;
  newCardUIBound = true;
  document.querySelector("#newCardChoiceOptions").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-new-card-choice-index]");
    if (!button || !modal.contains(button)) return;
    const index = Number(button.dataset.newCardChoiceIndex);
    if (Number.isInteger(index)) completeNewCardChoice(index);
  });
  document.querySelector("#skipNewCardChoiceBtn").addEventListener("click", () => completeNewCardChoice(null));
  modal.addEventListener("keydown", (event) => {
    if (modal.classList.contains("hidden")) return;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      completeNewCardChoice(null);
    } else if (event.key === "Tab") {
      const buttons = [...modal.querySelectorAll("button:not(:disabled)")];
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    }
  });
}

if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", bindNewCardUI);
else bindNewCardUI();
