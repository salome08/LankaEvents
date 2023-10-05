import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const Privacy = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>LankaEvents Privacy Policy</Text>
        </View>
        <Text style={styles.privacyText}>Last Updated: October 05, 2023</Text>

        <Text style={styles.subTitle}>1. Introduction</Text>
        <Text style={styles.privacyText}>
          Welcome to our LankaEvents App. At LankaEvents, we are committed to
          protecting the privacy and security of your personal information. This
          Privacy Policy explains how we collect, use, disclose, and safeguard
          your personal data when you use our mobile application
          ("LankaEvents"). By using the App, you consent to the practices
          described in this Privacy Policy.
        </Text>

        <Text style={styles.subTitle}>2. Information We Collect</Text>
        <Text style={styles.privacyText}>
          We may collect the following types of information when you use our
          App: {"\n"}Personal Information: We may collect information that
          identifies you as an individual, such as your name, email address, and
          other contact information, only when you provide it voluntarily.{" "}
          {"\n"}Usage Information: We may collect information about your use of
          the App, including your interactions, preferences, and settings. This
          information may include device information, log data, and location
          information if you grant us access. {"\n"}Cookies and Similar
          Technologies: We may use cookies and similar tracking technologies to
          enhance your experience with the App. You can adjust your browser
          settings to refuse cookies, but some features of the App may not
          function properly as a result.
        </Text>

        <Text style={styles.subTitle}>3. How We Use Your Information</Text>
        <Text style={styles.privacyText}>
          We may use your information for the following purposes: {"\n"}To
          provide and maintain the App's functionality. {"\n"}To personalize
          your experience with the App. {"\n"}To send you updates,
          notifications, and important information regarding the App. {"\n"}To
          respond to your inquiries, comments, or requests. {"\n"}To analyze and
          improve the App's performance and features.
        </Text>

        <Text style={styles.subTitle}>4. Data Sharing and Disclosure</Text>
        <Text style={styles.privacyText}>
          We do not sell, trade, or otherwise transfer your personal information
          to third parties except as described in this Privacy Policy or when we
          have your consent. {"\n"}Third-Party Service Providers: We may share
          your information with third-party service providers who assist us in
          operating the App and providing services to you. {"\n"}Legal
          Compliance: We may disclose your information if required by law,
          regulation, or legal process.
        </Text>

        <Text style={styles.subTitle}>5. Your Choices</Text>
        <Text style={styles.privacyText}>
          ou can control the information you provide to us and how we use it:
          {"\n"}You may choose not to provide certain personal information.
          {"\n"}You can review and update your account settings and preferences.
          {"\n"}You can unsubscribe from marketing communications at any time.
        </Text>

        <Text style={styles.subTitle}>6. Security</Text>
        <Text style={styles.privacyText}>
          We take reasonable steps to protect your information from unauthorized
          access, use, or disclosure.
        </Text>

        <Text style={styles.subTitle}>7. Changes to this Privacy Policy</Text>
        <Text style={styles.privacyText}>
          We may update this Privacy Policy from time to time to reflect changes
          in our practices or for other operational, legal, or regulatory
          reasons. We will notify you of any material changes by posting the
          updated Privacy Policy within the App.
        </Text>

        <Text style={styles.subTitle}>8. Contact Us</Text>
        <Text style={styles.privacyText}>
          If you have any questions or concerns about this Privacy Policy,
          please contact us at [Contact Information].
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
  privacyText: {
    fontSize: 13,
    lineHeight: 24,
  },
});

export default Privacy;
