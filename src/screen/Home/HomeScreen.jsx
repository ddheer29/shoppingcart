import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Modal,
  Dimensions,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, selectCartItems } from '../../redux/cartSlice';

const { width, height } = Dimensions.get('window');

const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  function openProductModal(product) {
    setSelectedProduct(product);
    setOpenModal(true);
  }

  function closeProductModal() {
    setSelectedProduct(null);
    setOpenModal(false);
  }

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  function renderProductDetails() {
    if (!selectedProduct) {
      return null;
    }
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={openModal}
        onRequestClose={closeProductModal}>
        <View style={styles.modalView}>
          <View style={styles.modalContent}>
            <Image
              source={{ uri: selectedProduct.image }}
              style={styles.modalImage}
            />
            <View>
              <Text style={styles.modalTitle}>{selectedProduct.title}</Text>
              <Text style={styles.modalPrice}>
                {`Price: $ ${selectedProduct.price}`}
              </Text>
              <Text style={[styles.modalPrice, { color: '#000000' }]}>
                {`Category: ${selectedProduct.category}`}
              </Text>
              <Text style={styles.modalDescription}>
                {selectedProduct.description}
              </Text>
            </View>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  dispatch(addToCart(selectedProduct));
                  closeProductModal();
                }}>
                <Text style={styles.modalButtonText}>Add to Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={closeProductModal}>
                <Text style={styles.modalButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    );
  }

  const renderProducts = ({ item }) => {
    return (
      <View
        style={{
          width: '90%',
          // height: 100,
          borderRadius: 5,
          alignSelf: 'center',
          marginTop: 10,
          borderWidth: 0.2,
          borderColor: '#8e8e8e',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: '#fff',
          paddingVertical: 10,
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
                color: 'green',
                fontSize: 15,
                fontWeight: '600',
                marginTop: 4,
              }}>
              $ {item.price}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => openProductModal(item)}
            style={{
              // height: 30,
              borderRadius: 5,
              width: 200,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#4169E1',
              marginTop: 35,
              paddingVertical: 6,
            }}>
            <Text
              style={{
                color: '#fff',
                fontSize: 20,
                fontWeight: '800',
              }}>
              View Details
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            width: '100%',
            height: 70,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
            backgroundColor: '#4169E1',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: '800',
              marginLeft: 25,
              color: '#fff',
            }}>
            Shopping
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Cart')}
            style={{
              // width: 80,
              height: 40,
              borderRadius: 20,
              backgroundColor: '#fff',
              justifyContent: 'space-evenly',
              alignItems: 'center',
              flexDirection: 'row',
              marginRight: 20,
              paddingHorizontal: 20,
            }}>
            <Text
              style={{
                marginLeft: 10,
                fontSize: 20,
                fontWeight: '800',
                color: '#000000',
              }}>
              {`🛒 ${cartItems.length}`}
            </Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={products}
          renderItem={renderProducts}
          keyExtractor={item => item.id.toString()}
        />
      </View>
      {renderProductDetails()}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalImage: {
    width: 180,
    height: 250,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#000000',
    alignItems: 'flex-start',
  },
  modalPrice: {
    fontSize: 16,
    marginVertical: 2,
    color: 'green',
  },
  modalDescription: {
    fontSize: 16,
    marginVertical: 10,
  },
  modalButtons: {
    flexDirection: 'row',
    marginTop: 20,
  },
  modalButton: {
    marginHorizontal: 10,
    padding: 10,
    backgroundColor: '#4169E1',
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  modalContent: {
    width: width * 0.8,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
});
