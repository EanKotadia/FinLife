# FinLife – A Financial Literacy Life Simulator

FinLife is a browser-based, interactive life simulator that teaches financial literacy through meaningful choices, unexpected events, and realistic consequences — all presented in an engaging, game-like experience.

---

## Tech Stack

- Frontend Framework: [React](https://react.dev/)
- Build Tool: [Vite](https://vitejs.dev/)
- Language: [TypeScript](https://www.typescriptlang.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/)
- UI Components: [shadcn/ui](https://ui.shadcn.com/)
- State Management: localStorage

---

## Core Gameplay Loop

1. Start at age 16 with base stats (Money, Happiness, Health, Financial IQ).
2. Each year, make choices through decision cards (education, work, purchases, emergencies).
3. Random events occur, including bills, bonuses, and financial setbacks.
4. Choices dynamically impact finances and well-being.
5. Game concludes at retirement (age 65) with a Life Report Card.

---

## Key Modules and Screens

### 1. Life Stages by Age

| Age Range | Example Decisions |
|-----------|-------------------|
| 16–22     | Part-time job, save vs. spend, side hustle |
| 23–35     | Student loans, credit cards, rent vs. buy |
| 36–50     | Kids, career changes, insurance, emergencies |
| 51–65     | Retirement planning, healthcare, legacy decisions |

### 2. Financial Systems

- Income: Jobs, freelancing, passive income
- Expenses: Bills, rent, insurance, lifestyle costs
- Debt: Student loans, credit cards, interest systems
- Investments: Stocks, real estate, crypto
- Budget Slider: Balance savings vs. spending
- Financial IQ: Increases with smart decisions, unlocks perks

### 3. UI Elements

- Dashboard: Tracks financial and personal stats over time
- Decision Cards: Present life choices with consequences
- Tooltips: Explain financial terms (e.g., APR, net worth)
- Random Events: Simulate real-world unpredictability
- Final Report Card: Summarizes net worth, decision quality, and financial health

---

## Challenges We Faced

- Balancing gameplay with real-world financial learning
- Designing meaningful decisions that reflect realistic trade-offs
- Presenting financial concepts in an accessible, immersive format

---

## Accomplishments

- Built a complete, browser-based life simulator
- Developed a dynamic stat engine responsive to user choices
- Created an engaging financial learning experience
- Designed an intuitive and mobile-friendly interface

---

## Lessons Learned

- Systems design is critical for simulating real-life decision making
- JavaScript and TypeScript are capable tools for modeling stateful, branching logic
- Effective learning emerges from user-driven exploration, not forced instruction

---

## What's Next

- Dynamic economic systems: Inflation, downturns, market cycles
- AI-powered financial coach: Personalized tips and explanations
- Multiplayer mode: Compare life outcomes and strategies
- Accessibility enhancements: Voice narration, offline support, mobile-first UX
- Classroom tools: Educator dashboards, analytics, and simulation scenarios

---

## Running Locally

```bash
# Clone the repository
git clone https://github.com/EanKotadia/BrainDump.git
cd BrainDump

# Install dependencies
pnpm install  # or npm install

# Start development server
pnpm dev
