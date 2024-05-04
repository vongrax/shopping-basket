<template>
  <a-modal
    :visible="show"
    centered
    ok-text="Заказать"
    cancel-text="Отмена"
    :title="`Оформление заказа на сумму ${total} рублей`"
    width="572px"
    @cancel="handleClose"
    @ok="handleOk"
  >
    <a-form ref="createOrder" :rules="rules" :model="formState" name="createOrder" @finish="handleFinish">
      <span class="label">Имя</span>
      <a-form-item has-feedback name="name">
        <a-input v-model:value="formState.name" placeholder="Имя" />
      </a-form-item>
      <span class="label">Фамилия</span>
      <a-form-item has-feedback name="surname">
        <a-input v-model:value="formState.surname" placeholder="Фамилия" />
      </a-form-item>
      <span class="label">Электронная почта</span>
      <a-form-item has-feedback name="email">
        <a-input v-model:value="formState.email" placeholder="Электронная почта" />
      </a-form-item>
      <span class="label">Телефон</span>
      <a-form-item has-feedback name="phone">
        <a-input v-model:value="formState.phone" placeholder="Телефон" />
      </a-form-item>
      <span class="label">Адрес</span>
      <a-form-item has-feedback name="address">
        <a-input v-model:value="formState.address" />
      </a-form-item>
      <input ref="submitBtn" style="display: none" type="submit" />
    </a-form>
  </a-modal>
</template>

<script lang="ts" setup>
import { defineEmits, defineProps, PropType, reactive, ref, Ref } from 'vue';
import { useRoute } from 'vue-router';
import { validateEmail, validateEmptyField, validatePhone } from '@/helpers/validators';
import { IProduct } from '@/interfaces/product.interfaces';

const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  products: {
    type: Array as PropType<IProduct[]>,
    required: true,
  },
});

type FormStateType = {
  name: string;
  surname: string;
  phone: string;
  address: string;
  email: string;
};

const emit = defineEmits(['handle-close']);
const handleClose = () => {
  emit('handle-close', false);
};

const submitBtn = ref<Ref | null>(null);
const formState = reactive<FormStateType>({
  name: '',
  surname: '',
  phone: '',
  address: '',
  email: '',
});

const handleFinish = (value: FormStateType) => {
  const order = {
    ...value,
    order: props.products,
  };
  console.log(order);
  emit('handle-close', false);
};

const rules = {
  email: [
    {
      required: true,
      validator: validateEmail(),
      trigger: ['change', 'submit'],
    },
  ],
  surname: [
    {
      required: true,
      validator: validateEmptyField('Введите фамилию'),
      trigger: ['change', 'submit'],
    },
  ],
  phone: [
    {
      validator: validatePhone(),
      trigger: ['change', 'submit'],
    },
  ],
  name: [
    {
      required: true,
      validator: validateEmptyField('Введите имя'),
      trigger: ['change', 'submit'],
    },
  ],
  address: [
    {
      required: true,
      validator: validateEmptyField('Введите адрес'),
      trigger: ['change', 'submit'],
    },
  ],
};

const handleOk = () => {
  submitBtn.value.click();
};
</script>

<style scoped>
.label {
  display: inline-block;
  padding: 0 0 8px;
}
</style>
