## Handleliste Expo

Simple, offline‑first shopping list app built with **React Native** and **Expo**.  
You can create multiple lists, add items, mark them as done, reorder them, and everything is stored locally on the device.

---

### Features

- **Multiple lists**: Create and manage several named shopping lists.
- **List tabs**: Quickly switch between lists using a horizontal tab bar.
- **Add items**: Add new items to the active list with a text input.
- **Mark as done**: Toggle items as done / not done; done items are grouped at the bottom.
- **Rename & delete lists**: Long‑press a list tab to rename or delete it (with confirmation).
- **Offline storage**: Lists are saved locally on the device using Expo File System (`expo-file-system`), so they persist between app launches.
- **Error boundary**: Basic error boundary component wraps the app to avoid full crashes.

---

### Tech Stack

- **Framework**: Expo (`expo@~54`) + React Native (`react-native@0.81`)
- **Language**: TypeScript
- **Navigation**: `@react-navigation/native` + `@react-navigation/native-stack`
- **State management**: React Context (`ListsContext`) for lists and items
- **Persistence**: Custom `FileStorageService` built on top of `expo-file-system`
- **UI helpers**:
    - `react-native-safe-area-context` for safe area handling
    - `react-native-gesture-handler`, `react-native-reanimated` for gestures/animations
    - `react-native-draggable-flatlist` for drag‑and‑drop reordering

---

### Project Structure (simplified)

- `App.tsx` – App bootstrap: navigation container, stack navigator, error boundary, and `ListsProvider`.
- `index.ts` – Registers the root Expo component.
- `src/`
    - `screens/HomeScreen.tsx` – Main screen that shows list tabs, the input field, and the current list items.
    - `components/`
        - `ListTabs.tsx` – Horizontal tabs for switching/creating/renaming/deleting lists.
        - `InputField.tsx` – Text input component for adding new items to the active list.
        - `ListItem.tsx` – A single list item with toggle/delete actions and drag handle (if implemented there).
        - `ErrorBoundary.tsx` – Catches rendering errors and shows a fallback UI.
    - `contexts/ListsContext.tsx` – Holds all lists, the active list, and operations (create, delete, rename, add item, toggle item, delete item, reorder items) and persists changes.
    - `models/` – TypeScript models for lists and list items.
    - `services/FileStorageService.ts` – Reading/writing lists to the device file system.
    - `utils/` – Utility helpers such as `uuid` and sorting helpers.

---

### Prerequisites

- **Node.js** (LTS recommended)
- **Expo CLI** (installed globally or via `npx`)
- A recent version of **Expo Go** on your Android/iOS device *or* Android Studio / Xcode for emulators/simulators.

---

### Installation

```bash
# Install dependencies
npm install
```

If you have never used Expo on this machine before, you may also want:

```bash
npm install -g expo
```

---

### Running the App (Development)

From the project root:

```bash
npm start
```

This will start the Expo development server (Metro bundler).  
You can then:

- **Open on Android**: press `a` in the terminal (Android emulator must be running), or scan the QR code with Expo Go on an Android device.
- **Open on iOS**: press `i` (macOS + Xcode simulator), or scan the QR code with Expo Go on an iOS device.
- **Open on Web**: press `w` to run the web version in a browser.

Alternatively, you can use the convenience scripts:

```bash
npm run android
npm run ios
npm run web
```

---

### EAS Configuration (Build & Submit)

This project is configured for **Expo Application Services (EAS)**:

- `eas.json` defines build profiles (`development`, `preview`, `production`) and submit configuration.
- `app.json` contains the Expo app config, including icons, splash screen, Android package (`com.dannx.handlelisteexpo`) and EAS project ID.

Examples (requires `eas-cli` and an Expo account):

```bash
# Install EAS CLI (if not installed)
npm install -g eas-cli

# Configure once
eas login

# Build for development (internal distribution)
eas build --profile development --platform android

# Build for production
eas build --profile production --platform android
```

---

### Usage Overview

- **Create a list**: Tap `+ Ny liste` in the tabs bar.
- **Switch lists**: Tap a list tab.
- **Rename a list**: Long‑press a list tab, choose "Endre navn", then type the new name and confirm.
- **Delete a list**: Long‑press a list tab, choose "Slett", and confirm in the dialog.
- **Add item**: Type text in the input field on the active list and submit.
- **Toggle item**: Tap the item (or a checkbox) to mark it as done / not done.
- **Delete item**: Use the delete action on the item (e.g. trash icon / button) and confirm if prompted.
- **Reorder items**: Long‑press and drag an item (if drag handle is visible) to change its position within the list.

---

### Development Notes

- Lists and items are stored locally on the device file system. When changing the shape of list or item models, update both the TypeScript models and any serialization/deserialization logic in `FileStorageService`.
- The app currently assumes a light theme (`userInterfaceStyle: "light"` in `app.json`).
- The UI is currently in Norwegian; Internationaliztion is a point for further developemt.

---

## Handleliste Expo

Simple, offline‑first shopping list app built with **React Native** and **Expo**.  
You can create multiple lists, add items, mark them as done, reorder them, and everything is stored locally on the device.

