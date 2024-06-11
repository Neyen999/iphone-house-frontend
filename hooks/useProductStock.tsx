import { useState, useEffect } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

const useProductStock = (initialProducts: ProductSimpleDto[], initialProductSales: ProductSaleDto[]) => {
  const [products, setProducts] = useState(initialProducts);
  const [productSales, setProductSales] = useState<ProductSaleDto[] | []>(initialProductSales);

  useEffect(() => {
    const socket = new SockJS('http://localhost:8080/ws');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        console.log(str);
      },
      onConnect: () => {
        console.log('Connected');
        stompClient.subscribe('/topic/stock-updates', (message) => {
          const updatedStock = JSON.parse(message.body);

          console.log("Inside the suscribe")
          // Actualiza el stock de los productos en tiempo real
          setProducts((prevProducts) =>
            prevProducts.map((product) =>
              product.id === updatedStock.productId ? { ...product, availableQuantity: updatedStock.newStock } : product
            )
          );
          setProductSales((prevProductSales) =>
            prevProductSales.map((productSale) =>
              productSale.product.id === updatedStock.productId ? { ...productSale, product: { ...productSale.product, availableQuantity: updatedStock.newStock } } : productSale
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
