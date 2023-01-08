import { Appbar, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { logout } from "@features/auth/authSlice";
import { ROOT_ACCOUNT } from "@navigation/routes";
import { isTokenStillFresh } from "@utils/jwt";

const AppBar = ({ navigation, back, options, backgroundColor }) => {
    const theme = useTheme();
    const dispatch = useDispatch();
    const accessToken = useSelector(state => state.auth.accessToken);

    const [isSignedIn, setSignedIn] = useState(isTokenStillFresh(accessToken));

    useEffect(() => setSignedIn(isTokenStillFresh(accessToken)), [accessToken]);

    const goToLoginScreen = () => {
        dispatch(logout());
    };

    const goToAccountScreen = () => {
        navigation.navigate(ROOT_ACCOUNT);
    };

    return (
        <Appbar.Header elevated style={{ backgroundColor: backgroundColor || theme.colors.elevation.level2 }}>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content color={theme.colors.onBackground} title={options.title} />
            {!back &&
                (isSignedIn ? (
                    <Appbar.Action icon="account" onPress={goToAccountScreen} />
                ) : (
                    <Appbar.Action icon="login" onPress={goToLoginScreen} />
                ))}
        </Appbar.Header>
    );
};

export default AppBar;
