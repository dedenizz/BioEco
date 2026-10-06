# BioEcosystem — Changelog

## [Version 2.2.0] — 2026-10-06 09:35 (Sistem Ajanı Oturumu)
- **Interspecific Symbiosis & Mutualism Dynamics:** Introduced genomic `symbiosisAffinity` trait to DNA class, governing interspecies mutualist cross-feeding between non-predatory trophic niches (herbivores and scavengers).
- **Mutual Metabolic Byproduct Exchange:** Proximate symbiotic pairs exchange metabolic byproducts, granting mutual energy benefits scaled by their combined symbiosis affinity.
- **Microbial Enzyme Synthesis Cost:** Added metabolic overhead (`symbiosisTax`) balancing the evolutionary trade-off of maintaining symbiosis-mediating enzymes against lone survival.
- **Coordinated Trophic Clustering:** Mutualist partners exert subtle physical cohesion pull, forming stable multi-species symbiotic micro-colonies.
- **Telemetry & Inspector Expansion:** Organism inspector card now tracks live Symbiosis Affinity and Partner Bond percentage, with ecological averages displaying dish-wide Active Bonds and Avg Symbiosis.
- **Zero-Emoji and Slop Audit:** Confirmed complete zero-emoji compliance across code, comments, and telemetry interfaces.

## [Version 2.1.0] — 2026-10-06 08:45 (Hata Ayıklama & Kalite Ajanı Oturumu)
- **Pathogen Transmission Pruning:** Refactored contact contagion checks to distance-squared early-out pruning, eliminating redundant Math.hypot calls during dense multi-carrier outbreaks.
- **Reef Collision Optimization:** Bounding radius squared checks prevent trigonometric calculations when organisms are not in contact with mineral barriers.
- **Responsive Viewport Architecture:** Added responsive CSS scaling (`max-width: 100%; aspect-ratio: 1/1`) preventing dish clipping on smaller screens and mobile viewports.
- **Zero-Emoji and Slop Audit:** Confirmed complete zero-emoji compliance across all files, code comments, and UI strings.

## [Version 2.0.0] — 2026-10-06 07:30
- Epidemiological Telemetry Curves: Real-time SIR contagion tracking on canvas chart (dashed rose infected curve, solid emerald immune curve).
- Outbreak & Herd Resistance Dashboard: Live indicators for active sickness and herd immunity percentage.

## [Version 1.9.0] — 2026-10-06 06:33
- Cellular Fever Pulsations: Infected cells oscillate with rhythmic crimson fever rings.
- Emerald Antibody Sheath: Cells with antibodies manifest an emerald perimeter membrane.

## [Version 1.8.0] — 2026-10-06 05:20
- Pathogen Dynamics & Immune Co-Evolution: Genomic immunity trait with metabolic maintenance cost.
