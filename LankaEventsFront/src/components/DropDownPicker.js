import React, { useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

const Picker = ({ value, items, setValue, setItems, placeholder }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder={placeholder}
      itemSeparator={true}
      itemSeparatorStyle={{
        backgroundColor: "rgb(42,37,54)",
      }}
      style={{
        borderColor: "rgb(154, 153, 160)",
        borderWidth: 0.3,
        paddingStart: 20,
        paddingEnd: 20,
        paddingVertical: 15,
        borderBottomStartRadius: 8,
        borderBottomEndRadius: 8,
      }}
      dropDownContainerStyle={{
        borderWidth: 0.3,
        borderColor: "rgb(154, 153, 160)",
        backgroundColor: "rgb(73, 68, 92)",
        minHeight: 310,
        marginTop: 15,
        borderTopStartRadius: 8,
        borderTopEndRadius: 8,
      }}
      placeholderStyle={{
        fontSize: 16,
        fontWeight: 500,
        color: "rgb(73, 68, 92)",
      }}
      labelStyle={{
        fontSize: 17,
        fontWeight: 500,
        color: "rgb(73, 68, 92)",
      }}
      listParentLabelStyle={{
        fontSize: 17,
        fontWeight: 500,
        color: "rgb(250, 250, 250)",
        paddingStart: 10,
      }}
      listItemContainerStyle={{
        height: 50,
      }}
      selectedItemLabelStyle={{
        fontSize: 18,
        fontWeight: 700,
        color: "rgb(255, 255, 255)",
      }}
      arrowIconStyle={{
        backgroundColor: "rgb(245, 245, 245)",
        borderRadius: 20,
        padding: 10,
      }}
    />
  );
};

export default Picker;
