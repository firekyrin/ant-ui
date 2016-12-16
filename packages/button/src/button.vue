<template>
    <button :type="nativeType" class="ant-button" :class="['ant-button--' + type, 'ant-button--' + size, {'is-disabled': disabled, 'is-plain': plain}]" @click="handleClick" :disabled="disabled">
        <span class="ant-button-icon" v-if="icon || $slots.icon">
            <slot name="icon">
                <i v-if="icon" class="antui" :class="'antui-' + icon"></i>
            </slot>
        </span>
        <label class="ant-button-text"><slot></slot></label>
    </button>
</template>

<script>
    if (process.env.NODE_ENV === 'component') {
        require('ant-ui/packages/font/style.css')
    }

    export default {
        name: 'ant-button',

        methods: {
            handleClick(evt) {
                this.$emit('click', evt);
            }
        },

        props: {
            icon: String,
            disabled: Boolean,
            nativeType: String,
            plain: Boolean,
            type: {
                type: String,
                default: 'default',
                validator(value) {
                    return [
                        'default',
                        'danger',
                        'primary'
                    ].indexOf(value) > -1;
                }
            },
            size: {
                type: String,
                default: 'normal',
                validator(value) {
                    return [
                        'small',
                        'normal',
                        'large'
                    ].indexOf(value) > -1;
                }
            }
        }
    }
</script>

<style>
    @import "../../../src/style/var.css";

    @component-namespace ant {
        @component button {
            appearance: none;
            border-radius: 4px;
            border: 0;
            box-sizing: border-box;
            color: inherit;
            display: block;
            font-size: 18px;
            height: 41px;
            outline: 0;
            overflow: hidden;
            position: relative;
            text-align: center;

            &::after {
                background-color: #000;
                content: " ";
                opacity: 0;
                position: absolute 0 0 0 0;
            }

            &:not(.is-disabled):active::after {
                opacity: .4;
            }

            @descendent icon {
                vertical-align: middle;
                display: inline-block;
            }

            @modifier default {
                color: $button-default-color;
                background-color: $button-default-background-color;
                box-shadow: $button-default-box-shadow;

                @when plain {
                    border: 1px solid $button-default-plain-color;
                    background-color: transparent;
                    box-shadow: none;
                    color: $button-default-plain-color;
                }
            }

            @modifier primary {
                color: $button-primary-color;
                background-color: $button-primary-background-color;

                @when plain {
                    border: 1px solid $button-primary-background-color;
                    background-color: transparent;
                    color: $button-primary-background-color;
                }
            }

            @modifier danger {
                color: $button-danger-color;
                background-color: $button-danger-background-color;

                @when plain {
                    border: 1px solid $button-danger-background-color;
                    background-color: transparent;
                    color: $button-danger-background-color;
                }
            }

            @modifier large {
                display: block;
                width: 100%;
            }

            @modifier normal {
                display: inline-block;
                padding: 0 12px;
            }

            @modifier small {
                display: inline-block;
                font-size: 14px;
                padding: 0 12px;
                height: 33px;
            }

            @when disabled {
                opacity: .6;
            }
        }
    }
</style>
