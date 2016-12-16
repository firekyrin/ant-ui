<template>
    <span class="ant-badge" :style="{backgroundColor: color}" :class="['is-' + type, 'is-size-' + size]">
        <slot></slot>
    </span>
</template>


<script>
    export default {
        name: "ant-badge",

        props: {
            color: String,

            type: {
                type: String,
                default: 'primary'
            },

            size: {
                type: String,
                default: 'normal'
            }
        }
    }
</script>

<style>
    @import = "../../../src/style/var.css";

    @component-namespace ant {
        @component badge {
            color: $color-white;
            text-align: center;
            display: inline-block;

            @when success {
                background-color: $success-color;
            }

            @when primary {
                background-color: $color-blue;
            }

            @when error {
                background-color: $error-color;
            }

            @when warning {
                background-color: $warning-color;
            }

            @when size-normal {
                border-radius: 12px;
                font-size: 15px;
                padding: 2px 8px;
            }

            @when size-small {
                border-radius: 8px;
                font-size: 12px;
                padding: 2px 6px;
            }

            @when size-large {
                border-radius: 14px;
                font-size: 18px;
                padding: 2px 10px;
            }
        }
    }
</style>
