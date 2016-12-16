<template>
    <transition name="actionsheet-float">
        <div v-show="currentValue" class="mint-actionsheet">
            <ul class="ant-actionsheet-list" :style="{'margin-bottom': cancelText ? '5px' : '0'}">
                    <li v-for="item in actions" class="ant-actionsheet-listitem" @click.stop="itemClick(item)">{{ item.name }}</li>
            </ul>
            <a class="ant-actionsheet-button" @click.stop="currentValue = false" v-if="cancelText">{{ cancelText }}</a>
        </div>
    </transiton>
</template>

<style>
    @component-namespace ant {
        @component actionsheet {
            position: fixed;
            background: #e0e0e0;
            width: 100%;
            text-align: center;
            bottom: 0;
            left: 50%;
            transform: translate3d(-50%, 0, 0);
            backface-visibility: hidden;
            transition: transform .3s ease-out;

            @descendent list {
                list-style: none;
                padding: 0;
                margin: 0;
            }

            @descendent listitem {
                border-bottom: solid 1px #e0e0e0;
            }

            @descendent listitem, button {
                display: block;
                width: 100%;
                height: 45px;
                line-height: 45px;
                font-size: 18px;
                color: #333;
                background-color: #fff;
                &:active {
                    background-color: #f0f0f0;
                }
            }
        }
    }

    .actionsheet-float-enter,
    .actionsheet-float-leave-active {
        transform: translate3d(-50%, 100%, 0);
    }
</style>

<script>
    import Popup from 'vue-popup';
    import 'vue-popup/lib/popup.css';

    export default {
        name: 'ant-actionsheet',

        mixins: [Popup],

        props: {
            modal: {
                default: true
            },

            modalFade: {
                default: true
            },

            lockScroll: {
                default: false
            },

            closeOnClickModal: {
                default: true
            },

            cancelText: {
                type: String,
                default: '取消'
            },

            actions: {
                type: Array,
                default: () => []
            }
        },

        data() {
            return {
                currentValue: false
            };
        },

        watch: {
            currentValue(val) {
                this.$emit('input', val);
            },

            value(val) {
                this.currentValue = val;
            }
        },

        methods: {
            itemClick(item) {
                if (item.method && typeof item.method === 'function') {
                    item.method();
                }
                this.currentValue = false;
            }
        },

        mounted() {
            if (this.value) {
                this.rendered = true;
                this.currentValue = true;
                this.open();
            }
        }
    }
</script>
