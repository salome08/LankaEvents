import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const CookiePolicy = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Cookie Policy for LankaEvents</Text>
        </View>
        <Text style={styles.mainText}>Last Updated: October 05, 2023</Text>

        <Text style={styles.subTitle}>1. Introduction</Text>
        <Text style={styles.mainText}>
          Welcome to our LankaEvents App. This Cookie Policy explains how we use
          cookies and similar technologies when you visit and use our mobile
          application ("App"). By using the App, you consent to the use of
          cookies as described in this policy.
        </Text>

        <Text style={styles.subTitle}>2. What Are Cookies?</Text>
        <Text style={styles.mainText}>
          Cookies are small text files that are placed on your device when you
          visit a website or use an app. They are widely used to make websites
          and apps work more efficiently, as well as to provide information to
          the owners of the site or app.
        </Text>

        <Text style={styles.subTitle}>3. Types of Cookies We Use</Text>
        <Text style={styles.mainText}>
          We may use the following types of cookies in the App: {"\n"}Essential
          Cookies: These cookies are necessary for the App to function
          correctly. They enable you to navigate the App and use its essential
          features. {"\n"}Analytical/Performance Cookies: These cookies help us
          analyze how users interact with the App, allowing us to improve its
          functionality and user experience. {"\n"}Functionality Cookies: These
          cookies allow us to remember your preferences and settings, such as
          language preferences and login information. {"\n"}
          Targeting/Advertising Cookies: These cookies are used to deliver
          advertisements that are relevant to you and your interests. They may
          also be used to track the effectiveness of our advertising campaigns.
        </Text>

        <Text style={styles.subTitle}>4. How We Use Cookies</Text>
        <Text style={styles.mainText}>
          We use cookies for the following purposes: {"\n"}To provide and
          improve the functionality of the App. {"\n"}To analyze how users
          interact with the App and gather insights to enhance its performance.{" "}
          {"\n"}To personalize your experience by remembering your preferences
          and settings. {"\n"}To deliver targeted advertisements based on your
          interests.
        </Text>

        <Text style={styles.subTitle}>5. Managing Cookies</Text>
        <Text style={styles.mainText}>
          You can manage or disable cookies through your device or browser
          settings. Please note that disabling certain cookies may affect the
          functionality of the App.
        </Text>

        <Text style={styles.subTitle}>6. Third-Party Cookies</Text>
        <Text style={styles.mainText}>
          Some third-party services we use in the App may also use cookies. We
          do not control these cookies, and their use is subject to the privacy
          policies of the third parties providing them.
        </Text>

        <Text style={styles.subTitle}>7. Changes to this Cookie Policy</Text>
        <Text style={styles.mainText}>
          We may update this Cookie Policy to reflect changes in our use of
          cookies or for other operational, legal, or regulatory reasons. We
          will notify you of any material changes by posting the updated Cookie
          Policy within the App.
        </Text>

        <Text style={styles.subTitle}>8. Contact Us</Text>
        <Text style={styles.mainText}>
          If you have any questions or concerns about this Cookie Policy, please
          contact us at [Contact Information].
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    marginBottom: 60,
  },
  titleContainer: {
    borderBottomColor: "lightgray",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
    marginTop: 30,
  },
  mainText: {
    fontSize: 13,
    lineHeight: 24,
  },
});

export default CookiePolicy;
