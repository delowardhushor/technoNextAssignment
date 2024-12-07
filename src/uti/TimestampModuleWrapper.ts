import { NativeModules, NativeEventEmitter } from 'react-native';

const { TimestampModule } = NativeModules;

export const startTimestampUpdates = () => {
    TimestampModule.start();
};

export const stopTimestampUpdates = () => {
    TimestampModule.stop();
};

const eventEmitter = new NativeEventEmitter(TimestampModule);

export const onTimestampUpdate = (callback: (timestamp: number) => void) => {
    const subscription = eventEmitter.addListener("onTimestampUpdate", callback);
    return () => subscription.remove();
};
