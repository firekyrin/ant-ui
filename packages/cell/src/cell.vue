<template>
    <a class="ant-cell" :href="href">
        <span class="ant-cell-mask" v-if="isLink"></span>
        <div class="ant-cell-left">
            <slot name="left"></slot>
        </div>
        <div class="ant-cell-wrapper">
            <div class="ant-cell-title">
                <slot name="icon">
                    <i v-if="icon" class="antui" :class="'antui-' + icon"></i>
                </slot>
                <slot name="title">
                    <span class="ant-cell-text" v-text="title"></span>
                    <span v-if="label" class="ant-cell-label" v-text="label"></span>
                </slot>
            </div>
            <div class="ant-cell-value" :class="{'is-link': isLink}">
                <slot>
                    <span v-text="value"></span>
                </slot>
            </div>
        </div>
        <div class="ant-cell-right">
            <slot name="right"></slot>
        </div>
        <i v-if="isLink" class="ant-cell-allow-right"></i>
    </a>
</template>

<script>
    if (process.env.NODE_ENV === 'component') {
        require('ant-ui/packages/font/style.css');
    }

    export default {
        name: 'ant-cell',

        props: {
            to: [String, Object],
            icon: String,
            title: String,
            label: String,
            isLink: Boolean,
            value: {}
        },

        computed: {
            href() {
                if (this.to && !this.added && this.$router) {
                    const resolved = this.$router.match(this.to);
                    if (!resolved.matched.length) {
                        return this.to;
                    }

                    this.$nextTick(() => {
                        this.added = true;
                        this.$el.addEventListener('click', this.handleClick);
                    });
                    return resolved.path;
                }
                return this.to;
            }
        },

        methods: {
            handleClick($event) {
                $event.preventDefault();
                this.$router.push(this.href);
            }
        }
    }
</script>

<style>
    @import "../../../src/style/var.css";

    @component-namespace ant {
        @component cell {
            background-color: $color-white;
            box-sizing: border-box;
            color: inherit;
            min-height: 48px;
            display: block;
            overflow: hidden;
            position: relative;
            text-decoration: none;

            &:first-child {
                .ant-cell-wrapper {
                    background-origin: border-box;
                }
            }

            &:last-child {
                background-image: linear-gradient(0deg, $color-grey, $color-grey 50%, transparent 50%);
                background-size: 100% 1px;
                background-repeat: no-repeat;
                background-position: bottom;
            }

            @descendent wrapper {
                background-image: linear-gradient(180deg, $color-grey, $color-grey 50%, transparent 50%);
                background-size: 120% 1px;
                background-repeat: no-repeat;
                background-position: top left;
                background-origin: content-box;
                align-items: center;
                box-sizing: border-box;
                display: flex;
                font-size: 16px;
                line-height: 1;
                min-height: inherit;
                overflow: hidden;
                padding: 0 10px;
                width: 100%;
            }

            @descendent mask {
                &::after {
                    background-color: #000;
                    content: " ";
                    opacity: 0;
                    position: absolute 0;
                }

                &:active::after {
                    opacity: .1;
                }
            }

            @descendent text {
                vertical-align: middle;
            }

            @descendent label {
                color: #888;
                display: block;
                font-size: 12px;
                margin-top: 6px;
            }

            img {
                vertical-align: middle;
            }

            @descendent title {
                flex: 1;
            }

            @descendent value {
                color: $cell-value-color;
                display: flex;
                align-items: center;

                @when link {
                    margin-right: 24px;
                }
            }

            @descendent left {
                position: absolute;
                height: 100%;
                left: 0;
                transform: translate3d(-100%, 0, 0);
            }

            @descendent right {
                position: absolute;
                height: 100%;
                right: 0;
                top: 0;
                transform: translate3d(100%, 0, 0);
            }

            @descendent allow-right::after {
                border: solid 2px $border-color;
                border-bottom-width: 0;
                border-left-width: 0;
                content: " ";
                position: absolute 50% 20px * *;
                size: 5px;
                transform: translateY(-50%) rotateX(45deg);
            }
        }
    }
</style>
