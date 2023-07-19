import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Privacy = () => {
  const privacyPolicy = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce in augue ligula. Etiam ut lectus ut lectus consequat feugiat. Morbi dictum neque felis, sit amet suscipit ligula finibus a. Nunc ac eros bibendum, gravida nisi non, tristique elit. Ut convallis risus nec diam efficitur, non consectetur justo volutpat. Aliquam nec consequat sem, sit amet tincidunt nunc. Morbi et ex at metus luctus ultrices. Nulla facilisi. Donec vel mi nec dolor volutpat luctus at in urna. Nam non dolor velit. Suspendisse at ligula elit.

Sed iaculis hendrerit quam sed iaculis. Sed cursus euismod turpis, at consectetur urna hendrerit et. Nam ac gravida est. Curabitur consequat nec turpis in viverra. Praesent non magna vel odio blandit volutpat et ac urna. Aliquam posuere ultrices tincidunt. Phasellus accumsan purus in cursus fringilla. Vivamus placerat neque ac orci faucibus vulputate. Duis vel pharetra neque. Curabitur suscipit consequat sapien nec ullamcorper. Integer quis enim sed ex fringilla fermentum.

Donec at tortor elit. Mauris lacinia nisi velit, vitae pulvinar dui suscipit id. Morbi id dignissim enim, eget faucibus mauris. Fusce sodales semper mi, ut cursus nunc rutrum eget. Sed malesuada aliquam erat non egestas. Donec interdum, sapien a tempus feugiat, ante lacus interdum ante, a posuere dui elit id felis. Cras laoreet arcu nec est faucibus fringilla. Duis vehicula, mauris a tempus tincidunt, massa justo lacinia ligula, nec tempor metus tortor vitae nisi. Integer dapibus nunc ac lorem lacinia, at gravida sem egestas. Quisque et lectus leo. Nam at ante risus. Mauris faucibus ipsum vel ultrices rhoncus. Nulla facilisi. Sed vitae varius ex.`;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Privacy Policy</Text>
      <Text style={styles.privacyText}>{privacyPolicy}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  privacyText: {
    fontSize: 16,
    lineHeight: 24,
  },
});

export default Privacy;
