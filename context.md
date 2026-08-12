# Tunix - Project Context

A classic Android music player built with React Native (Expo) that plays audio from
YouTube and supports background / lock-screen playback. Built as a learning project
with a mentor-guided workflow: the learner writes every line, the mentor reviews
and explains.

## Project Decisions

- Target: physical Android phone over USB (Expo Go for Phase 1, dev build later)
- Framework: Expo (managed), will create a development build when we hit TrackPlayer
- Playback: react-native-track-player (native ExoPlayer) for background audio
- Data layer: separate Node server in `server/` using `youtubei.js` for extraction,
  the app talks to this server over LAN. Keeps YT internals out of the app and lets
  us test server logic on the laptop.
- State: React Query for server data, Zustand for global UI state
- Storage: react-native-mmkv
- Navigation: expo-router (default in Expo template)
- "Classic" player, no fancy UI, no auth of any kind
- Rule agreed: no emojis anywhere in this session, project, or docs

## Lesson Plan (mentor -> learner)

Progress levels: [x] done, [ ] todo

1. [x] Lesson 1 - Scaffold Expo app (npm install gotcha: same-step reminder)
2. [x] Lesson 2 - Run app on phone via Expo Go; clean template demo code
3. [x] Lesson 3 - Node server part 1: hello-world HTTP server + curl test
4. [x] Lesson 4 - Server search endpoint (youtubei.js v17 API debugging)
5. [x] Lesson 5 - Phone app API layer + search screen design (NOT yet written in code)
6. [x] Lesson 6 - YouTube-WIDE search (remixes/slowed/reverb) + field mapping fix
7. [ ] Lesson 7 - Working stream URL extraction (BLOCKED: parser drops url/cipher)
8. [ ] Lesson 8 - App: search screen final (TextInput + FlatList)
9. [ ] Lesson 9 - Dev build + react-native-track-player install
10. [ ] Lesson 10 - Playback service: queue, play/pause/seek, TrackPlayer events
11. [ ] Lesson 11 - Background playback + lock screen controls + media notification
12. [ ] Lesson 12 - Player UI: mini-player + now-playing screen
13. [ ] Lesson 13 - Favorites / history persistence (MMKV)

## Milestones

1. [x] Scaffold Expo app and run it on the phone (Expo Go)
2. [x] Build `server/` Node HTTP API with a working YT search endpoint
3. [ ] App API layer + search screen with result list  (api.ts + index.tsx written by learner)
4. [ ] Dev build + react-native-track-player install
5. [ ] Playback service: queue, play/pause/seek, TrackPlayer events
6. [ ] Background playback + lock screen controls + media notification
7. [ ] Player UI: mini-player + now-playing screen
8. [ ] Favorites / history persistence (MMKV)

## Session Log

### Session 1 - 2026-08-09
- Analyzed a React Native + YouTube Music stack reference document.
- Agreed stack: Expo + react-native-track-player + custom Node extraction server.
- Wrote initial project plan, todo list, and this context.md.

### Session 2 - 2026-08-09
- Scaffolded Expo SDK 54 app, verified it renders on the phone in Expo Go.
- Removed template demo code (components/hooks/constants/scripts) and kept a minimal
  app/_layout.tsx + app/index.tsx.
- Confirmed: no auth in the app.

### Session 3 - 2026-08-09
- Built server/index.js: Node HTTP server, routes /ping, /search?q=.
- Debugged youtubei.js v17 API changes. Endpoint returned official-catalog songs only.
- Fixed to YouTube-WIDE search (videos incl. remixes/slowed/reverb) at /search.
- Fixed searched-field mapping (duration/thumbnail keys).
- Milestone 2 complete: server search works (verified via curl).
- Known blocker (Lesson 7): playing a video needs a direct stream URL; youtubei.js v17
  parsed Format objects expose url/signature_cipher/cipher as undefined even though the
  raw API response contains them. Next server task.

## Bugs / notes tracking

- EADDRINUSE: old `node index.js` kept port 8080 - kill with `lsof -ti:8080 | xargs kill -9`
- Search results "videos" now come from `results.videos`, NOT `results.results`.
  (learner code uses results.videos; verified - works)
- `duration` is `video.duration?.text` (e.g. "5:28") - string, not seconds.
  Keep as display string for now; may need seconds for TrackPlayer later.

## Mentor Workflow

1. Mentor gives a lesson with a concrete coding task (files to create, commands to run).
2. Learner writes the code by hand and runs it.
3. Mentor reads the result, does a code review, patches that are wrong, explains.
4. Progress is recorded here with the date after each session.