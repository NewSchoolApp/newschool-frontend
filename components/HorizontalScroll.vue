<template>
    <section :style="cssVars" class="d-flex flex-nowrap horizontal-scroll-container">
        <slot></slot>
    </section>
</template>

<script>
export default {
    props: {
        gap: {
            type: Number,
            default: 0
        },
        horizontalPadding:{
            type: Number,
            default: 0
        }
    },
    computed: {
        cssVars() {
            return {
                '--paddingH': `${this.horizontalPadding}px`,
                '--gap': `${this.gap}px`
            }
        }
    }
}
</script>

<style>
.horizontal-scroll-container{
    width: 100%;
    overflow-x: scroll;
    padding: 0 var(--paddingH) 4px;
}

.horizontal-scroll-container:after{
    content:'';
    flex: 0 0 auto;
    width: var(--paddingH);
}
.horizontal-scroll-container > *{
    flex: 0 0 auto;
    margin-right: var(--gap);
}

.horizontal-scroll-container > *:last-of-type{
    margin-right:0;
}
</style>