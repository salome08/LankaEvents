import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import eventApi from "../../api/eventApi";
import { Ionicons } from "@expo/vector-icons";
import { Chip } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemContext";
import moment from "moment";
import ImageSlider from "../components/ImageSlider";

const Event = ({ route, navigation }) => {
  const { event } = route.params;
  // const [event, setEvent] = useState(null);
  const insets = useSafeAreaInsets();
  const { themeColor, isDarkMode } = useTheme();
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Function to toggle showing the full description
  const handleReadMore = () => {
    setShowFullDescription(!showFullDescription);
  };
  const handleReadLess = () => {
    setShowFullDescription(!showFullDescription);
  };

  const organizerName = "Career Bliss Academy";

  // useEffect(() => {
  //   const fetchEvent = async () => {
  //     const fetchedEvent = await eventApi.getById(event);
  //     setEvent(fetchedEvent);
  //   };
  //   if (!event) fetchEvent();
  // }, [event]);

  if (!event) {
    return <Text>Loading...</Text>;
  }
  return (
    <View
      style={[
        {
          backgroundColor: themeColor.background,
          paddingBottom: insets.bottom,
        },
        styles.container,
      ]}
    >
      <ScrollView>
        {/* Images slider */}
        <ImageSlider
          images={[
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/The_Event_2010_Intertitle.svg/800px-The_Event_2010_Intertitle.svg.png",
            "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/The_Event_2010_Intertitle.svg/800px-The_Event_2010_Intertitle.svg.png",
          ]}
        />

        <View style={styles.content}>
          {/* Titre de l'événement */}
          <Text style={[{ color: themeColor.primaryText2 }, styles.title]}>
            {event.title}
          </Text>

          {/* Section "Organisateur" */}
          <View
            style={[
              { backgroundColor: themeColor.eventSecondaryBg },
              styles.organizerSection,
            ]}
          >
            <View style={styles.organizerInfo}>
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/The_Event_2010_Intertitle.svg/800px-The_Event_2010_Intertitle.svg.png",
                }}
                style={styles.organizerPhoto}
              />
              <Text
                style={[
                  { color: themeColor.primaryText2 },
                  styles.organizerName,
                ]}
              >
                {organizerName}
              </Text>
            </View>
            <TouchableOpacity
              style={[
                { backgroundColor: themeColor.blue },
                styles.followButton,
              ]}
            >
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
          </View>

          {/* Section "Event infos" */}
          <View style={styles.infosContainer}>
            <View
              style={[
                { backgroundColor: themeColor.eventSecondaryBg },
                styles.iconContainer,
              ]}
            >
              <Icon
                name="calendar-blank"
                size={17}
                color={themeColor.iconWithBg}
              />
            </View>
            <View style={styles.infosContent}>
              <Text
                style={[{ color: themeColor.primaryText2 }, styles.infoTitle]}
              >
                {moment(event.date).format("dddd DD MMMM [at] HH:mm")}
              </Text>
              <Text
                style={[
                  { color: themeColor.secondaryText4 },
                  styles.infoDescription,
                ]}
              >
                10:00-18:00 Los Angeles Time{" "}
              </Text>
            </View>
          </View>
          <View style={styles.infosContainer}>
            <View
              style={[
                { backgroundColor: themeColor.eventSecondaryBg },
                styles.iconContainer,
              ]}
            >
              <Icon name="map-marker" size={17} color={themeColor.iconWithBg} />
            </View>
            <View style={styles.infosContent}>
              <Text
                style={[{ color: themeColor.primaryText2 }, styles.infoTitle]}
              >
                {event.online ? "Online event" : event.location.town}
              </Text>
              {!event.online && (
                <Text
                  style={[
                    { color: themeColor.secondaryText4 },
                    styles.infoDescription,
                  ]}
                >
                  425 N. Los angeles St, los angeles, CA 90012
                </Text>
              )}
            </View>
          </View>

          {/* Section "About this event" */}
          <View style={styles.descriptionSection}>
            <Text style={[{ color: themeColor.primaryText2 }, styles.subTitle]}>
              About this event
            </Text>

            <Text
              numberOfLines={showFullDescription ? undefined : 2}
              style={[
                { color: themeColor.secondaryText4 },
                styles.infoDescription,
                styles.descriptionText,
              ]}
            >
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem
              accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
              quae ab illo inventore veritatis et quasi architecto beatae vitae
              dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
              aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
              eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam
              est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci
              velit, sed quia non numquam eius modi tempora incidunt ut labore
              et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima
              veniam, quis nostrum exercitationem ullam corporis suscipit
              laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam
              nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo
              voluptas nulla pariatur?
            </Text>
            {!showFullDescription ? (
              <TouchableOpacity onPress={handleReadMore}>
                <Text
                  style={[{ color: themeColor.blue }, styles.readMoreButton]}
                >
                  Read more
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={handleReadLess}>
                <Text
                  style={[{ color: themeColor.blue }, styles.readMoreButton]}
                >
                  Show less
                </Text>
              </TouchableOpacity>
            )}
          </View>

          {/* Section "Location" */}
          {!event.online && (
            <View>
              <Text
                style={[{ color: themeColor.primaryText2 }, styles.subTitle]}
              >
                Location
              </Text>
              <Text style={styles.infoDescription}>
                map view if event not online
              </Text>
            </View>
          )}

          {/* Section "Organisateur" */}
          <View
            style={[
              { borderColor: themeColor.devider },
              styles.organizerFinalSection,
            ]}
          >
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/The_Event_2010_Intertitle.svg/800px-The_Event_2010_Intertitle.svg.png",
              }}
              style={styles.organizerFinalPhoto}
            />
            <View style={styles.organizerFinalInfo}>
              <Text
                style={[
                  { color: themeColor.secondaryText4 },
                  styles.infoDescription,
                ]}
              >
                Organized by
              </Text>
              <Text
                style={[
                  { color: themeColor.primaryText2 },
                  styles.organizerFinalName,
                ]}
              >
                {organizerName}
              </Text>
              <Text
                style={[
                  { color: themeColor.secondaryText4 },
                  styles.organizerFinalDescription,
                ]}
              >
                {event.organizer.description} || blablabla organizer desc
              </Text>
              <TouchableOpacity
                style={[
                  { backgroundColor: themeColor.blue },
                  styles.followButton,
                ]}
              >
                <Text style={styles.followButtonText}>Follow</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Section "Related to this event" */}
          <View style={styles.descriptionSection}>
            <Text style={[{ color: themeColor.primaryText2 }, styles.subTitle]}>
              Related to this event
            </Text>
            <View style={styles.categoriesContainer}>
              {event.categories.map((category, key) => (
                <Chip
                  key={key}
                  // onPress={() => toggleSelectedCategory(category)}
                  style={{
                    backgroundColor: themeColor.eventSecondaryBg,
                    borderRadius: 30,
                  }}
                  textStyle={{ color: themeColor.filterButtonText }}
                  // selected={selectedCategories.find((e) => e === category)}
                  // selectedColor={themeColor.blue}
                >
                  {category}
                </Chip>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Event;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingVertical: 12,
    rowGap: 27,
    paddingHorizontal: 14,
  },
  organizerSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 100,
    marginBottom: 16,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  organizerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 30,
    marginRight: 13,
  },
  organizerInfo: {
    flexDirection: "row",
    alignItems: "center",
    width: 150,
  },
  organizerName: {
    fontSize: 16,
    fontWeight: "500",
  },
  followButton: {
    paddingVertical: 13,
    paddingHorizontal: 29,
    borderRadius: 3,
    width: 120,
  },
  followButtonText: {
    color: "white",
    textAlign: "center",
    // fontWeight: "bold",
  },
  infosContainer: {
    flexDirection: "row",
  },
  infosContent: {
    rowGap: 10,
  },
  descriptionSection: {
    marginBottom: 16,
  },
  descriptionText: {
    lineHeight: 24,
    marginTop: 20,
    marginBottom: 16,
  },
  readMoreButton: {
    fontSize: 15,
    fontWeight: "600",
  },
  organizerFinalSection: {
    alignItems: "center",
    paddingVertical: 60,
    rowGap: 24,
    marginBottom: 5,
    borderTopWidth: 0.2,
    borderBottomWidth: 0.2,
  },
  organizerFinalPhoto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  organizerFinalInfo: {
    flex: 1,
    alignItems: "center",
  },
  organizerFinalName: {
    fontSize: 20,
    fontWeight: "bold",
    // marginBottom: 3,
    marginTop: 15,
  },
  organizerFinalDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 22,
  },
  title: {
    fontSize: 32,
    fontWeight: "800",
  },
  subTitle: {
    fontSize: 23,
    fontWeight: "700",
  },
  mainText: {
    fontSize: 15,
    fontWeight: "300",
  },
  iconContainer: {
    width: 37,
    height: 37,
    borderRadius: 9,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
  },
  infoDescription: {
    fontSize: 14,
  },
  headerIconContainer: {
    paddingHorizontal: 16,
  },
  categoriesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 20,
    marginBottom: 20,
    columnGap: 8,
    rowGap: 10,
  },
});
