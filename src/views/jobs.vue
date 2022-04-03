<template>
    <div>
        <Navjob />
        <div class="md:container md:mx-auto mt-2 mb-60">
                <KeepAlive>
            <component :is="current" @component="(n) => current=n"
            :job='item' v-for='item in items' :key="item.id" @click="jobApply(item)"></component>
                </KeepAlive>
        </div >
        <div class="dadakhon text-center transition-all transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none">
            <div>
            <input type="text" class="h-14 w-85 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none" placeholder="Search anything...">
            <fa @click="seeMore" v-if="!yes" class="fa transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" icon="angle-down" />
            <fa @click="seeMore" v-else class="fa transition transform hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none" icon="angle-up" />
            </div>
            <div v-if="yes">   
            <h2>By Type</h2>
            <div class="flex flex-row p-1 m-1">
                <div class="flex flex-col p-1 m-1 text-center"
                v-for='i in types' :key='i.id'>
                    <p>{{i.sign}}</p>
                    <p>{{i.name}}</p>
                </div>
            </div>
            <h1>By Categories</h1>
            <div class="flex text-center">
                <div class="bg-sky-600 hover:bg-sky-700 border-yellow-400 rounded-md p-2 m-1 cursor-pointer"
                    v-for='i in categories' :key='i.id'>
                    <h2>{{i.name}}</h2>
                </div>
            </div>
            <div class="flex text-center">
                <div class="bg-sky-600 hover:bg-sky-700 border-yellow-400 rounded-md p-2 m-1 cursor-pointer"
                    v-for='i in categories2' :key='i.id'>
                    <p>{{i.name}}</p>
                </div>
            </div>
            </div>
        </div>
    </div>

</template>

<script>
import Navjob from '../components/header/nav-jobs.vue'
import ContentA from '../components/jobs-cont.vue'
import ContentB from '../components/jobs-cont_digs.vue'
    export default {
        name: 'Jobs',
        components: {
            Navjob,
            ContentA,
            ContentB
        },
        data() {
            return{
                yes: false,
                current: 'ContentA',
                items: [
                    {cost: '$3000-$4000', id: 1, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 2, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Quick Jobs', cat: 'Media', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 3, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 4, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Quick Jobs', cat: 'Media', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 5, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 6, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Quick Jobs', cat: 'Media', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 7, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 8, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Quick Jobs', cat: 'Media', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 9, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 10, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Quick Jobs', cat: 'Media', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 11, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022'},
                    {cost: '$3000-$4000', id: 12, name: 'Senior HR Manager', cp: 'Selin Group', loc: 'Jakarta, Jakarta center', type: 'Quick Jobs', cat: 'Media', date: '03.08.2022'}
                ],
                categories:[
                    {name: 'Accouting & Finance'},
                    {name: 'Design'},
                    {name: 'Logistics'},
                    {name: 'Quick Jobs'},
                ],
                categories2:[
                    {name: 'Engineering'},
                    {name: 'customer Services'},
                    {name: 'Media & Creative'},
                    {name: 'IT Development'},
                ],
                types: [
                    {sign: '⏲️', name: 'Full time'},
                    {sign: '⏳', name: 'Part time'},
                    {sign: '🆓', name: 'Freelance'},
                    {sign: '⚡', name: 'Quick Jobs'},
                ]
            }
        },
        methods: {
            seeMore() {
                this.yes = !this.yes
            },
            component(value){
                this.current = value;
                console.log("NN", n);
            },
            jobApply(item){
                this.$store.dispatch("jobApply", item)
                return this.$router.push({path: '/apply/'+ item.id})
            }
        }
    }
</script>

<style lang="scss">
.dadakhon{
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgb(238, 232, 232);
    bottom: 0;
    position: fixed;
}
.fa{ 
    height: 44px;
    width: 44px;
}
</style>