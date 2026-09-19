# Smoother reader and compact checkout

## Build
- Replace the reader’s threshold-based page jump with a continuous, velocity-aware drag and wheel interaction. Pages will follow the gesture closely, settle gently, and respect reduced-motion settings.
- Remove the library screen from the journey. After account creation and the short preparation moment, continue directly to the plan screen.
- Recompose the plan screen into one viewport: pricing and its action on the left, vertically looping student reviews on the right, with condensed trust signals.
- Add an on-brand demo checkout after the plan action, followed by a payment-confirmed/unlocked state. This remains a prototype and will not process real payments.

## Technical details
- Keep the existing selected-plan state and local progress storage.
- Add checkout and unlocked states to the existing onboarding screen model.
- Make the plan and checkout layouts adapt to smaller screens without requiring the desktop page itself to scroll.
- Verify the reader gesture, screen sequence, plan selection, checkout submission, and confirmation state in the running preview.
