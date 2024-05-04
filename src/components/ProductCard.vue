<template>
  <a-card class="card">
    <template #cover>
      <img alt="example" :src="product.cover" />
    </template>
    <a-card-meta>
      <template #title>
        <span class="title">{{ product.title }}</span>
      </template>
      <template #description>
        <span class="description">{{ product.description }}</span>
      </template>
    </a-card-meta>
    <span class="price">Цена {{ product.price }} p</span>
    <div class="footer">
      <div class="controls">
        <a-button style="width: 30px" class="button" size="small" type="primary" @click.stop="addHandler(product)">
          <template #icon>
            <plus-outlined />
          </template>
        </a-button>
        <div class="quantity">{{ product.quantity }}</div>
        <a-button style="width: 30px" size="small" type="primary" @click.stop="removeHandler(product)">
          <minus-outlined />
        </a-button>
      </div>
    </div>
  </a-card>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue';
import { IProduct } from '@/interfaces/product.interfaces';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons-vue';

defineProps({
  product: {
    type: Object as PropType<IProduct>,
    required: true,
  },
});

const emit = defineEmits(['add-handler', 'delete-handler']);

const addHandler = (product: IProduct) => {
  emit('add-handler', product);
};

const removeHandler = (product: IProduct) => {
  emit('delete-handler', product);
};
</script>

<style scoped>
.card {
  width: 250px;
}

.title {
  color: var(--blue);
}

.description {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-bottom: 15px;
}

.price {
  display: inline-block;
  margin-bottom: 15px;
}

.footer {
  display: flex;
}

.controls {
  display: flex;
  align-items: center;
  margin: auto;
}

.quantity {
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 0 30px;
  margin: 0 5px;
}

.button {
  width: 30px;
}
</style>
