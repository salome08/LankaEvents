import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const TermsOfService = () => {
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Terms of Service for LankaEvents</Text>
        </View>
        <Text style={styles.mainText}>Last Updated: October 05, 2023</Text>

        <Text style={styles.subTitle}>1. Acceptance of Terms</Text>
        <Text style={styles.mainText}>
          By using the LankaEvents mobile application ("App"), you agree to be
          bound by these Terms of Service ("Terms"). If you do not agree to
          these Terms, please do not use the App.
        </Text>

        <Text style={styles.subTitle}>2. Use of the App</Text>
        <Text style={styles.mainText}>
          You must be of legal age in your jurisdiction or have parental consent
          to use the App. {"\n"}You agree to use the App in compliance with all
          applicable laws and regulations. {"\n"}LankaEvents reserves the right
          to modify, suspend, or terminate the App or your access to it at any
          time, without notice.
        </Text>

        <Text style={styles.subTitle}>3. User Content</Text>
        <Text style={styles.mainText}>
          By using the App, you may submit, upload, or display content ("User
          Content"). You retain ownership of your User Content. {"\n"}You grant
          LankaEvents a non-exclusive, worldwide, royalty-free license to use,
          reproduce, modify, and distribute your User Content for the purpose of
          operating and improving the App.
        </Text>

        <Text style={styles.subTitle}>4. Intellectual Property</Text>
        <Text style={styles.mainText}>
          All intellectual property rights in the App, including but not limited
          to trademarks, copyrights, and patents, belong to LankaEvents.
          {"\n"}You may not use LankaEvents's trademarks or copyrighted material
          without prior written consent.
        </Text>

        <Text style={styles.subTitle}>
          5. Disclaimers and Limitation of Liability
        </Text>
        <Text style={styles.mainText}>
          The App is provided "as is" and "as available" without any warranties,
          express or implied. {"\n"}LankaEvents is not responsible for any
          errors, omissions, or inaccuracies in the App's content. {"\n"}
          LankaEvents shall not be liable for any direct, indirect, incidental,
          special, or consequential damages resulting from your use of the App.
        </Text>

        <Text style={styles.subTitle}>6. Indemnification</Text>
        <Text style={styles.mainText}>
          You agree to indemnify and hold LankaEvents harmless from any claims,
          damages, losses, or liabilities arising out of your use of the App or
          violation of these Terms.
        </Text>

        <Text style={styles.subTitle}>7. Termination</Text>
        <Text style={styles.mainText}>
          LankaEvents may terminate or suspend your access to the App at its
          sole discretion, with or without cause, and without notice.
        </Text>

        <Text style={styles.subTitle}>8. Governing Law</Text>
        <Text style={styles.mainText}>
          These Terms are governed by and construed in accordance with the laws
          of [Your Jurisdiction], without regard to its conflict of law
          principles.
        </Text>

        <Text style={styles.subTitle}>9. Changes to Terms</Text>
        <Text style={styles.mainText}>
          LankaEvents reserves the right to update or revise these Terms at any
          time. Any changes will be effective upon posting the revised Terms
          within the App. principles.
        </Text>

        <Text style={styles.subTitle}>10. Contact Us</Text>
        <Text style={styles.mainText}>
          If you have any questions or concerns about these Terms of Service,
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
  mainText: {
    fontSize: 13,
    lineHeight: 24,
  },
});

export default TermsOfService;
