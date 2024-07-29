<template>
  <NuxtLoadingIndicator />
  <ClientOnly>
    <NuxtLayout>
      <NuxtPage />
      <UNotifications />
    </NuxtLayout>
    <template #fallback>
      <div class="flex h-screen justify-center items-center">
        Please wait...
      </div>
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
// if(process.env.NODE_ENV === "production"){
//   console.log = function(){}
//   console.info = function(){}
//   console.debug = function(){}
// }

useSeoMeta({
  titleTemplate: (title) => {
    return title ? `test midtrans` : ''
  },
})

const midtransClient = useRuntimeConfig().public.midtransClientSandbox
const midtransLink = 'https://app.sandbox.midtrans.com/snap/snap.js'

useHead({
    script: [
    {
      src: midtransLink,
      "data-client-key": midtransClient, // Replace with your key
      async: true, // Ensure the script loads asynchronously
    }]
})

</script>