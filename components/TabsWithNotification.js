import React, { useMemo } from "react";
import { View, Text } from "react-native";
import { Tab, Badge } from "react-native-elements";

const TabsWithNotification = ({ index, setIndex, products }) => {
  const lowStockCount = useMemo(() => {
    return products.filter((product) => product.quantity < 10).length;
  }, [products]);

  return (
    <Tab
      value={index}
      onChange={setIndex}
      indicatorStyle={{
        backgroundColor: "#2E7D32",
        height: 3,
      }}
      variant="primary"
    >
      <Tab.Item
        title="Products"
        titleStyle={(active) => ({
          fontSize: 14,
          fontWeight: "bold",
          color: active ? "#2E7D32" : "#757575",
        })}
        icon={{
          name: "shopping-basket",
          type: "material",
          color: index === 0 ? "#2E7D32" : "#757575",
        }}
        containerStyle={{ position: "relative" }}
      >
        {lowStockCount > 0 && (
          <View
            style={{
              position: "absolute",
              top: 2,
              right: "25%",
            }}
          >
            <Badge
              value={lowStockCount}
              status="error"
              containerStyle={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            />
          </View>
        )}
      </Tab.Item>

      <Tab.Item
        title="Chats"
        titleStyle={(active) => ({
          fontSize: 14,
          fontWeight: "bold",
          color: active ? "#2E7D32" : "#757575",
        })}
        icon={{
          name: "chat",
          type: "material",
          color: index === 1 ? "#2E7D32" : "#757575",
        }}
      />
    </Tab>
  );
};

export default TabsWithNotification;
