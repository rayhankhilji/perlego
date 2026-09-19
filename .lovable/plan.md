# Book-style swipe experience

## Goal
Replace the central card on the Like/Pass step with a tactile open-book presentation that keeps each sample page easy to read and the decision gesture obvious.

## What will change
- Present every title as an open book: a slim information page on the left and the readable excerpt on the right, with a visible spine, stacked page edges, and restrained paper depth.
- Keep the existing left/right drag, keyboard arrows, progress, and Like/Pass buttons.
- During a drag, lift and curl the active page toward the swipe direction; on commitment, complete the page turn before revealing the next book. A short spring-back returns incomplete gestures to rest.
- Fade in icon-and-text Like/Pass feedback as the page moves, without covering the excerpt.
- Add a subtle first-book page-edge cue so the gesture is discoverable, then stop it after interaction.
- Respect reduced-motion preferences and keep button/keyboard operation equivalent to touch.

## Technical details
- Refactor `SwipeDeck` into a stable book shell plus animated page layers using CSS 3D transforms and pointer progress.
- Add semantic book-surface tokens and motion keyframes to the global design system rather than hardcoded visual colors.
- Preserve the existing verdict payload and completion behavior, so curation remains unchanged.
- Validate the swipe, button, and keyboard paths at desktop and mobile sizes, including reduced motion and text containment.
