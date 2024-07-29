export default defineEventHandler(async (event) => {
    const { data } = await readBody(event)

    let status = 'pending'
    const statusResponse = await snap.transaction.notification(data)
    const transactionStatus = statusResponse.transaction_status;
    const fraudStatus = statusResponse.fraud_status;

    if (transactionStatus == 'capture') {
        if (fraudStatus == 'challenge') {
            // TODO set transaction status on your databaase to 'challenge'
            console.log('challenge')
            status = 'challenge'
        } else if (fraudStatus == 'accept') {
            console.log('success')
            status = 'success'
        }
    } else if (transactionStatus == 'settlement') {
        console.log('success')
        status = 'success'
        // TODO set transaction status on your databaase to 'success'
    } else if (transactionStatus == 'cancel' || transactionStatus == 'expire') {
        console.log('fail')
        status = 'fail'
    }

    return { status }
})