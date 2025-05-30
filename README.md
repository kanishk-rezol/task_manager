# 📝 Task Manager App

A cross-platform **Task Management App** built using **React Native**, **Expo**, **TypeScript**, **Redux**, and **React Navigation**. It allows users to add, view, and update task statuses, all integrated with an external API.

## 📱 Features

- 🗂 View all tasks
- ➕ Add new tasks
- ✅ Toggle task completion
- 🔄 Real-time UI updates using Redux
- 🌐 Integrated with REST API (Axios)
- 🎨 Clean UI with shadow styling
- 🚀 Cross-platform support (Android & iOS)

---

## 🛠 Tech Stack

- [React Native](https://reactnative.dev/)
- [Expo](https://expo.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Navigation](https://reactnavigation.org/)
- [Axios](https://axios-http.com/)

---

## 🚀 Getting Started

### Prerequisites

- npm or yarn
- Expo CLI:  

 ```bash
  npm install -g expo-cli
```

## Get the Project

```bash
git clone https://github.com/your-username/task-manager-app.git
cd task-manager-app
```

## Install dependencies:

```bash
npm install
Start the development server:
```

```bash

expo start
```

## Build APK
Install EAS CLI:

```bash

npm install -g eas-cli
eas login
eas build:configure
eas build -p android --profile preview
```

This will generate a downloadable .apk link upon completion.