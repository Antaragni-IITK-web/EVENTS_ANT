# Antaragni '26 — Cinema Image Generation Pack

Generate **16 images**, drop them into `public/cinema/` with the **exact
filenames** below, and the site picks them up automatically — no code changes.
Until a file exists, that section gracefully falls back to tinted atmosphere.

## Rules for every image

- **Aspect ratio: 16:9, minimum 2560×1440** (landscape). Export as JPG, quality ~80.
- **No clearly visible faces.** Silhouettes, back-of-head, motion blur, or
  figures small in frame. The performance is the hero, not the person.
- **No text, no logos, no watermarks** anywhere in the image.
- The site applies its own color grade on top (dark crush + warm duotone +
  vignette + grain), so favor **dark, moody, high-contrast** source images —
  bright daylight images will fight the grade.

## Shared style block

Append this to EVERY prompt below:

> Cinematic concert photography, shot on 35mm film, dark moody atmosphere,
> deep warm charcoal shadows, ember-orange and crimson stage lighting with
> hints of violet, volumetric haze and smoke, dramatic backlight rim lighting,
> silhouettes only — no visible faces, high contrast, film grain, slight
> motion blur, professional music-festival photography, night scene,
> no text, no watermark. Indian college cultural festival energy.

---

## The 16 images

### Landing heroes (2)

**1. `events-hero.jpg`** — Events page hero
> Massive outdoor festival main stage at night seen from within the crowd,
> a sea of raised silhouetted hands, blinding ember-orange and violet
> stage lights cutting through smoke, confetti suspended in the beams,
> wide low-angle shot.

**2. `roadtrips-hero.jpg`** — Roadtrips page hero
> A tour bus and stage rig silhouetted against a burning dusk sky on an
> open Indian highway, road stretching to the horizon, warm crimson and
> amber light, dust in the air, sense of a music tour rolling into a city.

### Stage/category images (7) — also used on every event detail hero

**3. `cat-performing.jpg`** — Performing Arts (dance/music/drama)
> A dancer mid-leap in full silhouette on a smoky stage, single hard
> ember-orange spotlight from behind, motion trails in the haze, dramatic
> negative space.

**4. `cat-literary.jpg`** — Literary Arena (debate/quiz/poetry)
> A lone vintage microphone on a stand in a pool of warm golden spotlight
> on a dark stage, floating dust particles, rows of empty seats fading
> into darkness behind.

**5. `cat-media.jpg`** — Media District (film/photography)
> A film camera operator in silhouette against a wall of warm stage light
> and smoke, lens flare, bokeh of distant festival lights, cinematic
> backstage feeling.

**6. `cat-visual.jpg`** — Visual District (fine arts)
> Hands throwing vivid paint powder into dark air lit by warm side light,
> pigment clouds of crimson, amber and violet frozen mid-burst against
> deep charcoal darkness.

**7. `cat-personality.jpg`** — Spotlight Stage (Mr & Ms Antaragni)
> A single figure in silhouette standing centre-stage under one massive
> white-gold spotlight cone, smoke swirling in the beam, vast dark arena
> around them.

**8. `cat-fashion.jpg`** — The Runway
> A fashion runway at night shot from low angle, model in full silhouette
> mid-stride, dramatic crimson and violet backlight, glossy reflective
> floor, camera flashes as bokeh in the dark.

**9. `cat-special.jpg`** — After Dark Zone (anime/special events)
> A crowd of silhouetted figures under swirling neon-pink and violet
> lasers and smoke at a night event, Japanese paper lanterns glowing warm
> amber in the distance, playful chaotic energy.

### Roadtrip campaign images (6) — one per battle

**10. `trip-battleunderground.jpg`** — rap + beatbox battles landing
> An underground rap battle in a raw concrete basement, two figures in
> silhouette facing off with microphones, ring of silhouetted crowd, one
> bare hanging tungsten bulb, graffiti barely visible in warm shadow.

**11. `trip-bug-rap.jpg`** — Rap battle page
> Close crop of a hand gripping a microphone thrust into warm smoky air,
> crowd silhouettes below, aggressive crimson-orange backlight, sweat and
> haze glowing in the beam.

**12. `trip-bug-beatboxing.jpg`** — Beatboxing page
> A beatboxer in profile silhouette, hands cupped around a mic, massive
> speaker stacks behind, visible sound-pressure haze, deep red and amber
> club lighting.

**13. `trip-synchro.jpg`** — Battle of Bands
> An electric guitarist in silhouette mid-power-chord on stage, hair and
> jacket backlit by violet and electric-blue beams cutting through smoke,
> drum kit silhouette behind, festival crowd below.

**14. `trip-comickaun.jpg`** — Stand-up comedy
> A classic stand-up comedy stage: single stool and microphone stand in a
> warm golden spotlight, red velvet curtain in deep shadow behind, smoky
> intimate club atmosphere, empty pool of light waiting for the comic.

**15. `trip-djwar.jpg`** — DJ war
> A DJ in silhouette behind decks with hands raised, massive LED glow and
> ember-orange strobes behind, dense crowd silhouettes with raised hands,
> smoke machine haze, festival night.

**16. `trip-junoon.jpg`** — Rock night (also used for Nationals via fallback)
> A rock vocalist in full silhouette leaping off a drum riser mid-scream,
> pyrotechnic sparks raining behind, crimson and amber inferno lighting,
> raw concert chaos.

### Bonus (1)

**17. `home-crowd.jpg`** — Home "wall of legends" section *(counts in the 16 above? No — this is #16+1; generate it too)*
> An enormous festival crowd at night from above and behind, thousands of
> silhouetted heads and raised phone lights like embers, the stage a
> distant furnace of orange-violet light, haze over everything.

*(and optionally `trip-nationals.jpg`: a colossal stadium stage finale with
fireworks and confetti cannons, crowd silhouettes, gold and crimson light —
if you don't generate it, the Nationals page just shows tinted atmosphere.)*

---

## Checklist after generating

1. Rename files to the EXACT names above (lowercase, hyphens).
2. Drop all of them into: `apps/events-registration/public/cinema/`
3. Hard-refresh the site — heroes, stage zones, and detail pages light up.
