<template>
    <div id="app">
        web3.js 测试
    </div>
</template>

<script>
//    import Web3 from 'web3'
export default {
    data () {
        return {
            title: ''
        }
    },
    watch: {},
    methods: {},
    computed: {},
    mounted () {
        /*            if (typeof web3 !== 'undefined') {
                web3 = new Web3(web3.currentProvider);
                console.log( web3.currentProvider )
                console.log( 3 )
                console.log( web3.version )
                console.log( web3.utils )
                /!* 区块信息 *!/
                web3.eth.getBlock(48, function(error, result){
                    if(!error)
                        console.log(JSON.stringify(result));
                    else
                        console.error(error);
                })
                /!* 账号 address 0xa4B6CE77E56C10f2cAf11BaAe7416612C5EC98b0  *!/
                web3.eth.getAccounts(function (error ,account) {
                    if(!error){
                        console.log(account)
                        console.log(JSON.stringify(account));
                        console.log(account[0]);

                        web3.eth.getBalance(account[0]).then(console.log)
                    } else
                        console.error(error);
                })

                web3.eth.getAccounts(console.log);

                console.log('======="0x07585e382c438115377bc72cefde0aac5ff15515facb01ff00fe5337b30b6052"====')
//                console.log( web3.isConnected() )  //error
                console.log( web3.currentProvider ) //error
                console.log('====***====')
//                console.log(web3.utils.toUtf8(''));

                var myEvent = web3.metacoin.Transfer();

                console.log( web3.shh.net )
                web3.shh.net.isListening(( error , result )=>{
                    if(!error){
                        console.log(result)
                        console.log(JSON.stringify(result));
                    } else
                        console.error(error);
                })

            } else {
                console.log( web3 )
                console.log( 2)
                web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
            } */
    }
}
</script>
<style>
</style>
