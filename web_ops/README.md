# How to update the WebOps Network files

This repository holds three web pages that explain the WebOps network: how requests come in, get triaged onto a line, move through stations, launch, and get measured. Each page is a single HTML file you can edit in a text editor and open in a browser. Nothing to install, nothing to build.

This guide explains how each file is organized, how to make the usual changes, and how to fix things when a change breaks the page.

## Contents

- [The files](#the-files)
- [How the three files connect](#how-the-three-files-connect)
- [Before you start](#before-you-start)
- [Rules that apply to every file](#rules-that-apply-to-every-file)
- [Part 1: The network map](#part-1-the-network-map)
- [Part 2: The animations](#part-2-the-animations)
- [Fixing mistakes](#fixing-mistakes)
- [Keeping the files in sync](#keeping-the-files-in-sync)
- [Sharing and publishing](#sharing-and-publishing)

## The files

| File | What it is |
|---|---|
| `WebOps_network_V3.html` | **The network map.** The full interactive reference: journey planner (triage questions that produce a ticket), network map, crew roster, network services, objectives (OKRs) and triage rulebook. |
| `WebOps-network-animation.html` | **Simple animation.** Requests travelling along the lines of a simplified map: Request, Triage, Research, Design, Build, Check, Launch, Measure. |
| `WebOps-network-animation-detailed.html` | **Detailed animation.** The same idea on the full map: Prepare, Intake, Triage, Research, Design, Build, Check, Launch, Monitor, Check-ins, Library. |
| `README.md` | This guide. |

## How the three files connect

All three describe the same network, but **they don't share any code or data**. Each file carries its own copy of the station names, line names, colours and descriptions. A change in one file doesn't reach the others.

The vocabulary that has to stay consistent across all three:

- **Stations**: the steps a request passes through (Intake, Triage, Build, Check...).
- **Lines**: the route types a request can ride. There are seven, plus the loop line:

| Line (display name) | Internal id | Led by | Colour |
|---|---|---|---|
| Revamp support | `revamp` | RAD, with Enterprise | orange `#CF7A27` |
| New pattern | `newpattern` | RAD, with Enterprise | purple `#7657C2` |
| Custom build | `custom` | Enterprise | blue `#3D6FC2` |
| Express | `express` | Publishing | green `#2E9461` |
| Non-WUX-led | `nonwux` | Enterprise or Publishing | grey `#76838D` |
| Advice | `advice` | RAD | pink `#B64F92` |
| Evidence | `evidence` | RAD | teal `#1E8F8C` |
| Loop line | `loop` | (discovered work coming back to triage) | yellow `#E9B634` |

- **Ids vs names.** Every station and line has an **id** (like `express` or `check`) that the code uses to connect things, and a **name** that people see (like "Express" or "Check"). Change names freely. Ids are internal: nobody sees them, so you rarely need to change one. If you do, change it everywhere it appears in that file (Ctrl+H, Replace All) and test.

[Keeping the files in sync](#keeping-the-files-in-sync) at the end lists which changes need to be made in which files.

## Before you start

You need:

- **A text editor.** VS Code or Notepad++ are best: they show line numbers and colour the code, so a missing quote or comma stands out. Notepad works in a pinch. **Never use Word**: it replaces straight quotes with curly ones and breaks the file.
- **A browser.** Edge or Chrome.

Every time you edit:

1. **Keep a way back.** In a git repository, your last commit is your backup: if something goes wrong, discard your changes (in VS Code: Source Control panel, right-click the file, Discard Changes). Outside git, copy the file first.
2. **Open the file in the editor.**
3. **Find the part you want to change** with Ctrl+F (each file has search markers, described below).
4. **Make one change at a time**, then save (Ctrl+S).
5. **Test it**: open the file in the browser (double-click it, or drag it onto a browser window). If it's already open, press F5 to reload. Check the part you changed.
6. If a red box appears at the top of the page, read it: it says what's wrong and on which line. See [Fixing mistakes](#fixing-mistakes).
7. **Commit** with a message that says what changed, for example `Rename Direct line to Non-WUX-led`.

## Rules that apply to every file

The parts you edit are written in JavaScript, but you only need to follow a few rules.

- **Text goes between straight double quotes**: `"Express"`.
  - Apostrophes need nothing special: `"doesn't"`.
  - For curly quotes inside text, type them as characters: `"Revamp the “Apply for citizenship” section"`. Never type a straight `"` inside text: it ends the text early.
- **Items in a list are separated by commas.** A comma after the last item is fine. A *missing* comma between two items is the most common mistake.
- **Brackets come in pairs.** `[ ]` hold a list, `{ }` hold a record with named fields (`{ id: "check", name: "Check" }`). If you copy a row to make a new one, copy from its opening bracket to its closing bracket and the comma after it.
- **Lines starting with `//` or text between `/*` and `*/` are comments.** They're notes for you; the page ignores them.
- **Capitals matter in ids.** `"Express"` is not the same id as `"express"`.

---

## Part 1: The network map

File: `WebOps_network_V3.html`

### How the file is organized

The file has four parts, top to bottom:

| Part | What's in it | Do you edit it? |
|---|---|---|
| **1. Style** (inside `<style>`) | Colours, fonts, spacing. The colours for lines, roles and zones are at the very top in a block starting with `:root{`. | Only to change a colour. |
| **2. Page text** (HTML) | The page title, the intro under each section heading, the "When does a trip need Enterprise?" callout, the footer. | Yes, plain text. |
| **3. Data blocks** (inside `<script>`) | Everything the interactive parts show: stations, lines, questions, example trips, crew duties, services, rules, objectives. Each starts with a marker comment `/* ===== EDIT: ... ===== */`. | Yes: this is where most changes go. |
| **4. Logic** (inside the same `<script>`) | The code that draws the map, builds the ticket, renders tables. | No, except the **ROUTING** block, with care. |

**To jump between data blocks, search (Ctrl+F) for `EDIT:`.** There are ten, in this order:

| Marker | What it controls on the page |
|---|---|
| `EDIT: STATIONS` | The stations on the map, the station panel when you click one, the columns of the crew roster |
| `EDIT: LINES` | Line names, leads, descriptions, examples, and what happens at each stop (map, legend, line panel, ticket) |
| `EDIT: ROLES` | The rows of the crew roster |
| `EDIT: QUESTIONS` | The journey planner questions and answers, and the priority criteria |
| `EDIT: ROUTING` | How the planner's answers turn into a line, flags and a ticket (logic) |
| `EDIT: EXAMPLE TRIPS` | The example trips under "Start from a line" |
| `EDIT: CREW DUTIES` | The text in each cell of the crew roster |
| `EDIT: NETWORK SERVICES` | The reports and meetings in Network services |
| `EDIT: TRIAGE RULEBOOK` | The numbered rules at the bottom of the page |
| `EDIT: OBJECTIVES` | The OKRs: WebOps objectives and the team objectives that feed them |

### The page text (section introductions)

Section headings and their intro paragraphs are plain HTML near the top of the body. Search for the heading text, for example `Crew roster`, and you'll find:

```html
<div class="sh"><h2 id="h3c">Crew roster</h2></div>
<p class="lede">What each role does at each station. ...</p>
```

Change the words between `>` and `<`. Leave the tags (`<p class="lede">`, `</p>`) and the `id="..."` values as they are.

The "When does a trip need Enterprise?" callout is in the same area: search for `When does a trip need Enterprise`. Each bullet is an `<li>...</li>`; each paragraph is a `<p>...</p>`.

### STATIONS and ZONES

```js
const STATIONS=[
  {id:"prep",n:"Prepare",s:"content ready",z:"0",what:"The WUX advisor gets the content approved ...",who:"Owner"},
  ...
];
const ZONES=[{z:"0",n:"FRONT DOOR",from:0,to:2,c:"--z0"}, ...];
```

| Field | Meaning |
|---|---|
| `id` | Internal id. Used by lines, duties, OKR links. Don't change it. |
| `n` | Station name shown on the map and in the roster. |
| `s` | Small label under the name, like `"QA, back and forth"`. |
| `z` | Which zone it belongs to: `"0"` front door, `"r"` research, `"d"` design and test, `"L"` launch, `"m"` measure, `"f"` foundation. This sets its colour in the roster. |
| `what` | The description in the station panel when someone clicks the station. |
| `who` | The "who" line in that panel. |

The order of `STATIONS` is the left-to-right order on the map. Stations are placed automatically, 106 pixels apart.

`launch` is a special station: it's drawn as the dark vertical bar, not as a column with a name.

In `ZONES`, `from` and `to` are **positions in the STATIONS list, counting from 0** (prep is 0, intake 1, triage 2, research 3...), not ids. `n` is the label on the shaded area.

### LINES

This block holds three things: `PREP`, `LINES` and, just after it, `LINE_ORDER` and `LAUNCHES`.

```js
const LINES={
  express:{n:"Express",lead:"Publishing",when:"Content, or a page from existing templates and components. No custom code.",ex:"Update a fee amount on a page",
    stops:{prep:PREP,intake:["Request","owner"],triage:["Line and priority","triager"],build:["Built from templates and components","Publishing"],check:["Code QA and content QA, back and forth until approved","Publishing, owner"],monitor:["Outcome report","RAD"]}},
  ...
};
const LINE_ORDER=["revamp","newpattern","custom","express","nonwux","advice","evidence"];
const LAUNCHES=new Set(["revamp","newpattern","custom","express","nonwux"]);
```

| Field | Meaning |
|---|---|
| (the key before the colon, `express`) | The line's id. |
| `n` | Display name. |
| `lead` | Who leads the line. |
| `when` | When to use this line (line panel). |
| `ex` | A one-line example (line panel). |
| `stops` | Where the line has a ring, and what happens there. |

Each stop is `station id: ["What happens", "who"]`. The order you write them in doesn't matter: the page sorts them by station order. A station that isn't listed is a station the line skips.

**The "who" text matters.** The page reads it to decide which roles light up in the crew roster and on the ticket, by looking for these words (capitals don't matter):

| If "who" contains | The role is |
|---|---|
| `owner`, `wux` or `advisor` | Owner (WUX advisor) |
| `program` or `requester` | Program |
| `triager` | Triager |
| `manager` | Manager |
| `RAD` (as a word) | RAD |
| `Enterprise` | Enterprise |
| `Publishing` | Publishing |

So `"Publishing, owner"` lights up Publishing and the Owner. If you write `"the web team"`, nobody lights up.

`PREP` is a shortcut for the standard Prepare stop that several lines share. Change it once and every line using `prep:PREP` follows.

`LINE_ORDER` is the top-to-bottom order of lines on the map and in the legend and buttons. `LAUNCHES` lists the lines that cross the launch bar (and so get the launch step, the inventory update and, when asked, impact monitoring).

### ROLES

```js
{k:"owner",n:"Owner",sub:"WUX advisor for their line of business; RAD advisor for the Help Centre and DPM",dec:"What changes on their pages. ..."},
```

`k` is the role id (don't change it), `n` the name, `sub` the description under it, `dec` what the role decides. The row order is the order in the roster.

### QUESTIONS

The journey planner. Each question:

```js
{id:"monitor",l:"Will you need to monitor the impact of this change?",who:"Owner, with the triager",h:"Yes when someone will want to know whether it worked ...",show:s=>isChange(s)||s.who==="nonwux",o:[["no","No"],["yes","Yes"]]},
```

| Field | Meaning |
|---|---|
| `id` | The question's id. The ROUTING logic reads answers by this id. Don't change it. |
| `l` | The question as shown. |
| `who` | Who answers it (small text above). |
| `h` | Optional hint under the question. |
| `show` | When the question appears, based on earlier answers. `s.who==="nonwux"` means "only when the answer to *who* is *nonwux*". Leave this as is unless you understand it. |
| `o` | The answers: `["answer id", "Answer as shown"]`. Change the shown text freely; **don't change the answer ids**, the routing uses them. |

Just after the questions:

- `DEF` is the starting answer for every question when the planner opens or resets. If you add a question, add its default here.
- `PRIOS` holds the three priority buttons (P1, P2, P3) and their short labels.
- `P1` lists the criteria that make a request P1, shown in the expandable "criteria" panel.
- `SCORE` holds the scoring criteria shown in the same panel (6 or more out of 10 is P2, less is P3).
- The panel's sentences themselves ("How to choose the priority", "A P1 needs a written reason...", "6 or more is P2...") are a few lines below: search for `How to choose the priority`.

### ROUTING (edit with care)

`function compute(s)` turns the answers into a ticket. Unlike the other blocks, this is logic, not a list. Read it top to bottom like a decision tree:

1. Flags from network services that are noise, planned or accepted end here (no trip).
2. **The line is chosen**, first match wins, in the same order as rulebook rule 2: Non-WUX-led → Evidence (numbers, analysis, tracking) → Advice → Express (templates) → New pattern or Custom build (custom code, reused or not) → Revamp support.
3. Content not ready → "Not ready" (unless the line is New pattern or Revamp, where content follows design).
4. The line's stops are copied from `LINES`, then adjusted:
   - Non-WUX-led sent to Enterprise rewrites the build and check stops.
   - Anything custom adds the "Custom design or code" flag.
   - Impact monitoring adds the baseline (at triage), the dashboard (at monitor) and the 30- and 90-day checks.
   - P1 adds "the same day", "first in the queue" and the 2-week check.
5. Notes are added (the negotiated SLA for Custom build and New pattern, RAD as owner for the Help Centre).
6. The roles at launch are set (`launchRoles`).

**Safe edits here:** the text between quotes, such as the `sub` labels (`"Custom code, led by Enterprise"`), the notes (`T.notes.push("...")`), the flags (`T.flags.push("...")`) and stop texts (`w="..."`).

**Edits that need care:** anything with `===`, `&&`, `||`, `if`, `?`. These are the conditions. If you need to change how routing works (a new line, a new question that changes the line), make the change, then run **every** example trip (see [Testing the network map](#testing-the-network-map)) to confirm each still lands on the line its description says.

Also in this logic, a little lower, is `renderTicket`. Its "Record in Asana" part ends with the **Target** row: `"Negotiated SLA"` for Custom build and New pattern, `"SLA for P1"` (and so on) for the others. Search for `Negotiated SLA` to change that wording.

### EXAMPLE TRIPS

Three example trips per line, plus three for the loop line. Each one is a title, an explanation, and the planner answers that produce it:

```js
nonwux:[
  {t:"New PDI for a temporary public policy",why:"No WUX advisor, so it rides the Non-WUX-led line. ...",s:{who:"nonwux",team:"pub",nsd:"no",prio:"P2"}},
  ...
],
```

| Field | Meaning |
|---|---|
| `t` | The trip's title. |
| `why` | The explanation shown under it. |
| `s` | The answers that differ from the defaults (`DEF`). Each is `question id:"answer id"`. `{}` means "all defaults" (a plain Express trip). |

When someone clicks the trip, the planner fills in these answers and the ticket shows the result. **The `why` must match what the ticket shows**, so after editing, click the trip and read the ticket.

### CREW DUTIES

The text in each roster cell, by role and station:

```js
prog:{prep:"Approves content",intake:"Sends Non-WUX-led requests: PDIs, corporate items, tool data",design:"...",check:"Confirms content; joins the QA back and forth"},
```

The first key is the role id (from ROLES), then `station id:"Duty"`. A missing station leaves the cell empty. The roster highlights and numbers a duty when the current ticket has that role at that station; the duty text itself is always shown.

### NETWORK SERVICES

```js
{g:"Every day and every week"},
{id:"alerts",w:"Daily",n:"Top-task alerts",by:"RAD",runs:"AUTO",tool:"Adobe Analytics anomaly alerts",
 what:"Automatic alerts when ...",use:"RAD checks each alert. ...",feeds:"Loop line",line:"loop"},
```

- A row with only `g` is a **group heading** in the list.
- `id`: the service id. OKR key results link to services by this id (`svc:alerts`), so don't change it.
- `w`: when it runs. `n`: name. `by`: who runs it. `tool`: the tool used.
- `runs`: how it runs: `"AUTO"` (automatic), `"SEMI"` (partly automated) or `"MEET"` (a meeting).
- `what`, `use`, `feeds`: the three descriptions in the detail panel.
- `line` (optional): a line id. Adds a "Show the ... line" button that highlights that line on the map.

The key results linked to a service appear in its detail panel automatically.

### TRIAGE RULEBOOK

Each rule is `["number", "Title", `text`]`:

```js
["6","QA goes back and forth",`<p>Check is rarely a single pass. ...</p>`],
```

The rule text is **HTML between backticks** (`` ` ``, the key left of 1 on most keyboards), not quotes. That lets you write paragraphs (`<p>...</p>`), lists (`<ul><li>...</li></ul>`) and tables, and use two helpers:

- `${chip("express")}` shows a coloured line chip with the line's name.
- `${ph("10")}` shows a dashed placeholder box, for numbers still to set with the team.

Never type a backtick inside rule text. Rule numbers are plain text: if you insert or remove a rule, renumber the ones after it and search the file for "rule 7" (and so on) in case other text refers to them.

### OBJECTIVES

Three lists: `TEAMS` (the tabs: WebOps, RAD, Enterprise, Publishing), `PARTS` (the four parts of the network an objective belongs to) and `OKR`.

```js
{id:"RAD 1",team:"rad",part:"me",t:"Outcome data that runs on its own",krs:[
  ["RAD 1.1","Top tasks with a baseline on the four outcome measures","100%","Refreshed after the GC TSS quarter",["WO 2.1","WO 2.4"],["svc:tss","st:triage"]],
  ...
]},
```

| Field | Meaning |
|---|---|
| `id` | Objective number, like `"WO 1"` or `"RAD 1"`. |
| `team` | Which tab: `wo` (WebOps), `rad`, `ent`, `pub`. |
| `part` | Part of the network: `fd` front door, `me` measure, `fo` foundation, `cr` crew. |
| `t` | The objective. |
| `why` | Optional context sentence (used on WebOps objectives). |
| `krs` | The key results. |

Each key result is a list of six items, always in this order:

1. its number, `"RAD 1.1"`
2. the key result
3. the Q3 target
4. the Q4 target
5. the **WebOps** key results it feeds, like `["WO 2.1","WO 2.4"]` (`[]` for WebOps key results themselves)
6. what it links to on the page: `"st:triage"` (a station), `"line:express"` (a line), `"svc:outcome"` (a service). Each id must exist, or the page stops with an error. `sig:` links are left over from an earlier version and show nothing; you can ignore or remove them.

Write a number still to be agreed between square brackets inside the text, like `"Median ≤ [1] business day"`: it shows as a shaded placeholder.

The `sub` in `TEAMS` (`"4 objectives"`) is plain text: update it if you add or remove a team objective.

### Colours

Line, role and zone colours are CSS variables at the top of the `<style>` block, in **three places**: the normal (light) theme, then twice for the dark theme (`@media (prefers-color-scheme: dark)` and `:root[data-theme="dark"]`).

```css
--express:#2E9461; --nonwux:#76838D; --revamp:#CF7A27; ...
```

To change a line's colour, change it in the first block, and change the lighter dark-theme version in both dark blocks. Each variable is named after the line id (`--express` for `express`) and the roles are `--ro-owner`, `--ro-rad`, and so on.

### Recipes for the network map

**Rename a line**

1. In `LINES`, change its `n`.
2. Search the file for the old name (match case off) and update rule texts, example trip explanations, duties and OKR text that mention it.
3. Leave the id alone.
4. Do the same in both animations.

**Change who leads a line:** change `lead` in `LINES`, then check rulebook rule 2 (the "Led by" column) and the line's example trips.

**Change what happens at a stop:** in `LINES`, edit the first text of that stop. If the people change, edit the second text, using the role words from the table above.

**Make a line stop at, or skip, a station:** add or remove that `station:["What","who"]` entry in the line's `stops`. Then check the crew duties for those roles, and the animation trips on that line.

**Add an example trip:** copy an existing trip `{t:...}` row within the same line, change `t`, `why` and the answers in `s`. The buttons show every trip in the list, so a fourth trip simply appears.

**Reword a question or answer:** change `l`, `h` or the second text in each `o` pair. Never the ids.

**Add a network service:** copy a service row in the right group, give it a new `id`, and fill in the fields.

**Edit an OKR:** change the text and targets directly. To link it somewhere, add `"st:..."`, `"line:..."` or `"svc:..."` to its last list.

**Add a rule:** copy a rule row, number it, and write its text in HTML between backticks.

**Add a line** (bigger change; do it step by step and test after each):

1. Add a colour variable `--yourid` in the three colour blocks.
2. Add the line to `LINES` with `n`, `lead`, `when`, `ex` and `stops`.
3. Add its id to `LINE_ORDER` where it should sit on the map, and to `LAUNCHES` if it crosses the launch bar. The map makes room automatically; up to about eight lines fit in the zones.
4. Add three example trips under its id in `TRIPS`.
5. Change ROUTING so some answers lead to it, and usually add or change a question for it (with its default in `DEF`).
6. Add it to rulebook rule 2.
7. Test every example trip.

**Add a station** (biggest change):

1. Add it to `STATIONS` in its left-to-right place, with a `z` zone.
2. Widen the map: search for `viewBox="0 0 1300 470"` and add 106 to the 1300 for each new station.
3. Fix `ZONES`: their `from` and `to` are positions, so every zone after the new station shifts by one.
4. Add it to the `stops` of the lines that stop there, and to `DUTY` for the roles that work there.
5. Test the map, the roster and several trips.

### Testing the network map

After any change, reload the page and check:

1. **No red box at the top.** If there is one, see [Fixing mistakes](#fixing-mistakes).
2. **All six sections show content**: Journey planner, Network map, Crew roster, Network services, Objectives, Triage rulebook. A section that is empty or stops halfway usually means an id that doesn't exist (a typo in a station, line, role or service id).
3. **The part you changed reads right**, in light and in dark mode if you changed colours (switch your system theme to check).
4. **After a routing or line change, click every example trip** under "Start from a line", for every line, and read the ticket: line, priority, stops, flags. Each must match its explanation.
5. **Narrow the window** to phone width and check nothing overflows.

---

## Part 2: The animations

Files: `WebOps-network-animation.html` (simple) and `WebOps-network-animation-detailed.html` (detailed). They work the same way, so everything here applies to both. They don't share anything with each other: make a change in both if they should match.

### How the files work

Each file has three parts, top to bottom:

1. **Style and fonts.** Colours, spacing and the embedded fonts. The font lines are very long: leave them alone.
2. **EDIT HERE.** Stations, lines, scenes, captions and timing. **This is the only part you change.** Search for `EDIT HERE`; the block ends at `END OF EDIT HERE`.
3. **Engine.** Starts at the line `ENGINE. You should not need to edit anything below this line.` It reads EDIT HERE, draws the map and plays the scenes. It also checks your edits and shows a red message if something is wrong.

The engine works out the drawing: zone sizes, where line names go, the launch bar, which lines fade during a scene, the trip numbers and the scene buttons. You describe what should happen; the engine decides where things go on screen.

To test, open the file in the browser and use the scene buttons under the animation to jump straight to the scene you changed. The space bar pauses and plays.

### The EDIT HERE block, part by part

The block has nine parts, always in this order, each with a short comment above it.

| Part | What it controls | Example |
|---|---|---|
| `EYEBROW` | The small capital label above every scene title | `"WEBOPS NETWORK"` |
| `DESCRIPTION` | Text read aloud by screen readers. Update it if the stations change. | One sentence |
| `STATIONS` | The stations, left to right: `id`, `name` (big label), `sub` (small label underneath, or `""` for none), `x` (horizontal position in pixels; the frame is 1280 wide). `hideName: true` hides the name (used for launch, drawn as a bar). | `{ id: "check", name: "Check", sub: "QA, back and forth", x: 624 },` |
| `ZONES` | The shaded areas. Here `from` and `to` are **station ids**; the engine sizes the box. | `{ label: "MEASURE", from: "monitor", to: "checks" },` |
| `LINES` | The lines, top to bottom: `id`, `name`, `lead` (grey text after the name), `color` (hex), `y` (vertical position) and `stops` (station ids with a ring, left to right) | `{ id: "express", name: "Express", lead: "Publishing", color: "#2E9461", y: 334, stops: ["prep","intake","triage","build","check","monitor"] },` |
| `BARS` | The dark vertical bars: the launch bar, and the triage bar in the simple file. `station` is where it sits; `fromLine` and `toLine` are how far it reaches. | `{ station: "launch", fromLine: "revamp", toLine: "nonwux", label: "LAUNCH" },` |
| `TRUNK` | Simple file only: the grey entry line from Request into the triage bar. `null` in the detailed file. | `{ from: "request", to: "triage", y: 334 }` |
| `LOOP` | The yellow loop line: start (`from`), return (`to`), height (`y`), where the owner-review stop sits (`reviewX`) and its `label` | |
| `LAYOUT` | Fine positioning you rarely need: station-name height, where the line-name column starts (`lineLabelX`), zone padding | |
| `TIMING` | `speed` (pixels per second; higher is faster) and `passBy` (pause in seconds at stops with no caption) | `{ speed: 320, passBy: 0.5 }` |
| `SCENES` | Everything that plays, in order. See below. | |

Note the difference with the network map: in the animations, **zones use station ids**; in the network map, zones use positions.

### Scenes and trips

There are four kinds of scene:

- **Intro** (`type: "intro"`): the opening title, with the lines drawing in. Set `title`, `sub`, `captionTitle`, `captionText` and `seconds`.
- **Trip scene** (no `type`): one or more requests travelling along lines. Set `title`, `sub`, `button` (the label of its button under the animation), `lines` (which lines stay bright: one id like `"custom"`, or a list like `["advice","evidence"]`) and `trips`. Trip scenes are numbered Trip 1, Trip 2... automatically.
- **All together** (`type: "all"`): every line running at once. `order` lists which lines get a moving dot, in order; a line can appear more than once.
- **End card** (`type: "end"`): `lines` (the big closing sentences) and `footer`.

A **trip** is one request moving along one line (`line: "express"`). Each stop is one row:

```js
["station id", "Caption title", "Who", "What happens", seconds],
```

- `seconds` is how long the dot pauses there with that caption: about 1 for a short caption, 2 for a long one.
- A row with only the station id, like `["launch"],`, is a short pause with no caption.
- To show **back and forth**, list stations again in the order the work moves: `["check", ...]`, `["build", ...]`, `["check", ...]`.
- The **same station twice in a row** shows two captions one after the other without moving, as in the SLA negotiation at Triage on Custom build.
- `delay: 10` on a trip starts it 10 seconds into the scene, so two trips can share a scene (see Non-WUX-led: a PDI to Publishing, then a JSON update to Enterprise).

The **loop line trip** is special: it uses `line: "loop"`, names the line it boards after triage with `rejoin: "express"`, and has a stop called `"@review"` for the owner review on the yellow line. Keep that structure if you edit it.

You never set a trip scene's length: the engine adds up the moves and pauses. Only intro, all-together and end scenes take a fixed `seconds`.

### Recipes for the animations

In every recipe: change EDIT HERE, save, reload, check the scene you touched. Do it in both animation files if they should match.

**Rename a line:** change its `name` in `LINES`. Search for the old name and update any scene `title`, `button` or caption that mentions it. Leave the `id`.

**Change who leads a line:** change its `lead`, then check that the captions in its scene still agree.

**Change a line's colour:** change its `color`. Pick a colour clearly different from the other lines and dark enough to read on the light background. Use the same colour as the network map.

**Edit a caption:** search for a few words of it in `SCENES` and change the text. Keep each caption under about 110 characters, or it runs off the panel. If you lengthen it a lot, add half a second to its `seconds`.

**Change where a line stops:**

1. Edit that line's `stops` in `LINES`, keeping left-to-right order. This changes the rings on the map.
2. Edit the trip on that line in `SCENES` to match. Otherwise the dot pauses where the map shows no ring.

**Add a back and forth at QA:** after the trip's `check` row, add a row going back and one returning:

```js
["check", "Check",          "Publishing and WUX advisor", "Code QA and content QA.", 1.6],
["build", "Back and forth", "Publishing",                 "A wording issue goes back for a fix.", 1.5],
["check", "Check again",    "WUX advisor",                "Approved.", 1.2],
```

Add another build and check pair for a second round.

**Add a scene:**

1. Copy a whole trip scene, from its opening `{ title:` to its closing `]},`, and paste it where it should play.
2. Change `title`, `sub`, `button` and `lines`.
3. Change each trip's `line` and rewrite its stops.
4. Save and test. The new scene gets a button and a trip number automatically.

To remove a scene, delete the same span. Make sure the scene before it still ends with `},`.

**Add a station:**

1. In `STATIONS`, add a row in its left-to-right place, with an `x` between its neighbours. Stations work best about 90 pixels apart; spread the neighbours' `x` values if there isn't room.
2. Add its id to the `stops` of each line that stops there.
3. If needed, extend a zone in `ZONES`.
4. Add rows for it in the trips that should pause there.
5. If line names on the right now touch the last station, raise `lineLabelX` in `LAYOUT`.

**Add a line:**

1. In `LINES`, add a row with a new `id`, `name`, `lead`, `color`, `y` and `stops`. Lines are 24 pixels apart: for the bottom, use the last line's `y` plus 24.
2. If it passes through the launch bar, extend that bar's `toLine` in `BARS`. In the simple file, also extend the triage bar.
3. A lower line pushes into the yellow loop, so add 24 to `LOOP.y`, `LOOP.endY` and, if the line launches, `LOOP.startY`.
4. Add a scene for it, and its id to the all-together `order`.

**Make the animation faster or slower:** raise `speed` in `TIMING` (for example from 320 to 380) to move the dots faster. To shorten pauses, lower the `seconds` in the scenes you want tighter.

### Making a video

1. Open the file in the browser and press F11 for full screen.
2. Start a screen recording: Windows Snipping Tool (Win+Shift+R, then Record), Xbox Game Bar (Win+Alt+R), or PowerPoint's Insert, Screen Recording.
3. Click the Intro button, press Play, and let it run to the end card. The progress slider under the animation shows the total length.
4. Stop the recording, and trim the start and end in Clipchamp or Photos if needed.

---

## Fixing mistakes

All three files check themselves when they open. If something is wrong, a **red box** appears at the top of the page (the animations show it in place of the animation).

### "...a mistake in the EDIT HERE block" (animations only)

The file is readable, but something points to nothing. The message names the scene and stop, for example:

> Scene "Express", stop 4: there is no station with the id "biuld".

Fix the spelling so it matches an `id` in `STATIONS` or `LINES` exactly, including capitals.

### A typing mistake (all files)

The red box gives a message and a **line number**. Go to that line (Ctrl+G in VS Code or Notepad++) and look at it and the line just above. It's almost always one of these:

| The message says | Usual cause | Fix |
|---|---|---|
| `Unexpected identifier` or `Unexpected token` | A missing comma between two items, often at the end of the line above | Add the comma |
| `Unexpected string` | A missing comma between two pieces of text | Add the comma |
| `Invalid or unexpected token` | A quote that isn't closed, or a straight `"` inside text | Close the quote, or use curly quotes `“ ”` inside text |
| `missing ] after element list` or `Unexpected token '}'` | A square or curly bracket deleted or added | Compare the brackets with a neighbouring row |
| `Cannot read properties of undefined` (network map) | An id that doesn't exist: a station, line, role or service id misspelled, often in an OKR link or a line's stops | Check the ids on that line against their lists |

In VS Code, the problem is often underlined in red before you even save.

If you can't find it, discard your changes (or go back to your copy) and redo the change in smaller steps.

### Things no check can catch

Look for these when you test:

- Text too long for its space: a caption running off the panel, a label overlapping another.
- Labels overlapping after you move a station or a line.
- A dot pausing where the map shows no ring (an animation trip and its line's `stops` don't match).
- An example trip whose explanation no longer matches its ticket.
- The files saying different things (see below).

## Keeping the files in sync

| If you change... | Network map | Simple animation | Detailed animation |
|---|---|---|---|
| A line's name | `LINES` `n`, plus text mentions | `LINES` `name` + scene titles and buttons | Same |
| A line's lead | `LINES` `lead`, rulebook rule 2 | `LINES` `lead` | Same |
| A line's colour | Colour variables (three blocks) | `LINES` `color` | Same |
| Where a line stops | `LINES` `stops` | `LINES` `stops` + that line's trip | Same |
| A station's name or label | `STATIONS` `n`, `s` | Only if it's on the simple map (it groups some stations, like Request and Measure) | `STATIONS` `name`, `sub` |
| How QA or the SLA works | Line stop texts, duties, rulebook, callout | Captions | Captions |
| Services, OKRs, roles, questions | Network map only | — | — |

## Sharing and publishing

- **The files are self-contained.** Anyone can open them in a browser, online or offline. The network map loads its fonts from Google Fonts; offline, it falls back to system fonts and still works. The animations carry their fonts inside the file.
- **Send the file** by email or Teams, or put it in a shared folder. SharePoint often downloads HTML files instead of showing them: that's fine, open the downloaded file.
- **From this repository**, you can publish the pages with GitHub Pages (Settings, Pages, deploy from the main branch). Each file then has its own web address.
- **In a meeting**, open a file full screen (F11). In the animations, use the scene buttons to go at your own pace.
- **The claude.ai links** to these pages only change when someone republishes them with Claude. After you edit a file yourself, share the file (or its GitHub Pages address), not the old link.