---

### Features

- **Multiple lists**: Create and manage several named shopping lists.
- **List tabs**: Quickly switch between lists using a horizontal tab bar.
- **Add items**: Add new items to the active list with a text input.
- **Mark as done**: Toggle items as done / not done; done items are grouped at the bottom.
- **Rename & delete lists**: Long‑press a list tab to rename or delete it (with confirmation).
- **Offline storage**: Lists are saved locally on the device using Expo File System (`expo-file-system`), so they persist between app launches.
- **Error boundary**: Basic error boundary component wraps the app to avoid full crashes.

---

### Tech Stack

- **Framework**: Expo (`expo@~54`) + React Native (`react-native@0.81`)
- **Language**: TypeScript
- **Navigation**: `@react-navigation/native` + `@react-navigation/native-stack`
- **State management**: React Context (`ListsContext`) for lists and items
- **Persistence**: Custom `FileStorageService` built on top of `expo-file-system`
- **UI helpers**:
    - `react-native-safe-area-context` for safe area handling
    - `react-native-gesture-handler`, `react-native-reanimated` for gestures/animations
    - `react-native-draggable-flatlist` for drag‑and‑drop reordering

---

### Project Structure (simplified)

- `App.tsx` – App bootstrap: navigation container, stack navigator, error boundary, and `ListsProvider`.
- `index.ts` – Registers the root Expo component.
- `src/`
    - `screens/HomeScreen.tsx` – Main screen that shows list tabs, the input field, and the current list items.
    - `components/`
        - `ListTabs.tsx` – Horizontal tabs for switching/creating/renaming/deleting lists.
        - `InputField.tsx` – Text input component for adding new items to the active list.
        - `ListItem.tsx` – A single list item with toggle/delete actions and drag handle (if implemented there).
        - `ErrorBoundary.tsx` – Catches rendering errors and shows a fallback UI.
    - `contexts/ListsContext.tsx` – Holds all lists, the active list, and operations (create, delete, rename, add item, toggle item, delete item, reorder items) and persists changes.
    - `models/` – TypeScript models for lists and list items.
    - `services/FileStorageService.ts` – Reading/writing lists to the device file system.
    - `utils/` – Utility helpers such as `uuid` and sorting helpers.

---

### Prerequisites

- **Node.js** (LTS recommended)
- **Expo CLI** (installed globally or via `npx`)
- A recent version of **Expo Go** on your Android/iOS device *or* Android Studio / Xcode for emulators/simulators.

---
### Development & Test Environment

| Component | Version / Details    |
|---|----------------------|
| Node.js | 22.14.0              |
| Expo SDK | 54.0.16              |
| Android Emulator | API level 36         |
| Physical device | Samsung Galaxy Phone |
| └─ One UI | 5.1                  |
| └─ Android | 13                   |

### Installation

```bash
# Install dependencies
npm install
```

If you have never used Expo on this machine before, you may also want:

```bash
npm install -g expo
```

---

### Running the App (Development)

From the project root:

```bash
npm start
```

This will start the Expo development server (Metro bundler).  
You can then:

- **Open on Android**: press `a` in the terminal (Android emulator must be running), or scan the QR code with Expo Go on an Android device.
- **Open on iOS**: press `i` (macOS + Xcode simulator), or scan the QR code with Expo Go on an iOS device.
- **Open on Web**: press `w` to run the web version in a browser.

Alternatively, you can use the convenience scripts:

```bash
npm run android
npm run ios
npm run web
```

---

### EAS Configuration (Build & Submit)

This project is configured for **Expo Application Services (EAS)**:

- `eas.json` defines build profiles (`development`, `preview`, `production`) and submit configuration.
- `app.json` contains the Expo app config, including icons, splash screen, Android package (`com.dannx.handlelisteexpo`) and EAS project ID.

Examples (requires `eas-cli` and an Expo account):

```bash
# Install EAS CLI (if not installed)
npm install -g eas-cli

# Configure once
eas login

# Build for development (internal distribution)
eas build --profile development --platform android

# Build for production
eas build --profile production --platform android
```

---

### Usage Overview

- **Create a list**: Tap `+ Ny liste` in the tabs bar.
- **Switch lists**: Tap a list tab.
- **Rename a list**: Long‑press a list tab, choose "Endre navn", then type the new name and confirm.
- **Delete a list**: Long‑press a list tab, choose "Slett", and confirm in the dialog.
- **Add item**: Type text in the input field on the active list and submit.
- **Toggle item**: Tap the item (or a checkbox) to mark it as done / not done.
- **Delete item**: Use the delete action on the item (e.g. trash icon / button) and confirm if prompted.
- **Reorder items**: Long‑press and drag an item (if drag handle is visible) to change its position within the list.

---

### Development Notes

- Lists and items are stored locally on the device file system. When changing the shape of list or item models, update both the TypeScript models and any serialization/deserialization logic in `FileStorageService`.
- The app currently assumes a light theme (`userInterfaceStyle: "light"` in `app.json`).
- The UI is currently in Norwegian; Internationaliztion is a point for further developemt.

---

