import { useState } from "react";
import "./App.css";

// ✅ Provided Emoji Mapping
const emojiMap: Record<string, string> = {
  // Emotions
  happy: "😊",
  sad: "😢",
  love: "❤️",
  angry: "😠",
  surprised: "😲",
  laugh: "😂",
  cool: "😎",
  tired: "😴",
  excited: "🤩",
  bored: "🥱",
  scared: "😱",
  confused: "😕",
  wow: "😮",
  cry: "😭",
  nervous: "😬",
  calm: "😌",
  // Greetings
  hello: "👋",
  bye: "👋",
  goodnight: "🌙",
  night: "🌙",
  // Activities
  party: "🥳",
  dance: "💃",
  music: "🎵",
  sleep: "😴",
  work: "💼",
  study: "📚",
  // Weather & Nature
  sun: "☀️",
  rain: "🌧️",
  snow: "❄️",
  cloud: "☁️",
  fire: "🔥",
  tree: "🌳",
  flower: "🌸",
  // Food & Drink
  pizza: "🍕",
  burger: "🍔",
  coffee: "☕",
  cake: "🍰",
  apple: "🍎",
  beer: "🍺",
  // Animals
  dog: "🐶",
  cat: "🐱",
  bird: "🐦",
  fish: "🐟",
  horse: "🐴",
  // Objects & Symbols
  phone: "📱",
  laptop: "💻",
  heart: "❤️",
  star: "⭐",
  thumbs_up: "👍",
  thumbs_down: "👎",
  ok_hand: "👌",
  // Misc
  money: "💰",
  gift: "🎁",
  car: "🚗",
  bike: "🚲",
  airplane: "✈️",
  clock: "⏰",
};

function replaceWithEmojis(input: string) {
  // Replace whole words (case-insensitive) using the emojiMap
  // Return updated text with emojis
  const words = input.match(/[a-zA-Z]+|[^a-zA-Z\s]/g);
  if (!words) return input;
  return words
    .map((word) => {
      const lowerWord = word.toLowerCase();
      if (emojiMap[lowerWord]) {
        return emojiMap[lowerWord];
      }
      return word.trim();
    })
    .join(" ");
}

function App() {
  const [text, setText] = useState("");

  return (
    <div className="app-container">
      <h1>Emoji Replacer</h1>

      <textarea
        placeholder="Type words like 'happy', 'love', 'pizza'..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        data-testid="input-textarea"
        rows={6}
      />

      <div className="button-row">
        <button
          className="clear-btn"
          onClick={() => setText("")}
          data-testid="clear-button"
        >
          Clear Text
        </button>
      </div>

      <h2>Output:</h2>
      <div className="output-box" data-testid="output-box">
        {replaceWithEmojis(text)}
      </div>
    </div>
  );
}

export default App;
