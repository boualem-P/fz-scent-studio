

## Plan: Replace Index.tsx with Discovery Journey UI

Replace the entire content of `src/pages/Index.tsx` with the provided code, which replaces the current multi-screen perfume app with a two-step discovery flow:

1. **Swipe step** — Tinder-style card swiping on 3 test perfumes with framer-motion drag gestures
2. **Context step** — Atmosphere selection grid (Soirée, Rendez-vous, Business, Quotidien)
3. **Constellation background** — Ambient radial gradient + dot pattern

This will remove all existing screen navigation (landing, pyramid, analyzing, results, catalogue, perfume page overlay) and replace it with this standalone discovery UI using hardcoded test data.

### Impact
- The app's entire navigation flow will be replaced
- Components like `LandingScreen`, `PyramidScreen`, `ResultsScreen`, `CatalogueScreen`, `PerfumePage`, etc. will no longer be rendered (but files remain)
- No dependency changes needed — `framer-motion` and `lucide-react` are already installed

### Single file change
- **`src/pages/Index.tsx`** — Full replacement with the provided code

