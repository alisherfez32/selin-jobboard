<template>
    <div class="md:container 
    flex flex-row
    md:mx-auto mt-2 
    rounded-lg border-2"
    @click="$emit('apply')"
    >
        <div class="p-1 h-32 w-32 cursor-pointer">
            <img class="
            max-h-32 max-w-10
             rounded-lg"
            :src="job.img[0].url" alt="LOGO">
        </div>
        <div class="w-full pr-2">
            <div class="flex flex-col cursor-pointer">
                <p class="font-pop font-bold text-2xl">{{job.name}}</p>
                <p class="font-pop font-semibold text-xl">{{job.cp}}</p>
                <p class="tracking-widest font-pop font-light leading-5 text-lg">{{job.loc}}</p>
            </div>
            <div class="flex flex-row justify-between sm:text-lg text-sm
            pr-2">
                <p class="mt-2 font-pop font-normal leading-5 text-base text-[#716565]">{{job.type}}</p>
                <div class="border bg-gray-300 rounded-xl pr-2 pl-2 mb-1"><p>{{job.cat}}</p></div>
                <p class="font-bold text-red-500 text-sm">{{for_date}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import moment from "moment"
    export default {
        props: ['job'],
        data() {
            return {
                for_date: ""
            }
        },
        mounted() {
            let date = this.$props.job.date
            this.for_date = moment(date).startOf('day').fromNow()
            console.log("Props",this.$props.job)
        }
    }
</script>

<style lang="scss" scoped>

</style>