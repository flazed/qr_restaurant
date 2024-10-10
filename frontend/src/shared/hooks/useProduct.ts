import { useEffect, useState } from 'react';

import { useLocalStorage } from '@shared/hooks';

const cartKey = 'cart';

export const useProduct = () => {
  const {
    get, remove, set
  } = useLocalStorage();
  const [cart, setCart] = useState<number[]>([]);

  const clearCart = () => {
    remove(cartKey);
    setCart([]);
  };

  const addProduct = (id: number) => {
    const localCart = get(cartKey);

    if (localCart) {
      try {
        const parsedCart = JSON.parse(localCart);
        if (
          Array.isArray(parsedCart)
          && parsedCart.every((x) => typeof x === 'number')
        ) {
          if (!parsedCart.includes(id)) {
            parsedCart.push(id);
            set(cartKey, parsedCart);
            setCart(parsedCart);
          }
        }
      } catch (_) {
        set(cartKey, [id]);
      }
    } else {
      set(cartKey, [id]);
    }
  };

  const removeProduct = (id: number) => {
    const localCart = get(cartKey);

    if (localCart) {
      try {
        const parsedCart = JSON.parse(localCart);
        if (
          Array.isArray(parsedCart)
          && parsedCart.every((x) => typeof x === 'number')
        ) {
          if (parsedCart.includes(id)) {
            const newCart = parsedCart.filter((x) => x !== id);
            set(cartKey, newCart);
            setCart(newCart);
          }
        } else {
          clearCart();
        }
      } catch (_) {
        clearCart();
      }
    }
  };

  const fillCart = () => {
    const localCart = get(cartKey);

    if (localCart) {
      try {
        const parsedCart = JSON.parse(localCart);
        if (
          Array.isArray(parsedCart)
          && parsedCart.every((x) => typeof x === 'number')
        ) {
          setCart(parsedCart);
        } else {
          remove(cartKey);
        }
      } catch (_) {
        remove(cartKey);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('storage', fillCart);
    fillCart();
  }, []);

  return {
    addProduct,
    cart,
    clearCart,
    removeProduct
  };
};
