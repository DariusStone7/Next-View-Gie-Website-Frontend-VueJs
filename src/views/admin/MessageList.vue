<script setup>
import { getPath } from '@/utils/index.js'
import Message from '@/components/admin/Message.vue'
import { messages } from '@/states/states.js'
</script>

<template>
  <span>{{ getPath() }}</span><br> <br>
  <div class="message-list">
    <div class="message" v-for="(message, index) in messages" :key="index">
      <Message
        :id_message="message.id_message"
        :name="message.name"
        :email="message.email"
        :phone="message.phone"
        :subject="message.subject"
        :text="message.text"
        :create_at="message.create_at"
        :read_at="message.read_at"
      />
    </div>
  </div>
</template>

<style scoped>
.message-list{
  margin: auto;
  /* width: 700px; */
}
</style>