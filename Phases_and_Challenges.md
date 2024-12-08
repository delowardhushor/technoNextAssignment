
# **Phases, Thinking Process, and Challenges**

This document explains the completed phases, the thinking process during development, and the challenges encountered.

---

## **Phase 1: Basic App Features**

### **Tasks:**
1. Displayed 10 products fetched from the API.
2. Implemented ascending/descending sorting.
3. Integrated geolocation to retrieve the user's current location.
4. Displayed a map with the user's current location pinpointed.
5. Built a product details screen.
6. Developed a cart screen with quantity adjustment (add/remove).

### **Thinking Process:**
- Started by analyzing the [Fake Store API](https://fakestoreapi.com/docs) documentation to understand available endpoints.
- Implemented Redux Toolkit for state management and RTK Query for API integration.
- Used `@react-native-community/geolocation` to retrieve the user's location.
- Chose Google Maps for the map implementation due to its extensive documentation and features.

### **Challenges:**
- **Geolocation Permissions:** Required careful handling of permissions for both Android and iOS platforms.

---

## **Phase 2: Offline Support**

### **Tasks:**
1. Cached product data locally to enable offline support.
2. Developed a "History" screen to display previously viewed products.
3. Handled network status changes dynamically.

### **Thinking Process:**
- Used Redux Persist to cache product data in local storage.
- Implemented `@react-native-community/netinfo` to monitor network status.
- Created logic to switch seamlessly between online and offline modes.

### **Challenges:**
- **Data Caching:** Ensuring Redux Persist worked correctly with nested slices like cart and history.
- **Offline Sync:** Handling data synchronization when the user returned online required precise management of Redux actions.

---

## **Phase 3: Native Module for Timestamp**

### **Tasks:**
1. Built a native module for Android and iOS to provide the current timestamp every 20 seconds.
2. Displayed the timestamp on the home screen in a fixed position.

### **Thinking Process:**
- Developed the Android module using Java and the iOS module using Objective-C.
- Integrated the module into the React Native bridge for cross-platform use.
- Used `moment` to format timestamps on the frontend.

### **Challenges:**
- **iOS Native Module:** Initial integration errors due to incorrect header imports. Fixed by following the official React Native documentation.
- **Formatting Issues:** Encountered "Invalid date" errors with `moment`, resolved by verifying input formats.

---

## **General Challenges**
1. **Cross-Platform Compatibility:** Ensuring consistent functionality between Android and iOS.
2. **Redux Toolkit Integration:** Encountered issues with combining reducers and adding RTK Query's API reducer to the store. Fixed by using `combineReducers` and carefully configuring `persistReducer`.
3. **Debugging Native Code:** Debugging native modules required a deeper understanding of Java and Objective-C.


