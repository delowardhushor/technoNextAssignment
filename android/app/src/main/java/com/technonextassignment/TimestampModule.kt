package com.technonextassignment

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule

class TimestampModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

    private val handler = Handler(Looper.getMainLooper())
    private var runnable: Runnable? = null

    override fun getName(): String {
        return "TimestampModule"
    }

    @ReactMethod
    fun startTimestampUpdates() {
        // Create a runnable to emit events every 20 seconds
        runnable = Runnable {
            val timestamp = System.currentTimeMillis() // Get current time in milliseconds
            sendTimestampEvent(timestamp)
            handler.postDelayed(runnable!!, 20000) // Repeat every 20 seconds
        }
        handler.post(runnable!!)
    }

    @ReactMethod
    fun stopTimestampUpdates() {
        runnable?.let { handler.removeCallbacks(it) }
        runnable = null
    }

    private fun sendTimestampEvent(timestamp: Long) {
        reactApplicationContext
            .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("TimestampEvent", timestamp.toString()) // Emit the event as a string
    }
}