import Foundation
import React

@objc(TimestampModule)
class TimestampModule: RCTEventEmitter {
    private var timer: Timer?

    override func supportedEvents() -> [String]! {
        return ["onTimestampUpdate"]
    }

    override func startObserving() {
        // Start listening for events
    }

    override func stopObserving() {
        // Stop listening for events
    }

    @objc
    func startTimestampUpdates() {
        stopTimestampUpdates() // Ensure no duplicate timers
        timer = Timer.scheduledTimer(timeInterval: 20.0, target: self, selector: #selector(sendTimestamp), userInfo: nil, repeats: true)
        RunLoop.main.add(timer!, forMode: .common) // Add to the main run loop
    }

    @objc
    func stopTimestampUpdates() {
        timer?.invalidate()
        timer = nil
    }

    @objc
    private func sendTimestamp() {
        let timestamp = Date().timeIntervalSince1970
        if let bridge = RCTBridge.current(), let eventEmitter = bridge.module(for: RCTEventEmitter.self) as? RCTEventEmitter {
            eventEmitter.sendEvent(withName: "onTimestampUpdate", body: Int(timestamp))
        }
    }

    @objc
    func start() {
        startTimestampUpdates()
    }

    @objc
    func stop() {
        stopTimestampUpdates()
    }

    @objc
    override static func requiresMainQueueSetup() -> Bool {
        return false
    }
}
