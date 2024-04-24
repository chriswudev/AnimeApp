# Anime App

Anime App is a mobile application built with React Native, designed to provide anime enthusiasts with a user-friendly interface to browse, search, and favorite anime titles. The app utilizes a modern UI/UX design, featuring pagination, search functionalities, and a favorites system.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Before running the project, ensure you have the following installed:
- Node.js
- npm or yarn
- React Native environment setup ([React Native CLI Quickstart](https://reactnative.dev/docs/environment-setup))

### Installing

A step by step series of examples that tell you how to get a development environment running:

1. Clone the repo:
   ```bash
   git clone https://github.com/chriswudev/AnimeApp.git
   ```
2. Install dependencies:
   ```bash
   cd AnimeApp
   npm install
   # OR using Yarn
   yarn install
   ```
3. Run the app:
   ```bash
   npx react-native run-android
   ```
   or
   ```bash
   npx react-native run-ios
   ```

## Libraries Used

- **React Navigation**: Used for managing the navigation between screens.
- **Redux and Redux Toolkit**: State management tools used to manage the state of favorites and fetching data.
- **Axios**: For making API requests to fetch anime data.
- **AsyncStorage**: To persist favorite animes locally on the device.
- **React Native Vector Icons**: To enhance the UI with icons.

## Screenshots

Here is a gif of the app in action:

![Demo](./demo/demo.gif)

## Future Improvements

With more time, the following improvements would be considered:
- **Offline Support**: Implementing full offline support so users can view previously loaded animes even when they're offline.
- **Advanced Search**: Adding filter options to the search, allowing users to narrow down results based on genre, year, etc.
- **User Accounts and Syncing**: Integrating user account creation and allowing users to sync their favorites across multiple devices.
- **Performance Optimization**: Implement lazy loading images and better state management to improve app performance and responsiveness.
- **Accessibility Enhancements**: Ensuring the app is fully accessible, including screen reader support and enhanced touch targets for better usability.
