
# **TechnoNextAssignment**

A React Native application for an e-commerce catalog with product listing, cart management, offline support, and a native timestamp module.

## **Features**
1. **Phase 1:**
   - Product listing (10 products).
   - Ascending/descending sorting.
   - Geolocation tracking and display on a map.
   - Product details screen.
   - Cart management (add, remove, quantity adjustment).
   
2. **Phase 2:**
   - Offline mode with cached product history.
   - View previously visited products in offline mode.
   - Handle network changes gracefully.

3. **Phase 3:**
   - Native timestamp module.
   - Periodic updates every 20 seconds with timestamp display on the home screen.

---

## **Prerequisites**
- **Node.js:** v16.x or later.
- **Yarn:** Recommended (optional, you can use `npm`).
- **React Native CLI** or **Expo CLI** (if using Expo).
- **Android Studio** (for Android builds).
- **Xcode** (for iOS builds).

---

## **Setup Instructions**

### 1. Clone the Repository
```bash
git clone https://github.com/delowardhushor/technoNextAssignment
cd technoNextAssignment
```

### 2. Install Dependencies
```bash
yarn install
```
or
```bash
npm install
```

---

### 3. Run the Application

#### **For Android:**
1. Start the Metro bundler:
   ```bash
   npx react-native start
   ```
2. Run the app on an Android emulator or device:
   ```bash
   npx react-native run-android
   ```

#### **For iOS:**
1. Install CocoaPods dependencies:
   ```bash
   cd ios && pod install && cd ..
   ```
2. Run the app on an iOS simulator or device:
   ```bash
   npx react-native run-ios
   ```

#### **Run Metro with Cache Reset (if necessary):**
```bash
npx react-native start --reset-cache
```

---

### 4. Native Modules (TimestampModule)

#### **For Android:**
The native module is already integrated. No additional setup is required.

#### **For iOS:**
Ensure you’ve set up your Xcode environment:
1. Open `ios/TechnoNextAssignment.xcworkspace` in Xcode.
2. Build the project (`Command + B`).
3. Run the app on the simulator or device.

---

### 5. Environment Variables
If using Google Maps or other APIs, ensure to add your API keys:
1. **Android:**  
   Add your API key in `android/app/src/main/AndroidManifest.xml`.
2. **iOS:**  
   Add your API key in `AppDelegate.m` or `.plist` file.

---

## **Build and Package**

### **Android (APK or AAB):**
1. Generate a release APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   The APK will be located in `android/app/build/outputs/apk/release/`.

2. Generate an AAB:
   ```bash
   ./gradlew bundleRelease
   ```
   The AAB will be located in `android/app/build/outputs/bundle/release/`.

---

### **iOS:**
1. Open `ios/TechnoNextAssignment.xcworkspace` in Xcode.
2. Set the build scheme to `Release`.
3. Archive the project (`Product > Archive`) and export the `.ipa` file.

---

## **Additional Notes**
1. **Redux Persist:** Handles offline caching for product history.
2. **Geolocation Permissions:** Ensure location permissions are enabled in the app settings.
3. **Network Status Handling:** Implemented using `@react-native-community/netinfo`.

---

## **Troubleshooting**
- **Invalid date in timestamp module:** Ensure the native module is correctly registered, and you're using a supported date formatter like `moment` or `date-fns`.
- **Native module issues:** Clear the Metro bundler cache:
  ```bash
  npx react-native start --reset-cache
  ```
- **Permission issues:** Verify location and network permissions in both Android and iOS settings.

---

## **Contact**
For any questions or issues, contact **Delowar Hossain** at **delowardhushor@gmail.com**.
