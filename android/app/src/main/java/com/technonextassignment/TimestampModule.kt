package com.technonextassignment

import android.os.Handler
import android.os.Looper
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.modules.core.DeviceEventManagerModule
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

class TimestampModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext) {

    private val handler = Handler(Looper.getMainLooper())
    private val interval = 20000L // 20 seconds

    override fun getName(): String {
        return "TimestampModule"
    }

    private val timestampRunnable = object : Runnable {
        override fun run() {
            sendCurrentTimestamp()
            handler.postDelayed(this, interval) // Schedule the next run
        }
    }

    private fun sendCurrentTimestamp() {
        val timestamp = SimpleDateFormat("MMM dd, yyyy HH:mm:ss", Locale.getDefault()).format(Date())
        val reactContext = reactApplicationContext
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
            .emit("TimestampEvent", timestamp)
    }

    @ReactMethod
    fun startTimestampUpdates() {
        handler.post(timestampRunnable) // Start the periodic updates
    }

    @ReactMethod
    fun stopTimestampUpdates() {
        handler.removeCallbacks(timestampRunnable) // Stop the updates
    }
}