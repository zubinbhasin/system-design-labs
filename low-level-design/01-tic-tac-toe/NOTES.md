# Tic-Tac-Toe — Low Level Design

---

## Step 1: Clarifying Questions (Before You Start)

Before diving in, clarify scope with the interviewer:

- Do you want entity design or a complete working solution?
- Do we need to persist data (models/schema)?
- Are there bots? How many? Do they have difficulty levels?

---

## Step 2: Requirements

| # | Requirement | Detail |
|---|-------------|--------|
| 1 | Board size | N x N |
| 2 | Number of players | N - 1 (e.g., 3x3 board → 2 players) |
| 3 | Bot support | Optional; if yes, ask for difficulty levels |
| 4 | Player symbols | Each player picks their own symbol; no duplicates |
| 5 | Turn order | Randomise player order at game start |
| 6 | Win condition | All symbols across a row, column, or diagonal |
| 7 | Game end | Ends immediately on a winner or a draw |
| 8 | Undo | Global undo — removes the last move, turn reverts to that player |

---

## Step 3: Class Diagram

### `Game`
```
- board: Board
- players: Player[]
- winner: Player | null
- gameState: GameState       // IN_PROGRESS | ENDED | DRAW
- nextPlayerIndex: number
- moves: Move[]
```

---

### `Board`
```
- size: number
- cells: Cell[][]            // 2D array
```

---

### `Player`
```
- name: string
- symbol: char
- playerType: PlayerType     // HUMAN | BOT
```

> Use a `PlayerType` enum instead of an `isBot` boolean — leaves room for future types like SUPERHUMAN.

---

### `Bot extends Player`
```
- difficulty: BotDifficulty  // EASY | MEDIUM | HARD
```

---

### `Move`
```
- player: Player
- cell: Cell
```

---

### `Cell`
```
- row: number
- col: number
- occupiedBy: Player | null
- state: CellState           // EMPTY | FILLED | BLOCKED
```

> Use a `CellState` enum instead of an `isEmpty` boolean — accommodates future states like BLOCKED.

---

### Enums

```
GameState    → IN_PROGRESS | ENDED | DRAW
PlayerType   → HUMAN | BOT
BotDifficulty → EASY | MEDIUM | HARD
CellState    → EMPTY | FILLED | BLOCKED
```

---

## Step 4: Design Patterns

### Builder
Use a `GameBuilder` to construct a `Game` object with varying config (board size, players, bots, etc.).

### Strategy + Factory — Bot Playing Strategy
Each difficulty level is its own strategy:
- `EasyBotPlayingStrategy`
- `MediumBotPlayingStrategy`
- `HardBotPlayingStrategy`

A `BotPlayingStrategyFactory` returns the correct strategy based on `BotDifficulty`.

```
BotPlayingStrategyFactory.getStrategy(difficulty) → BotPlayingStrategy
```

> Note: Separate row/column/diagonal winning strategies are overkill for Tic-Tac-Toe. The winning check is handled algorithmically (see below). Strategy pattern for winning makes more sense in systems like Parking Lot (FIFO vs other allocation algorithms).

---

## Step 5: Undo Feature

Store all moves in a `Move[]` list on the `Game` object.

### Approach 1 — Remove last move (simple, good for Tic-Tac-Toe)
1. Pop the last `Move` from the list.
2. Set that cell back to `EMPTY`.
3. Revert `nextPlayerIndex` to that player.

### Approach 2 — Re-execute N-1 moves (better for complex games like Chess)
1. Reset the board to empty.
2. Re-execute the first `N-1` moves.
3. Remove the Nth move from the list.

> Use this when a single "undo" has cascading effects (e.g., Chess piece captures, pins, checks).

### Approach 3 — Board snapshots
Store a snapshot of the entire board after every move.

- Undo = pop the last snapshot and restore it.
- Space trade-off: `O(moves * N²)`, but max board size is 256x256 so this is acceptable.

---

## Step 6: Winning Algorithm

A player wins if their symbol fills an entire row, column, or diagonal.

### Brute Force — O(N³)
Check every row, every column, left diagonal, right diagonal for every player.

### Optimised — O(N²)
Only check for the player who just made a move (not all players).

### Best — O(N)
Only check the row, column, and diagonal that contains the cell just played.

**Rules:**
- Always check the row `i` and column `j` of the played cell → O(N) each.
- Check left diagonal if `row == col` (cell is on the main diagonal).
- Check right diagonal if `row + col == N - 1`.

**Further optimise to O(1) per move** by maintaining count maps updated incrementally:

```
rowCount[player][row]
colCount[player][col]
leftDiagCount[player]    // if row == col
rightDiagCount[player]   // if row + col == N-1
```

After each move, increment the relevant counters. If any counter reaches `N`, that player wins immediately — no need to iterate.

### Summary of Complexities

| Approach | Time |
|----------|------|
| Brute force (all players) | O(N³) |
| Check only current player | O(N²) |
| Check only affected row/col/diag | O(N) |
| Incremental count maps | O(1) per move |

## TODO

- [ ] Undo functionality — allow players to revert the last move (consider a move stack on `Game`)
