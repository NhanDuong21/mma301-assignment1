# AI Usage Log

## 2026-10-04 — M0: Milestone workflow and Expo baseline

### Task / Prompt / Reference

- The student asked AI to act as a senior pair programmer and tutor for MMA301 Assignment 1, implementing one requested milestone at a time and explaining WHY, WHAT, FLOW, and FAILURE.
- Requested milestone: **M0 — Expo Bootstrap & Environment Baseline**, an internal learning milestone before M1.
- Scope: blank JavaScript Expo project at repository root, minimal App.js, README, AI usage log, actual verification, one bootstrap commit and push to main.
- Explicit exclusions: navigation, multiple screens, Context API, AsyncStorage, forms, FlatList, themes, Firebase, backend, TypeScript, and complex architecture.
- Repository: https://github.com/NhanDuong21/mma301-assignment1
- References: https://docs.expo.dev/more/create-expo/ and https://reactnative.dev/docs/intro-react

### Purpose

Establish a small, readable React Native + Expo baseline and a milestone-based learning workflow. Keep evidence clear enough for the student to explain and reproduce in an interview.

### AI output used

- Read-only environment and Git preflight.
- Official Expo blank-template generation, selective copy into the existing repository, and npm dependency installation.
- App.js with one View, two Text elements, and StyleSheet.create.
- Project naming in package.json and app.json; README setup and file-role explanations.
- Verification commands, dependency warning investigation, and this log.
- A milestone handoff explaining the execution flow, core concepts, interview questions, tests, and observed issues.

### What I changed/adapted

- AI adapted the template to the existing repository rather than replacing its Git history. The temporary template's .git was not copied.
- Changed the temporary generated package name and app slug to mma301-assignment1; display name to MMA301 Assignment 1.
- Replaced the template placeholder with the two requested baseline lines, centered with simple styles.
- Removed the unused expo-status-bar dependency and the web script; M0 targets the native Expo baseline and does not install web-only dependencies.
- Retained template assets and its license. Added .env to .gitignore.
- Converted the original README from UTF-16 LE to UTF-8 and replaced its one-line content with setup instructions.
- No student code edits or student device verification have been claimed. The edits and command checks in this entry were performed by the AI agent.

### How it was verified

Checks performed on Windows in the repository root on 2026-10-04 (Asia/Saigon):

| Command / check | Actual result |
| --- | --- |
| node -v | v24.15.0 |
| npm -v | 11.12.1 |
| git status (preflight) | main, up to date with origin/main, clean |
| git branch --show-current | main |
| git log --oneline -5 (preflight) | e1030d2 first commit |
| npx --yes create-expo-app@latest --help | Confirmed blank, --no-install, --no-agents-md options |
| npx --yes create-expo-app@latest <temporary-path> --template blank --no-install --no-agents-md --yes | Template generated successfully outside repository; selected files copied to root |
| npm install | Exit 0; added 463 packages, audited 464; dependency warnings listed below |
| npm ls --depth=0 | Exit 0; expo 57.0.26, react 19.2.3, react-native 0.86.3 |
| npx expo config --type public | Exit 0; expected app name/slug, SDK 57, Android/iOS platforms and asset paths |
| npx expo install --check | Exit 0; Dependencies are up to date |
| npx --yes expo-doctor | Exit 0; 21/21 checks passed |
| npm start -- --localhost --port 8081 (CI=1 for this agent session) | Expo/Metro started and waited on http://localhost:8081; CI mode intentionally disables reloads |
| GET http://localhost:8081/status | HTTP 200; decoded body packager-status:running |
| GET /index.bundle?platform=android&dev=true&minify=false | HTTP 200; 4,152,626 characters; both baseline strings present |
| GET /index.bundle?platform=ios&dev=true&minify=false | HTTP 200; 4,144,068 characters; both baseline strings present |
| git check-ignore node_modules .expo | Both directories ignored |
| Strict UTF-8 decoding of README.md and docs/AI_USAGE_LOG.md | Both documents decoded successfully and were non-empty |
| git diff --cached --check | Exit 0; no whitespace errors in the staged changes |
| npm audit --json | Exit 1; 23 dependency vulnerability entries: 7 moderate, 16 high, 0 critical |

The temporary CI setting applies only to the verification process; it is not saved in the project. Normal npm start enables the usual development workflow.

**Verification boundary:** project configuration, dependency compatibility, Metro startup, and Android/iOS JavaScript bundling passed. No physical device, emulator, simulator, visual UI rendering, or Fast Refresh interaction was tested. The student still needs to open the app in compatible Expo Go and confirm both lines appear.

### Observed issues / debug evidence

#### README editing: fixed

- Symptom: apply_patch rejected README.md with an invalid UTF-8 sequence at byte 0.
- Hypothesis: the pre-existing README used a different text encoding.
- Root cause: reading the raw bytes showed FF-FE followed by UTF-16 LE character bytes.
- Fix: decode the existing README and write UTF-8 without BOM before editing it.
- Retest: apply_patch then succeeded; the updated README is readable as UTF-8.

#### Dependency warnings: unresolved upstream baseline findings

- Symptom: npm install emitted a uuid@7.0.3 deprecation warning and reported 23 vulnerability entries.
- Hypothesis: the fresh template's dependency tree contains packages covered by npm advisories.
- Root cause: npm audit identified advisory chains involving braces/micromatch, node-forge, and uuid, propagated through Expo/Metro/React Native dependencies. Counts include affected parent packages, not 23 separate application-code defects.
- Disposition: retained the SDK-compatible template versions. Some audit recommendations would downgrade Expo to 44.0.6 or React Native to 0.72.17, which would disrupt this SDK 57 baseline. No forced fix, dependency override, or claim of security clearance was made.
- Retest/evidence: npm audit still reports 23 entries; Expo dependency check and all 21 doctor checks pass; Android/iOS bundling succeeds. Security findings remain open and are separate from successful startup/bundling checks.

#### Non-blocking observations

- Git warned that text files' LF line endings will become CRLF under the current Windows Git configuration. This is line-ending normalization, not a runtime failure.
- Metro workers warned that NO_COLOR is ignored when FORCE_COLOR is set in the terminal environment. Bundling still succeeded; this warning concerns output colors.
- PowerShell returned the Metro status response as bytes initially; decoding as UTF-8 confirmed packager-status:running. The initial numeric output was a response-display issue, not a Metro error.

No application-code defect was observed during configuration/startup/bundling checks. Native runtime and visual behavior remain unverified.
