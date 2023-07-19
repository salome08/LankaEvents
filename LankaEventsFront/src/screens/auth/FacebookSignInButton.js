import React from "react";
import { View } from "react-native";
import { LoginButton, AccessToken } from "react-native-fbsdk";

const FacebookSignInButton = ({ onFacebookSignIn }) => {
  const handleFacebookSignIn = async () => {
    try {
      const result = await LoginManager.logInWithPermissions([
        "public_profile",
        "email",
      ]);

      if (result.isCancelled) {
        throw new Error("User cancelled the login process.");
      }

      const tokenData = await AccessToken.getCurrentAccessToken();
      const accessToken = tokenData.accessToken.toString();

      // Pass the accessToken to your authentication logic
      onFacebookSignIn(accessToken);
    } catch (error) {
      console.log("Facebook sign-in error:", error);
    }
  };

  return (
    <View>
      <LoginButton
        onLoginFinished={(error, result) => {
          if (error) {
            console.log("Facebook login error:", error);
          } else if (result.isCancelled) {
            console.log("Facebook login is cancelled.");
          } else {
            handleFacebookSignIn();
          }
        }}
        onLogoutFinished={() => console.log("Facebook logout finished.")}
      />
    </View>
  );
};

export default FacebookSignInButton;
