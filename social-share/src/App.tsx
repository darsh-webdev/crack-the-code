/*
  Problem Statement: Build a Social Share component in React that displays a
  series of social media share buttons along with a copy link feature. Each social
  media button opens a social platform sharing dialogs in popup windows. Also include
  a copy-to-clipboard functionality for direct link sharing.
*/

import { useState } from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaWhatsapp,
  FaTelegramPlane,
  FaRedditAlien,
  FaEnvelope,
  FaLink,
} from "react-icons/fa";
import "./App.css";

function App() {
  // Keep raw URL for display/copy. Create encoded values separately.
  const rawUrl = typeof window !== "undefined" ? window.location.href : "";
  const [copied, setCopied] = useState(false);

  const pageUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent("Check this out!");

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`,
    whatsapp: `https://wa.me/?text=${shareText}%20${pageUrl}`,
    telegram: `https://t.me/share/url?url=${pageUrl}&text=${shareText}`,
    reddit: `https://www.reddit.com/submit?url=${pageUrl}&title=${shareText}`,
    email: `mailto:?subject=${shareText}&body=${pageUrl}`,
  };

  // Opens popup window 600x400 centered
  const openSharePopup = (url: string) => {
    const width = 600;
    const height = 400;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;
    const features = `popup=yes,toolbar=0,scrollbars=1,location=0,statusbar=0,menubar=0,resizable=1,width=${width},height=${height},left=${left},top=${top}`;
    window.open(url, "_blank", features);
  };

  // Button click handlers
  const onShare =
    (platform: keyof typeof shareUrls) => (e: React.MouseEvent) => {
      e.preventDefault();
      const url = shareUrls[platform];
      if (url) openSharePopup(url);
    };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(rawUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div>
      <h1>Social Share</h1>
      <div className="social-share">
        <div className="buttons">
          <button
            className="social-btn linkedin"
            aria-label="LinkedIn"
            onClick={onShare("linkedin")}
          >
            <FaLinkedinIn />
          </button>
          <button
            className="social-btn telegram"
            aria-label="Telegram"
            onClick={onShare("telegram")}
          >
            <FaTelegramPlane />
          </button>
          <button
            className="social-btn reddit"
            aria-label="Reddit"
            onClick={onShare("reddit")}
          >
            <FaRedditAlien />
          </button>
          <button
            className="social-btn email"
            aria-label="Email"
            onClick={onShare("email")}
          >
            <FaEnvelope />
          </button>
          <button
            className="social-btn facebook"
            aria-label="Facebook"
            onClick={onShare("facebook")}
          >
            <FaFacebookF />
          </button>
          <button
            className="social-btn whatsapp"
            aria-label="WhatsApp"
            onClick={onShare("whatsapp")}
          >
            <FaWhatsapp />
          </button>
        </div>

        <div className="copy-link-container">
          <p className="copy-label">Or copy link:</p>
          <div className="copy-link-box">
            <FaLink className="link-icon" />
            <input type="text" value={rawUrl} readOnly />
            <button onClick={handleCopy}>
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
