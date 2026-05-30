# Animated Background Stars

A lightweight animated starfield background built with plain HTML, CSS, and JavaScript. The scene fills the viewport with layered stars, soft glow effects, twinkle animation, and a slow drifting camera movement to create a space-like ambient background.

## Features

- Full-screen animated star background
- Randomly generated tiny and bright stars
- Twinkle animation with varied timing and opacity
- Colored glow accents on brighter stars
- Slow camera drift across a larger star world
- Responsive regeneration on window resize
- No dependencies or build step required

## Project Structure

```text
.
|-- index.html
|-- style.css
|-- script.js
`-- README.md
```

## How It Works

- `index.html` provides a minimal full-screen container for the starfield.
- `style.css` handles the visual styling, glow treatment, twinkle animation, and camera drift animation.
- `script.js` generates stars at random positions, sizes, and animation timings, then recalculates the scene when the viewport changes.

The script creates a larger off-screen "star world" than the visible viewport. Instead of moving individual stars, the whole star world drifts over time, which gives the effect of slow cinematic camera motion.

## Run Locally

Since this is a static project, you can open `index.html` directly in your browser.

If you prefer using a local server, for example with VS Code Live Server, that works as well.

## Customization

The main tuning values are in [`script.js`](./script.js):

- `worldScale`: Controls how large the generated star world is compared to the viewport. Higher values create a larger field for the camera to drift across.
- `CAMERA_SPEED`: Controls the speed of the drifting camera animation. Higher values make the movement faster.
- `SCENE_ZOOM`: Controls the overall scale of the entire scene. Higher values make everything appear larger, similar to browser zooming in. Lower values make the scene appear smaller.

You can also adjust:

- Star colors in the `starColors` array
- Bright and tiny star counts inside `generateStars()`
- Star sizes, opacity ranges, and twinkle durations inside `createStar()`
- Glow styling and animation behavior in [`style.css`](./style.css)

## Use Cases

- Portfolio backgrounds
- Landing page hero sections
- Splash screens
- Ambient visual backdrops for creative web projects

## Notes

- The page is intentionally minimal and currently renders only the animated background.
- `body` uses `overflow: hidden`, so the effect stays locked to the viewport.
- The document title is currently set to `Portfolio` in `index.html` and can be renamed to match your project.

## License
