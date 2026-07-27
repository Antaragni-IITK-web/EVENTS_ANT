# Antaragni '26 — Card Artwork Generation Pack (v2)

This pack replaces the vector art on **every card on the website** — landing
portals, event crate cards, roadtrip tour posters — plus regenerates the 3
wide backdrops that don't fit well.

## CRITICAL RULES (different from last time)

1. **ONE image per file. NO split panels, NO collages, NO side-by-side
   compositions.** Last batch had three 2-in-1 images; those had to be
   cropped apart and lost quality. Every prompt below = one single image.
2. **Cards are PORTRAIT: 3:4 aspect ratio, minimum 1536×2048.**
   (The 3 replacement backdrops at the end are 16:9, minimum 2560×1440.)
3. **No visible faces** — silhouettes, backs, hoods, motion blur, distance.
4. **No text, no logos, no watermarks.** If your generator stamps a watermark
   in a corner, generate at a larger size so we can crop it off.
5. Export JPG (or PNG), highest quality.

## SHARED STYLE BLOCK — append to EVERY prompt

> Cinematic concert photography, shot on 35mm film, dark moody atmosphere,
> warm charcoal shadows, ember-orange, molten-gold and crimson stage
> lighting, volumetric haze and smoke, dramatic backlight rim lighting,
> silhouettes only — no visible faces, high contrast, film grain,
> professional music-festival photography, night scene, no text, no
> watermark. Indian college cultural festival energy. Vertical portrait
> composition with the subject centered and breathing room at the bottom
> quarter of the frame.

*(The site overlays each card's title ribbon on the bottom ~20% — keep that
zone relatively simple/dark.)*

---

## A. EVENT CARDS — portrait 3:4 → `public/cards/<name>.jpg`

**1. `dance.jpg`** — Dance
> A single dancer frozen mid-spin in silhouette on a smoky stage, dress and
> motion trails swirling, one hard ember spotlight from behind.

**2. `musicals.jpg`** — Music
> A vintage microphone in extreme close-up against a wall of golden stage
> light and smoke, bokeh sparks drifting, deep warm shadows.

**3. `dramatics.jpg`** — Dramatics
> Two theatre masks (comedy and tragedy) hanging on a rope in front of a
> deep red velvet curtain, single spotlight, smoke curling through the beam.

**4. `debate.jpg`** — Debate
> A wooden podium with a bent microphone in a pool of hard golden light,
> vast dark auditorium behind, dust in the beam.

**5. `ele.jpg`** — English Literary
> An old typewriter on a dark desk, pages flying upward caught mid-air,
> lit by a warm amber desk lamp in surrounding darkness, smoke.

**6. `hle.jpg`** — Hindi Literary
> An ink pen and glass inkwell on dark wood, warm candlelight, loose
> handwritten pages curling at the edges (writing indistinct/blurred),
> deep crimson shadows.

**7. `quiz.jpg`** — Quiz
> A single glowing buzzer button on a dark tabletop, hand hovering above it
> in silhouette, dramatic overhead spotlight cone, smoke.

**8. `fnp.jpg`** — Films & Photography
> A film camera on a tripod in silhouette against orange festival haze,
> lens flare, strings of bokeh lights behind.

**9. `finearts.jpg`** — Fine Arts
> A hand in silhouette dragging a loaded paintbrush across a huge dark
> canvas, thick strokes of glowing ember-orange and crimson paint, paint
> drips catching warm light.

**10. `mnm.jpg`** — Mr & Ms Antaragni
> A gold crown on a dark pedestal under a single tight spotlight, smoke
> rolling across the floor, everything else in darkness.

**11. `ritambhara.jpg`** — Ritambhara (Fashion)
> A model in full silhouette mid-stride on a glossy runway, shot from
> straight ahead at floor level, crimson and gold backlight, reflections
> on the floor. FULL FIGURE visible, head to toe, centered.

**12. `anicon.jpg`** — Anime Convention
> A row of glowing paper lanterns and a katana silhouette against warm
> smoke, manga-style speed lines of light in the haze, amber and crimson.

## B. ROADTRIP CARDS — portrait 3:4 → `public/cards/<name>.jpg`

**13. `battleunderground.jpg`** — Battle Underground
> A microphone dropping on its cable, caught mid-fall, harsh bare tungsten
> bulb above, raw concrete and faint graffiti behind, aggressive shadows.

