<template>
    <div class="flex h-screen justify-center items-center ">
        <div v-if="loading">
            Please wait...
        </div>

        <div v-else class="flex flex-col justify-center items-center">
            <h1 class="text-2xl font-bold">Simulation Snap Midtrans</h1>
            <UDivider  class="mb-4"/>

            <UBadge class="max-w-fit mb-2 text-center" :color="lunas ? 'green' : 'red'">
                <template v-if="lunas">Lunas</template>
                <template v-else>Belum lunas</template>
            </UBadge>
            <UInput type="number" v-model="price" />

            <div class="flex gap-x-4 mt-4">
                <UButton @click="submitMidtrans" color="blue">submit midtrans</UButton>
                <UButton :disabled="!link" @click="onPay">pay here</UButton>
            </div>
            <h1 class="mt-4">
                <NuxtLink target="_blank" to="https://simulator.sandbox.midtrans.com/qris/index" class="text-blue-500 hover:underline">simulator midtrans payment</NuxtLink>
            </h1>
        </div>
    </div>
</template>
<script setup lang="ts">

const price = ref(1000)
const loading = ref(false)
const link = ref<string>('')
const lunas = ref(false)
const datajson = ref(null)

const onPay = async () => {
    const f = link.value.split('/').pop()

    snap.pay(f, {
        // Optional
        onSuccess: async function (result: any) {
            if (!datajson.value) {
                datajson.value = result
            }
            // console.log('succes nih', result)
            await checkMidtrans(datajson.value);
        },
        onPending: async function (result: any) {
            if (!datajson.value) {
                datajson.value = result
            }
            console.log('pending nih', datajson.value)
            await checkMidtrans(datajson.value);
        },
        onError: async function (result: any) {
            if (!datajson.value) {
                datajson.value = result
            }
            console.log('error nih', result)
        },
        onClose: async function (result: any) {
            if (!datajson.value) {
                datajson.value = result
            }
            // console.log('ketutup nih', datajson.value)
            await checkMidtrans(datajson.value);
        }
    });

}

async function checkMidtrans(data: any) {
    if (!data || lunas.value) {
        return
    }
    const res = await $fetch('/api/check-midtrans', {
        method: 'post',
        body: { data }
    });

    const message = res.status;
    if (message) {
        useToast().add({ id: 'status', title: 'status', description: message });
        if (message == 'success') {
            lunas.value = true;
        }
    }
}

async function submitMidtrans(event: any) {
    const _price = price.value
    loading.value = true

    const order_id = "order_id_" + Math.round((new Date()).getTime() / 1000)
    const parameter = {
        "transaction_details": {
            order_id,
            "gross_amount": _price
        }
        , "credit_card": {
            "secure": true
        }
    };


    // return loading.value = false
    $fetch('/api/midtrans', {
        method: 'post',
        body: { parameter }
    }).then(async function (e) {
        link.value = e
    }).catch(e => {
        useToast().add({ id: 'fail', title: 'error mengirim data', color: 'red' })
    }).finally(() => {
        loading.value = false
    })
}

watch(() => datajson, async (e) => {
    const { value } = e
    if (value) {
        await checkMidtrans(value)
    }
}, { deep: true })

</script>