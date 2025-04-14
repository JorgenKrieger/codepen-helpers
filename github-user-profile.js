export default class GitHubProfileLink {
  constructor(username, targetSelector = "body") {
    if (!username) throw new Error("Username is required");

    this.username = username;
    this.targetSelector = targetSelector;
    this.baseURL = "https://github.com/";
    this.avatarURL = `https://github.com/${this.username}.png`;

    this.inject();
  }

  createLinkElement() {
    const link = document.createElement("a");
    link.href = `${this.baseURL}${this.username}`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";

    Object.assign(link.style, {
      position: "fixed",
      bottom: "1rem", // bottom-4
      left: "1rem", // start-4 (assumes LTR)
      width: "3rem", // size-12 (48px)
      height: "3rem",
      boxShadow: "0 10px 15px rgba(0, 0, 0, 0.1)", // shadow-lg
      borderRadius: "9999px", // rounded-full
      overflow: "hidden",
      display: "inline-block",
      cursor: "pointer",
    });

    const img = document.createElement("img");
    img.src = this.avatarURL;
    img.alt = `${this.username}'s avatar`;

    Object.assign(img.style, {
      width: "100%",
      height: "100%",
      borderRadius: "9999px",
      transition: "transform 0.2s",
      objectFit: "cover",
      display: "block",
    });

    // Optional hover scale effect
    link.addEventListener("mouseenter", () => {
      img.style.transform = "scale(1.10)";
    });
    link.addEventListener("mouseleave", () => {
      img.style.transform = "scale(1)";
    });

    link.appendChild(img);
    return link;
  }

  inject() {
    const target = document.querySelector(this.targetSelector);
    const linkElement = this.createLinkElement();

    if (!target) {
      document.body.appendChild(linkElement);
    } else {
      target.appendChild(linkElement);
    }
  }
}
