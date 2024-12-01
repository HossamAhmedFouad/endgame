# React Native Android Application with Firebase Cloud Messaging (FCM)

## Project Overview  
This is a React Native Android application that provides users with a basic interface to manage subscription channels. Users can subscribe or unsubscribe from channels, and notifications are managed using Firebase Cloud Messaging (FCM), supporting both foreground and background notifications.

---

## Features  
### Channel Management  
- Users can view a list of channels.  
- Subscribe or unsubscribe from individual channels.  

### Push Notifications  
- FCM integration to deliver notifications when the app is in the foreground or background.  

---

## Setup Instructions  

### 1. Clone the Repository  
```bash
git clone <repository-url>
cd <project-directory>
```


### 2. Install Dependencies
```bash
npm install
```


### 3. Firebase Setup
- Create a Firebase project in the [Firebase Console](https://console.firebase.google.com).
- Add an Android app to your project and download the google-services.json file.
- Place the google-services.json file in the android/app directory of your project.


### 4. Configure FCM
- Enable Firebase Cloud Messaging in your Firebase project.
- Add the FCM configuration to your application as described in the [Firebase Docs](https://firebase.google.com/docs).

### 5. Run the Application
```bash
npx expo start
```

---
### Usage Instructions
- Open the application on an Android device.
- View the list of available channels.
- Tap a channel to subscribe or unsubscribe.
- Notifications will be received for subscribed channels.

---

### Dependencies
- React Native
- Firebase Cloud Messaging (FCM)
- @react-native-firebase/app
- @react-native-firebase/messaging

---

### License
This project is licensed under the MIT License. See the ```LICENSE``` file for details.
