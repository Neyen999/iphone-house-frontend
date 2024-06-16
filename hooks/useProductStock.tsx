import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const API_URL = process.env.NEXT_PUBLIC_WEBSOCKET;

const useProductStock = (initialProducts: ProductSimpleDto[], initialProductSales: ProductSaleDto[]) => {
  const [products, setProducts] = useState(initialProducts);
  const [productSales, setProductSales] = useState<ProductSaleDto[]>(initialProductSales);

  useEffect(() => {
    console.log("API URL: " + API_URL)
    const socket = new SockJS(`${API_URL}/ws`);
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
      },
      onConnect: () => {
        stompClient.subscribe('/topic/stock-updates', (message) => {
          const updatedStock = JSON.parse(message.body);

          // Actualiza el stock de los productos en tiempo real
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === updatedStock.productId ? { ...product, availableQuantity: updatedStock.newStock, availableRegisterQuantity: updatedStock.newRegisterStock, availableCounterQuantity: updatedStock.newCounterStock } : product
            )
          );
          setProductSales((prevProductSales) =>
            prevProductSales.map((productSale) =>
              productSale.product.id === updatedStock.productId ? { ...productSale, product: { ...productSale.product, availableQuantity: updatedStock.newStock, availableRegisterQuantity: updatedStock.newRegisterStock, availableCounterQuantity: updatedStock.newCounterStock } } : productSale
            )
          );
        });
      },
      onStompError: (frame) => {
        console.error(`Broker reported error: ${frame.headers['message']}`);
        console.error(`Additional details: ${frame.body}`);
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, []);

  return { products, setProducts, productSales, setProductSales };
};

export default useProductStock;
