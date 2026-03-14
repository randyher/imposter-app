# IMPOSTER — NBA Edition

A trivia game where 3 players belong together and 1 doesn't. No hints. Figure out why.

## Project Structure

```
ImposterApp/
├── data/
│   └── players.json        # 100 NBA player records with attributes
├── utils/
│   └── questionEngine.js   # 20 question templates + game generator
├── App.jsx                 # Full game UI (all 5 screens)
└── README.md
```

## Game Flow

Home → Categories → Lobby (NBA) → Game → Results

## Screens

- **Home** — Branding, rules, PLAY button
- **Categories** — NBA (active), MLB + NFL (coming soon)
- **Lobby** — Category-specific hype screen with START GAME
- **Game** — Timed 3-minute round, 4 player cards, skip option
- **Results** — Score, accuracy, verdict, play again

## Scoring

| Action  | Points |
|---------|--------|
| Correct | +1     |
| Wrong   | −1     |
| Skip    | −0.5   |

## Question Engine

20 dynamic templates pull randomly from the player database each game.
No two games are identical. Templates cover:

1. Eastern Conference vs Western
2. Western Conference vs Eastern  
3. Champions (imposter never won)
4. Non-champions (imposter has a ring)
5. MVP winners
6. DPOY winners
7. Rookie of the Year winners
8. Scoring title winners
9. #1 overall draft picks
10. Non #1 picks (imposter was #1)
11. Point guards
12. Centers
13. Small forwards
14. Kentucky alums
15. Duke alums
16. One-team players
17. Multiple championship winners
18. No-college / international players
19. Top-5 draft picks
20. MVP winners without a championship

## Player Database

100 players with these attributes:
- `name` — Full name
- `teams` — Array of all teams played for
- `conference` — Eastern / Western / Both
- `champion` — Boolean
- `championships` — Count
- `mvp` — Boolean
- `dpoy` — Boolean (Defensive Player of the Year)
- `draft_pick` — Draft position number
- `position` — Array (PG, SG, SF, PF, C)
- `college` — School name or null (international/HS)
- `scoring_title` — Boolean
- `rookie_of_year` — Boolean

## Porting to React Native

`App.jsx` is structured for easy React Native conversion:
- Replace `div` → `View`
- Replace `p` / `span` → `Text`
- Replace `button` → `TouchableOpacity` + `Text`
- Convert `styles` object → `StyleSheet.create({})`
- Replace CSS grid → `flexDirection: 'row'` + `flexWrap: 'wrap'`
- `players.json` and `questionEngine.js` require **zero changes**

## To Do

- [ ] Port to React Native / Expo
- [ ] Add haptic feedback (correct/wrong)
- [ ] Add sound effects
- [ ] Add MLB player database + question templates
- [ ] Add NFL player database + question templates
- [ ] Add era filtering on Lobby screen (Pre-90s / 90s-2010s / Modern / All)
- [ ] Add difficulty tiers
- [ ] Add leaderboard / score sharing
- [ ] App Store submission
