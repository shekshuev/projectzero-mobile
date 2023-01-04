import * as Location from "expo-location";

export async function getCoord(setIsLocationGranted) {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('notgrantedingetCoord')
        setIsLocationGranted( false );
        throw new Error('Permission to access location was denied');
    } else {
        let serviceEnabled = await Location.hasServicesEnabledAsync();
        if(serviceEnabled)
            return await Location.getCurrentPositionAsync({});
        else
            setIsLocationGranted( false );
            return {};
    }
}
