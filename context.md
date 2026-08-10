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

## Milestones

1. [x] Scaffold Expo app and run it on the phone (Expo Go)
2. [ ] Build `server/` Node HTTP API with a working YT search endpoint
3. [ ] App API layer + search screen with result list
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
- Next: Lesson 3 - build the Node YT extraction server.

### Session 3 - 2026-08-09
- Built server/index.js: Node HTTP server, routes /ping, /search?q=.
- Debugged youtubei.js v17 API changes (Innertube.create, music.search, nested
  MusicShelf result shape, duration object, thumbnail.contents path). Endpoint
  now returns real songs from YouTube.
- Milestone 2 complete: server search works (tested with curl).
- Next: Lesson 5 - phone search screen calling this server (fetch).

## Mentor Workflow

1. Mentor gives a lesson with a concrete coding task (files to create, commands to run).
2. Learner writes the code by hand and runs it.
3. Mentor reads the result, does a code review, patches that are wrong, explains.
4. Progress is recorded here with the date after each session.