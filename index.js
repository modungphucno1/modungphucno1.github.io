document.addEventListener('DOMContentLoaded', () => {
    var pay_button
    if (TPDirect.paymentRequestApi.checkAvailability()) {
        
        var data = {
            supportedNetworks: ['MASTERCARD', 'VISA', 'AMEX'],
            supportedMethods: ['apple_pay'],
            displayItems: [{
                label: 'iPhone8',
                amount: {
                    currency: 'TWD',
                    value: '1.00'
                }
            }],
            total: {
                label: '付給 TapPay',
                amount: {
                    currency: 'TWD',
                    value: '1.00'
                }
            },
       
            // optional
            options: {
                requestPayerEmail: false,
                requestPayerName: false,
                requestPayerPhone: false,
                requestShipping: true,
            }
        }

        TPDirect.setupSDK(11327, 'app_whdEWBH8e8Lzy4N6BysVRRMILYORF6UxXbiOFsICkz0J9j1C0JUlCHv1tVJC', 'sandbox')
        TPDirect.paymentRequestApi.setupApplePay({
            // required, your apple merchant id
            merchantIdentifier: 'merchant.tech.cherri.global.test',
            // defaults to 'TW'
            countryCode: 'TW'
        })
    
        TPDirect.paymentRequestApi.setupPaymentRequest(data, function (result) {
            console.log('TPDirect.paymentRequestApi.setupPaymentRequest.result', result)

            // 代表瀏覽器支援 payment request api (或 apple pay)
            // 和 TPDirect.paymentRequestApi.checkAvailability() 的結果是一樣的
            // if (!result.browserSupportPaymentRequest) {
            //     return
            // }

            // 代表使用者是否有符合 supportedNetworks 與 supportedMethods 的卡片
            // paymentRequestApi ---> canMakePaymentWithActiveCard is result of canMakePayment
            // apple pay         ---> canMakePaymentWithActiveCard is result of canMakePaymentsWithActiveCard
            
            // NOTE: apple pay 只會檢查使用者是否有在 apple pay 裡面綁卡片
            if (result.canMakePaymentWithActiveCard) {
                document.getElementById('support').textContent = '裝置可以使用 PaymentRequest / Apple Pay'
                $('#apple-pay').addClass('buy')
            }
            else {
                // 如果有支援 basic-card 方式，仍然可以開啟 payment request sheet
                // 如果是 apple pay，會引導使用者去 apple pay 綁卡片
                document.getElementById('support').textContent = '裝置支援 PaymentRequest / Apple Pay，但是沒有可以支付的卡片'
                $('#apple-pay').addClass('set-up')
            }

            if (window.ApplePaySession) {
                pay_button = document.getElementById('apple-pay')
                pay_button.style.display = 'inline-block';
            }

            pay_button.addEventListener('click', function (event) {
                TPDirect.paymentRequestApi.getPrime(function(result) {
                    console.log('paymentRequestApi.getPrime result', result)
                    handlePayByPrime(result, data)
                })
            })
        })
        document.getElementById('support').textContent = '裝置支援 PaymentRequest / Apple Pay'
    }
    else {
        $('.support').removeClass("info").addClass("error")
        document.getElementById('support').textContent = '裝置不支援 PaymentRequest / Apple Pay'
    }
});

function handlePayByPrime(result, paymentRequest) {
    document.querySelector('#result1').innerHTML = JSON.stringify(result, null, 4)
    document.querySelector('.result1').classList.remove('hidden')
    document.querySelector('.curl').classList.remove('hidden')
    

    var command = `
    curl -X POST https://sandbox.tappaysdk.com/tpc/payment/pay-by-prime \\
    -H 'content-type: application/json' \\
    -H 'x-api-key: partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM' \\
    -d '{
        "partner_key": "partner_6ID1DoDlaPrfHw6HBZsULfTYtDmWs0q0ZZGKMBpp4YICWBxgK97eK3RM",
        "prime": "${result.prime}",
        "amount": "${parseInt(result.total_amount)}",
        "merchant_id": "GlobalTesting_CTBC",
        "details": "Some item",
        "cardholder": {
            "phone_number": "0987654321",
            "name": "王小明",
            "email": "test@example.com",
            "zip_code": "123",
            "address": "台北市xxx街xx號",
            "national_id": "A123456789"
        }
    }'`.replace(/                /g, '')

    document.querySelector('#curl').innerHTML = command

}
