import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";

class Notification extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slideAnim: new Animated.Value(0),
    };
  }

  componentDidMount() {
    this.openNotification();
  }

  openNotification = () => {
    Animated.timing(this.state.slideAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: false,
    }).start();

    this.closeNotificationTimeout = setTimeout(this.closeNotification, 8000); // Auto-close after 8 seconds
  };

  closeNotification = () => {
    clearTimeout(this.closeNotificationTimeout);
    Animated.timing(this.state.slideAnim, {
      toValue: 0,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // Call a callback function or perform any other actions on close
    });
  };

  render() {
    const { slideAnim } = this.state;

    const notificationStyle = {
      transform: [
        {
          translateY: slideAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0],
          }),
        },
      ],
    };

    return (
      <Animated.View style={[styles.notification, notificationStyle]}>
        <Text>{this.props.text}</Text>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={this.closeNotification}
        >
          <Text>X</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  notification: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "white",
    height: "30%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Notification;
