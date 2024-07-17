import React from 'react';
import {
  Alert,
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectCartItems,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} from '../../redux/cartSlice';
import { useNavigation } from '@react-navigation/native';

const Cart = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const cartItems = useSelector(selectCartItems);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2);

  const renderItem = ({ item }) => (
    <View
      style={{
        width: '90%',
        borderRadius: 4,
        alignSelf: 'center',
        marginTop: 10,
        borderWidth: 0.2,
        borderColor: '#8e8e8e',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 25,
      }}>
      <Image
        source={{ uri: item.image }}
        style={{
          width: 120,
          height: 160,
          borderRadius: 10,
          marginRight: 15,
        }}
      />
      <View
        style={{
          width: '60%',
          padding: 20,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <View>
          <Text
            style={{
              color: '#000000',
              fontSize: 18,
              fontWeight: '800',
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              color: '#808080',
              fontSize: 15,
              fontWeight: '500',
              marginTop: 4,
            }}>
            $ {item.price}
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => dispatch(decrementQuantity(item.id))}
            style={{
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4169E1',
              marginTop: 35,
              paddingVertical: 6,
              paddingHorizontal: 22,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '800',
              }}>
              -
            </Text>
          </TouchableOpacity>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 35,
              paddingVertical: 6,
              paddingHorizontal: 22,
            }}>
            <Text
              style={{
                color: '#000000',
                fontSize: 20,
                fontWeight: '800',
              }}>
              {item.quantity}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => dispatch(incrementQuantity(item.id))}
            style={{
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4169E1',
              marginTop: 35,
              paddingVertical: 6,
              paddingHorizontal: 22,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '800',
              }}>
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  const renderCart = () => (
    <View style={{ flex: 1 }}>
      {cartItems.length === 0 ? (
        <View
          style={{
            width: '100%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: '800',
              color: '#000000',
            }}>
            Your cart is empty.
          </Text>
        </View>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
        />
      )}
    </View>
  );

  // Render total price and checkout button
  const renderFooter = () => (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderTopWidth: 1,
        borderTopColor: '#ddd',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#fff',
      }}>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '600',
          color: '#000000',
        }}>
        Total: ${totalPrice}
      </Text>
      <TouchableOpacity
        onPress={handleCheckout}
        style={{
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#4169E1',
          paddingVertical: 10,
          paddingHorizontal: 20,
        }}>
        <Text
          style={{
            color: '#fff',
            fontSize: 18,
            fontWeight: '800',
          }}>
          Checkout
        </Text>
      </TouchableOpacity>
    </View>
  );

  const handleCheckout = () => {
    navigation.navigate('Home');
    dispatch(clearCart());
    Alert.alert('Order Placed Successfully');
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {renderCart()}
      {cartItems.length > 0 && renderFooter()}
    </SafeAreaView>
  );
};

export default Cart;
