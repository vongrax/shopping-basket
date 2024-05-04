<template>
  <div class="card-container">
    <div class="card-wrapper" v-for="product in productState.products" :key="product._id">
      <product-card :product="product" @add-handler="addHandler" @delete-handler="removeHandler" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, onMounted, reactive } from 'vue';
import { mockProductsData } from '@/mock/mockProducts';
import { IProduct } from '@/interfaces/product.interfaces';
import ProductCard from '@/components/ProductCard.vue';

const productState = reactive<{ products: IProduct[] }>({
  products: [],
});

const emit = defineEmits(['add-handler', 'delete-handler']);

const addHandler = (product: IProduct) => {
  let count = product.quantity;
  productState.products = productState.products.map((item: IProduct) => {
    if (item._id === product._id && product.quantity !== 5) {
      count++;
      return { ...item, quantity: count };
    } else {
      return item;
    }
  });
  emit('add-handler', { ...product, quantity: count });
};

const removeHandler = (product: IProduct) => {
  let count = product.quantity;
  productState.products = productState.products.map((item: IProduct) => {
    if (item._id === product._id && product.quantity !== 0) {
      count--;
      return { ...item, quantity: count };
    } else {
      return item;
    }
  });
  emit('delete-handler', { ...product, quantity: count });
};

onMounted(() => {
  productState.products = mockProductsData;
});
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
}

.card-wrapper {
  margin: 10px 10px;
  width: 245px;
}
</style>
