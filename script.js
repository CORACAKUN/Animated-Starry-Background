const starField = document.getElementById("stars");
const starCamera = document.createElement("div");
const starWorld = document.createElement("div");
const starColors = ["#dfe9ff", "#ffffff", "#ffe7b8", "#b8d8ff", "#ffd4f0"];
// Adjust this value to increase or decrease the size of the star world (higher is larger || lower is smaller)
const worldScale = 2.8;
// Adjust this value to speed up or slow down the camera movement (higher is faster || lower is slower)
const CAMERA_SPEED = 1.65;
// Adjust this value to zoom the entire scene in or out like browser page zoom
const SCENE_ZOOM = 0.50;
const STAR_DENSITY_DIVISOR = 14000;
const MIN_TINY_STARS = 450;
const MAX_TINY_STARS = 1600;
const MIN_BRIGHT_STARS = 18;
const MAX_BRIGHT_STARS = 180;
const RESIZE_DEBOUNCE_MS = 160;
let viewportWidth = window.innerWidth;
let viewportHeight = window.innerHeight;
let worldWidth = (viewportWidth / SCENE_ZOOM) * worldScale;
let worldHeight = (viewportHeight / SCENE_ZOOM) * worldScale;
let resizeTimer;

starCamera.className = "star-camera";
starWorld.className = "star-world";
starCamera.appendChild(starWorld);
starField.appendChild(starCamera);

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
    worldWidth = (viewportWidth / SCENE_ZOOM) * worldScale;
    worldHeight = (viewportHeight / SCENE_ZOOM) * worldScale;

    const area = worldWidth * worldHeight;
    const tinyCount = Math.min(
        MAX_TINY_STARS,
        Math.max(MIN_TINY_STARS, Math.floor(area / STAR_DENSITY_DIVISOR))
    );
    const brightCount = Math.min(
        MAX_BRIGHT_STARS,
        Math.max(MIN_BRIGHT_STARS, Math.floor(tinyCount * 0.12))
    );
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
    const scaledWorldWidth = worldWidth * SCENE_ZOOM;
    const scaledWorldHeight = worldHeight * SCENE_ZOOM;
    const availableDriftX = Math.max(0, scaledWorldWidth - viewportWidth);
    const availableDriftY = Math.max(0, scaledWorldHeight - viewportHeight);
    const horizontalRange = availableDriftX * 0.32;
    const verticalRange = availableDriftY * 0.22;
    const startX = horizontalRange;
    const startY = verticalRange * 0.45;
    const midX = 0;
    const midY = -verticalRange * 0.2;
    const endX = -horizontalRange;
    const endY = -verticalRange;
    const baseDuration = Math.max(180, Math.round(Math.max(viewportWidth, viewportHeight) / 5));
    const duration = (baseDuration / CAMERA_SPEED).toFixed(2);

    starCamera.style.setProperty("--drift-start-x", `${startX.toFixed(2)}px`);
    starCamera.style.setProperty("--drift-start-y", `${startY.toFixed(2)}px`);
    starCamera.style.setProperty("--drift-mid-x", `${midX.toFixed(2)}px`);
    starCamera.style.setProperty("--drift-mid-y", `${midY.toFixed(2)}px`);
    starCamera.style.setProperty("--drift-end-x", `${endX.toFixed(2)}px`);
    starCamera.style.setProperty("--drift-end-y", `${endY.toFixed(2)}px`);
    starCamera.style.setProperty("--camera-duration", `${duration}s`);
    starWorld.style.setProperty("--scene-zoom", SCENE_ZOOM.toFixed(3));
    starCamera.style.animation = "none";
    void starCamera.offsetWidth;
    starCamera.style.animation = "";
}

function handleResize() {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(generateStars, RESIZE_DEBOUNCE_MS);
}

function updateAnimationState() {
    const shouldPause = document.hidden || !document.hasFocus();
    starCamera.style.animationPlayState = shouldPause ? "paused" : "running";
}

window.addEventListener("resize", handleResize);
window.addEventListener("blur", updateAnimationState);
window.addEventListener("focus", updateAnimationState);
document.addEventListener("visibilitychange", updateAnimationState);

generateStars();
updateAnimationState();
