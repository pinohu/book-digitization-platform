# V4 archetype — indicative file counts (sales parity)

These ranges **approximate** what the generator targets before bonus/depth packs. Actual counts depend on tier, toggles, and template. **Authority** and **Enterprise Full** both ship the largest bundles; Authority emphasizes site factory + SEO cluster; Enterprise Full emphasizes the full integration module run.

| Archetype | Indicative total files | Strategy + ops docs (indicative) | Notes |
|-----------|------------------------|-----------------------------------|--------|
| Demo / Express | ~28–42 | 3–8 | Skips ~78-doc depth pack; defers modules per matrix |
| Landing (1-page) | ~45–70 | 10–20 | Minimal routes; many integrations deferred |
| Starter (5-page) | ~55–85 | 15–28 | Extra marketing routes |
| Growth | ~85–120 | 25–45 | Near-full doc set; some media deferred |
| Authority site | ~95–140+ | 30–50+ | Authority content + niche config |
| Enterprise Full | ~120–165+ | 90+ incl. depth | Full module surface when tier allows |

Module **run / defer / skip** matrix is enforced in `api/provision.js` (`ARCHETYPE_MODULE_POLICY`) and the builder UI.

*§8 marketing alignment — file count transparency.*