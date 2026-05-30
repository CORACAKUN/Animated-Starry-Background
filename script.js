const starField = document.getElementById("stars");
const starWorld = document.createElement("div");
const starColors = ["#dfe9ff", "#ffffff", "#ffe7b8", "#b8d8ff", "#ffd4f0"];
// Adjust this value to increase or decrease the size of the star world (higher is larger || lower is smaller)
const worldScale = 2.8;
// Adjust this value to speed up or slow down the camera movement (higher is faster || lower is slower)
const CAMERA_SPEED = 1.65;
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
let worldWidth = viewportWidth * worldScale;
let worldHeight = viewportHeight * worldScale;

starWorld.className = "star-world";
starField.appendChild(starWorld);

function randomBetween(min, max) {
    return Math.random() * (max - min) + min;
}

function createStar(type, maxX, maxY) {
    const star = document.createElement("span");
    const size = type === "bright" ? randomBetween(3, 7) : randomBetween(1, 2.6);
    const opacity = type === "bright" ? randomBetween(0.75, 1) : randomBetween(0.3, 0.9);
    const duration = type === "bright" ? randomBetween(2.8, 6) : randomBetween(4, 10);
    const delay = randomBetween(0, 5);
    const hueShift = `${randomBetween(10, 34)}deg`;
    const x = randomBetween(0, maxX);
    const y = randomBetween(0, maxY);

    star.className = `star ${type}`;
    star.style.left = `${x}px`;
    star.style.top = `${y}px`;
    star.style.setProperty("--size", `${size}px`);
    star.style.setProperty("--opacity", opacity.toFixed(2));
    star.style.setProperty("--twinkle-duration", `${duration.toFixed(2)}s`);
    star.style.setProperty("--delay", `${delay.toFixed(2)}s`);
    star.style.setProperty("--hue-shift", hueShift);

    if (type === "bright") {
        const glowColor = starColors[Math.floor(Math.random() * starColors.length)];
        star.style.setProperty("--glow-color", glowColor);
    }

    return star;
}

function generateStars() {
    viewportWidth = window.innerWidth;
    viewportHeight = window.innerHeight;
    worldWidth = viewportWidth * worldScale;
    worldHeight = viewportHeight * worldScale;

    const area = worldWidth * worldHeight;
    const tinyCount = Math.max(700, Math.floor(area / 9000));
    const brightCount = Math.max(20, Math.floor(tinyCount * 0.12));
    const fragment = document.createDocumentFragment();

    starWorld.innerHTML = "";
    starWorld.style.width = `${worldWidth}px`;
    starWorld.style.height = `${worldHeight}px`;

    for (let i = 0; i < tinyCount; i += 1) {
        fragment.appendChild(createStar("tiny", worldWidth, worldHeight));
    }

    for (let i = 0; i < brightCount; i += 1) {
        fragment.appendChild(createStar("bright", worldWidth, worldHeight));
    }

    starWorld.appendChild(fragment);
    configureCamera();
}

function configureCamera() {
    const maxOffsetX = Math.max(0, worldWidth - viewportWidth);
    const maxOffsetY = Math.max(0, worldHeight - viewportHeight);
    const marginX = maxOffsetX * 0.12;
    const marginY = maxOffsetY * 0.12;
    const startX = -marginX;
    const startY = -marginY;
    const midX = -(maxOffsetX * 0.42);
    const midY = -(maxOffsetY * 0.22);
    const endX = -(maxOffsetX - marginX);
    const endY = -(maxOffsetY * 0.4);
    const baseDuration = Math.max(180, Math.round(Math.max(viewportWidth, viewportHeight) / 5));
    const duration = (baseDuration / CAMERA_SPEED).toFixed(2);

    starWorld.style.setProperty("--drift-start-x", `${startX}px`);
    starWorld.style.setProperty("--drift-start-y", `${startY}px`);
    starWorld.style.setProperty("--drift-mid-x", `${midX}px`);
    starWorld.style.setProperty("--drift-mid-y", `${midY}px`);
    starWorld.style.setProperty("--drift-end-x", `${endX}px`);
    starWorld.style.setProperty("--drift-end-y", `${endY}px`);
    starWorld.style.setProperty("--camera-duration", `${duration}s`);
    starWorld.style.animation = "none";
    void starWorld.offsetWidth;
    starWorld.style.animation = "";
}

window.addEventListener("resize", generateStars);

generateStars();