**14. `bug-rap.jpg`** — Rap Battle
> A fist gripping a microphone thrust straight up into smoky red-orange
> light, crowd silhouettes below, sweat and haze glowing.

**15. `bug-beatboxing.jpg`** — Beatboxing
> A beatboxer in profile silhouette, hands cupped around a mic, massive
> speaker stack towering behind, deep red club lighting, visible bass haze.

**16. `synchro.jpg`** — Synchronicity (Battle of Bands)
> An electric guitar held aloft by a silhouetted arm, strings catching
> gold light, smoke and stage beams radiating behind.

**17. `comickaun.jpg`** — ComicKaun (Stand-up)
> A wooden stool and a standing microphone in a single warm spotlight on a
> small stage, red curtain in shadow behind, intimate smoky club.

**18. `junoon.jpg`** — Junoon (Rock)
> A rock vocalist leaping in full silhouette, pyro sparks raining behind,
> crimson inferno lighting, raw energy.

**19. `djwar.jpg`** — DJ Wars
> A DJ silhouetted behind decks with one hand raised, ember-orange strobes
> and a wall of light behind, haze thick in the beams.

**20. `nationals.jpg`** — Nationals (Grand Finale)
> A gold trophy on a stage riser catching a beam of light, confetti
> suspended mid-air all around, massive dark stadium bokeh behind.

## C. PORTAL CARDS — portrait 3:4 → `public/cards/<name>.jpg`

**21. `events-portal.jpg`** — Events portal (home page)
> A festival main stage seen from within the crowd, raised silhouetted
> hands at the bottom, gold and ember light cones, confetti — vertical
> composition.

**22. `roadtrips-portal.jpg`** — Roadtrips portal (home page)
> A tour bus silhouette on an open highway at burning dusk, warm crimson
> sky, road vanishing to the horizon — vertical composition.

## D. REPLACEMENT BACKDROPS — 16:9 wide → `public/cinema/<name>.jpg`
*(these replace crops that currently don't fit — regenerate as proper wides)*

**23. `cat-fashion.jpg`** — The Runway zone + fashion event hero
> A fashion runway at night, WIDE shot from the side of the stage: model in
> full silhouette mid-stride visible head-to-toe, seated crowd silhouettes
> on both sides, crimson and gold backlight, glossy reflective floor.
> Landscape 16:9.

**24. `cat-visual.jpg`** — Visual District zone + fine-arts event hero
> Hands throwing vivid ember-orange, gold and crimson paint powder into
> dark air, WIDE landscape composition with the powder clouds spreading
> horizontally across the frame, warm side light, deep charcoal darkness.
> Landscape 16:9.

**25. `trip-comickaun.jpg`** — ComicKaun campaign hero
> A comedy club stage WIDE shot: stool and mic stand in a warm spotlight
> at center, red velvet curtain spanning the full width behind, empty
> intimate club in shadow, smoke in the light cone. Landscape 16:9.

---

## After generating

Drop everything in with these exact names:
- Cards → `apps/events-registration/public/cards/`
- The 3 wides → `apps/events-registration/public/cinema/` (overwrite)

Then hand them back to me — I'll do the watermark check/crop pass and wire
the card artwork into every card frame (the collectible chrome — serial,
ribbon, barcode — stays; the photo replaces the vector scene).

---

## ADDENDUM — 2 replacement cards (portrait 3:4, ≥1536×2048, same style block)

**R1. `anicon.jpg`** — Anime Convention (replace)
> A cosplayer in full silhouette from behind, holding a glowing katana
> diagonally, facing a wall of warm paper lanterns and a torii gate
> silhouette in smoke, manga-style radial speed lines of amber light
> bursting from the center, halftone texture in the shadows, ember-orange
> and crimson palette. No face visible. Vertical portrait.

**R2. `hle.jpg`** — Hindi Literary (new — currently has no photo)
> An antique brass ink pen resting on an open handwritten manuscript with
> flowing Devanagari-style calligraphy (blurred, unreadable), a glass
> inkwell and a flickering candle beside it on dark aged wood, warm golden
> candlelight, deep crimson shadows, smoke curling through the light.
> Vertical portrait, objects only, no people.
