<template>
    <div>
        <span>{{value}}</span>
        <input type="checkbox" :checked="checked" @change="doThis" :value="value"/>
    </div>
</template>

<script>
export default {
    name:"Mycheckbox",
    data:function(){
        return{}
    },
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        checked: Boolean,
        value: String
    },
    methods: {
        doThis() {
            this.$emit('change', !this.checked);
        }
    }              
}
</script>

<style>

</style>
