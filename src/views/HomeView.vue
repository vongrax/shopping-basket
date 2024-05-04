<template>
  <a-card class="container" title="Товары">
    <a-row>
      <a-col :span="15">
        <product-card @add-handler="addHandler" @delete-handler="removeHandler" />
      </a-col>
      <a-col :span="8">
        <product-basket :total="basketState.total" :products="basketState.basket" @handle-order="orderModal = true" />
      </a-col>
    </a-row>
  </a-card>
  <template v-if="orderModal">
    <order-modal
      :show="orderModal"
      :products="basketState.basket"
      :total="basketState.total"
      @handle-close="handleClose"
    />
  </template>
</template>
<script setup lang="ts">
import ProductCard from '@/views/ProductPage.vue';
import { reactive, ref } from 'vue';
import OrderModal from '@/components/OrderModal.vue';
import ProductBasket from '@/components/ProductBasket.vue';
import { IProduct } from '@/interfaces/product.interfaces';

type BasketStateType = {
  basket: IProduct[];
  total: number;
};

const basketState = reactive<BasketStateType>({
  basket: [],
  total: 0,
});

const orderModal = ref<boolean>(false);

const addHandler = (product: IProduct) => {
  const findProduct = basketState.basket.find((item: IProduct) => item._id === product._id);
  if (findProduct && findProduct.quantity !== 5) {
    basketState.total += product.price;
    basketState.basket = basketState.basket.map((item: IProduct) => {
      if (item._id === product._id) {
        return product;
      } else {
        return item;
      }
    });
  } else if (!findProduct) {
    basketState.basket.push({ ...product });
    basketState.total += product.price;
  }
};

const removeHandler = (product: IProduct) => {
  const findProduct = basketState.basket.find((item: IProduct) => item._id === product._id);
  if (findProduct && product.quantity !== 0) {
    basketState.total -= product.price;
    basketState.basket = basketState.basket.map((item: IProduct) => {
      if (item._id === product._id) {
        return product;
      } else {
        return item;
      }
    });
  } else if (findProduct && product.quantity === 0) {
    const removeIndex = basketState.basket.map((item: IProduct) => item._id).indexOf(product?._id);
    basketState.basket.splice(removeIndex, 1);
    basketState.total -= product.price;
  }
};

const handleClose = () => {
  orderModal.value = false;
};
</script>
<style scoped>
.container {
  margin: 20px 0;
}
</style>
