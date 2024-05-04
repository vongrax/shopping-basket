<template>
  <div class="basket">
    <a-card class="card-basket" title="Корзина">
      <a-row v-for="product in products" :key="product._id">
        <a-col :span="10">
          <div>{{ product.title }}</div>
        </a-col>
        <a-col :offset="12" :span="2">
          <template v-if="product.quantity > 1">
            {{ product.quantity }}
          </template>
        </a-col>
        <a-divider />
      </a-row>
    </a-card>
    <div class="footer">
      <a-divider />
      <div class="controls">
        <span> Итого {{ total }} Р </span>
        <div>
          <a-button :disabled="!products.length" @click="handleOrder">Заказать</a-button>
        </div>
      </div>
      <a-divider />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue';
import { IProduct } from '@/interfaces/product.interfaces';

defineProps({
  products: {
    type: Array as PropType<IProduct[]>,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(['handle-order']);

const handleOrder = () => {
  emit('handle-order');
};
</script>

<style scoped>
.basket {
  margin-top: 10px;
  min-height: 400px;
  display: flex;
  flex-direction: column;
}
.card-basket {
  min-height: 300px;
}

.footer {
  text-align: center;
  margin-top: auto;
  font-size: 16px;
}
.controls {
  display: flex;
  justify-content: space-between;
  padding: 0 5px;
}
</style>
