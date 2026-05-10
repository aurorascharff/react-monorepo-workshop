# Instructor Notes

Internal notes for Aurora. Keep this open on a second screen.

Use [`WORKSHOP.md`](WORKSHOP.md) for schedule, module goals, and slide outline. Use [`steps/step-notes`](steps/step-notes) for live coding.

## Prep

Day before:

- [ ] Fresh clone workshop-specific participant repo.
- [ ] `npm install`
- [ ] `npm run db:seed`
- [ ] `npm run dev`
- [ ] Check Arena: `http://localhost:5173`
- [ ] Check API docs: `http://localhost:3001`
- [ ] Check medix.com: `http://localhost:3000`
- [ ] `npm run typecheck`
- [ ] `npm run test`
- [ ] `npm run e2e`
- [ ] Projector or screen works.
- [ ] Slides ready and linked from `WORKSHOP.md`.
- [ ] Participant list ready if needed.

Morning:

- [ ] Arrive 30 min early.
- [ ] Start dev server.
- [ ] Open Arena at `/patients`.
- [ ] Open API docs.
- [ ] Open final reference repo and workshop-specific participant repo.
- [ ] Open `WORKSHOP.md`, current `steps/step-notes/stepN.md`, and `steps/`.
- [ ] Open README for the setup and repo walkthrough.
- [ ] Check Copilot ghost text is available.
- [ ] Check Chrome DevTools is docked where the room can see it.
- [ ] Check TanStack Query Devtools appears in Arena.
- [ ] Mute phone, Slack, Teams, desktop notifications.
- [ ] Check actual start time and decide first break.
- [ ] Put water nearby.

Workshop-day repo:

- [ ] Create a workshop-specific participant repo from the private starter template.
- [ ] Push before participants begin.
- [ ] Commit between modules so participants can recover.

## Screen And Editor

Share one external screen to Teams, Zoom, or projector. Keep the main display private.

Attendee screen:

- Space 1: slides and terminal.
- Space 2: code and running app side by side.
- Space 3: Excalidraw, docs/resources page, GitHub workshop repo.
- Zoom code, app, console, docs, and GitHub enough for the room.
- Use light mode if the room or projector makes dark mode hard to read.

Instructor screen:

- Space 1: desktop and browser.
- Space 2: `WORKSHOP.md`, current `steps/step-notes/stepN.md`, and code.
- Space 3: completed app or finished snapshot.

Editor:

- Word wrap on.
- Code popups off.
- Copilot ghost text on.
- GitLens off.
- Spell checker off.
- Bookmarks hidden.
- Open the next files during breaks.

## Teaching Reminders

> Slow down. Look at the room. Ask questions. Breathe. Have fun. There is enough time.

- Slower is more important than finishing.
- Pause before moving on.
- Check that the room is with me, not just that the code works.
- Comment while coding.
- Narrate Copilot suggestions: accept, edit, or reject.
- Walk around.
- Check every group, not only the loud ones.
- Give more positive feedback.
- Be clear: what are we doing, when is break, when are we back.
- Do not mumble.
- Keep hands away from face.
- When participants use AI, ask them what changed and why they trust it.
- Keep DevTools zoomed enough that Network requests, link semantics, and form labels are readable.

## Room

- Expected room: about 40 participants.
- Groups of about 5 people work well.
- With 40 participants, aim for about 8 groups.
- Mix experience and teams if needed.
- Do not stay behind the podium for more than 10 min.
- Listen for repeated confusion while walking around.

If someone dominates:

> Thanks, let's hear from someone else.

If a debate goes too long:

> Both are valid. Let's move on and see what the code needs here.

If a question is useful but off-topic:

> Good question. Can we take it after?

## Task Flow

- Do not announce the next task too early.
- Pause after everyone is ready, not only after I finish coding.
- If people move ahead too soon:

> I will finish this at the end of the workshop. Right now we are staying focused here.

If people are lost:

> Raise your hand if this makes sense.

If fewer than half raise hands:

- Slow down.
- Do the next step on screen together.
- Name the confusing part.
- Let faster groups help slower groups.

Useful phrase:

> This is the common mistake. Do not worry.

## Breaks

- Stop at the planned break even if the current module got messy.
- Reset data with `npm run db:seed` if needed.
- Open the next module files during the break.
- Check the next `steps/step-notes/stepN.md` before restarting.
- Make sure the last module is committed and pushed before wrap-up if participants need the reference.

## If Tech Breaks

- Stay calm.
- `npm run db:seed` if data gets messy.
- Use `steps/stepN` as finished snapshot.
- Use final reference repo as reference.
- Use slides, screenshots, or whiteboard for the concept.
- Keep moving. Clarity matters more than perfect tooling.

## Phrases

Opening:

> Today is not about learning every React API. It is about recognizing the problems that show up in larger React apps.

After a fix:

> Do you see the difference? This is why the pattern exists.

Discussion:

> What did you try first, and where did it start to feel unclear?

Wrap-up:

> Use this as a reference. Perfect code on day one is not the goal.

## Follow-Up

- [ ] Send workshop-specific participant repo.
- [ ] Send final reference repo or reference snapshots.
- [ ] Send certification or further learning links.
- [ ] Note what worked.
- [ ] Note what to improve.
- [ ] Note where the room needed more time.
