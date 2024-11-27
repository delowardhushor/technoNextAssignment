import { useEffect, useState } from "react";
import { Light } from "./light";
import { Dark } from "./dark";
import { useAppSelector } from "../redux/storeHooks";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
    rowCenter:{
        flexDirection: "row",
        alignItems: "center"
    },
    rowCenterCenter:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    rowCenterBetween:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    rowCenterAround:{
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    rowCenterEnd:{
        flexDirection: "row",
        justifyContent: "flex-end",
        alignItems: "center"
    },
    rowEndCenter:{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end"
    },
    globalPadding:{
        paddingHorizontal: 15,
    },
    shadow: {
        shadowColor: "#999",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5
    },
})

export function useTheme(){

    const [colors, SetColors] = useState(Light);
    const [activeTheme, SetactiveTheme] = useState("Light");

    // const theme = useAppSelector((state) => state.setting.theme)
    const theme = "Light"

    useEffect(() => {

        if(theme == "Light"){
            SetColors(Light);
            SetactiveTheme("Light");
        }else if(theme == "Dark"){
            SetColors(Dark);
            SetactiveTheme("Dark");
        }

    }, [theme])

    return {
        colors,
        activeTheme,
    }
}