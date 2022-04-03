/* eslint-disable no-dupe-keys */
// eslint-disable-next-line no-unused-vars
// import Vue from 'vue'

import Vuex from 'vuex'
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import db from "../fierbase/firebaseinit.js"
import axios from 'axios'
import Airtable from 'airtable'
export default new Vuex.Store({
    state: {
        jobs: {},
        postJob: [
        ],
        postedJobs: [
            {dec: "Example", qual: 'Example',cost: '$3000-$4000', id: 1, name: 'Example HR Manager', cp: 'Example Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022', img: [{url: 'https://dl.airtable.com/.attachmentThumbnails/b0ba9f58dd19695a6da3aaa9cfa6684b/8619e86b'}]},
        ],
        appliedJobs: [
            {dec: "Example", qual: 'Example',cost: '$3000-$4000', id: 1, name: 'Example HR Manager', cp: 'Example Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022', img: [{url: 'https://dl.airtable.com/.attachmentThumbnails/b0ba9f58dd19695a6da3aaa9cfa6684b/8619e86b'}]},
        ],
        starredJobs: [
            {dec: "Example", qual: 'Example', cost: '$3000-$4000', id: 1, name: 'Example HR Manager', cp: 'Example Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022', img: [{url: 'https://dl.airtable.com/.attachmentThumbnails/b0ba9f58dd19695a6da3aaa9cfa6684b/8619e86b'}]},
            {dec: "Example", qual: 'Example', cost: '$3000-$4000', id: 1, name: 'Example HR Manager', cp: 'Example Group', loc: 'Jakarta, Jakarta center', type: 'Freelance', cat: 'IT Dev', date: '03.08.2022', img: [{url: 'https://dl.airtable.com/.attachmentThumbnails/b0ba9f58dd19695a6da3aaa9cfa6684b/8619e86b'}]},
        ],
        profile: {},
        user: null,
        url: "",
        Country: "",
        email: "",
        firstName: "",
        lastName: "",
        profileId: "",
        createdProfile: null,
    },

    getters: {
        postJobAdd(state) {
            return  state.postJob
        },
        profileInfo(state) {
            return state.profile
        },
        jobApply(state) {
            return state.jobs
        },
        postedJobs(state) {
            return state.postedJobs
        },
        appliedJobs(state) {
            return state.appliedJobs
        },
        starredJobs(state) {
            return state.starredJobs
        }
    },

    mutations: {
        jobApply(state, payload) {
            state.jobs=payload
        },
        addData(state, payload) {
          state.postJob.push(payload)
        },
        Profile(state, payload) {
            state.profile = payload
        },
        updateUser(state, payload) {
            state.user = payload
        },
        getUrl(state, payload) {
            state.url = payload
        },
        postedJobs(state, payload) {
            state.postedJobs.push(payload)
        },
        appliedJobs(state, payload) {
            state.appliedJobs.push(payload)
        },
        starredJobs(state, payload) {
            state.starredJobs.push(payload)
        },
        createTable(payload) {
        },
        setProfileInfo(state, doc) {
            state.profileId = doc.id;
            state.firstName = doc.firstName;
            state.lastName = doc.lastName;
            state.email = doc.email;
        },
    },
    actions: {
        async jobApply({ commit, state }, item) {
            state.jobs= {}
            commit("jobApply", item)
        },
        //get a JOB
        async getJob({ commit, state }) {
            const user = await axios.get('https://api.airtable.com/v0/appvh42gWPVAUOW80/Jobs?api_key=keyvkxyqdCw2v2FEK')
            const data = await user.data.records.forEach(record => {
               if (!state.postJob.some(post => post.id === record.id)) {
                   const date = record
                   console.log("DATA", date);
                   commit("addData", date)
                }
            })
            return data
        },
        getUrl({ commit }, url) {
            console.log("URL", url);
            commit("getUrl", url)
        },
        //get a user
        async getCurrentUser({ commit }) {
            const dataBase = db.collection('users').doc(firebase.auth().currentUser.uid)
            const dbResult = await dataBase.get()
            const user = await dbResult.data()
            commit("Profile", user);
        },
        postedJobs({ commit, state }, item) {
          const base = new Airtable({apiKey: 'keyvkxyqdCw2v2FEK'}).base('appvh42gWPVAUOW80');
          base('Applied').create([
            {
            "fields": {
              "name": item.name,
              "cp": item.name,
              "loc": item.loc,
              "type": item.type,
              "cat" : item.cat,
              "date": item.date,
              "cost": item.cost,
              "qual": item.qual,
              "dec": item.dec,
              "img": [
                {
                  "url": item.img[0].url
                }
              ]
              }
             }
            ], function(err) {
              if (err) {
                window.alert(err);
                return;
              }
            }
            )
            window.alert("Your job has been Posted!")
            state.postedJobs = []
            commit("postedJobs", item)
        },
        appliedJobs({ commit, state }, item) {
            state.appliedJobs = []
            commit("appliedJobs", item)
        },
        starredJobs({ commit }, item) {
            commit("starredJobs", item)
        },

         //get current user thats Created a Profile
        async getCurrentProfile({ state }) {
            const dataBase = db.collection('users')
                .doc(firebase.auth().currentUser.uid)
            const dbResult = await dataBase.get()
            dbResult.forEach((doc) => {
                console.log("DATA", doc.data());
                if (!state.profile.some(post => post.id === doc.id)) {
                    const data = {
                        fullName: doc.fullName,
                        profileID: doc.profileId,
                        Location: doc.Location,
                        Country: doc.Country,
                    }
                }
            });
        },
        async createTable({ commit}, item) {
            console.log("ITEM", item);
            base('Jobs').create([
            {
            "fields": {
              "name": "item.name",
              "cp": "item.name",
              "loc": "item.loc",
              "type": "Freelance",
              "cat": item.postCat,
              "date": item.date,
              "cost": item.cost,
              "qual": item.jobQual,
              "dec": item.jobDec,
              "img": [
                {
                  "url": "https://dl.airtable.com/.attachments/af3c8b6e46705a565f1444017362a710/c64c7e3d.png"
                }
              ]
              }
             }
            ], function(err, records) {
              if (err) {
                console.error(err);
                return;
              }
              records.forEach(function (record) {
                console.log(record.getId());
              });
            })
            commit("createTable", item)
        }
        // update Profile with edit Profile
        // async updateUserProfile({ commit, state }) {
        //     const dataBase = db.collection('profile')
        //     await dataBase.forEach((doc) => {
        //         let result = doc.data()
        //         let uid = firebase.auth().currentUser.uid
        //         if (uid === result.profileID) {
        //        dataBase.update({
        //         fullName: state.fullName,
        //         age: state.age,
        //         gender: state.gender,
        //         height: state.height,
        //         weight: state.weight,
        //         Location: state.Location,
        //         country: state.Country,
        //         skintone: state.skintone,
        //         language: state.language,
        //         talent: state.talent,
        //     });
        //         }
        //     });
        //     commit("setProfileInfoProfile")
        // },
        //update with register informations
        //get current user who signed in
        //update profile with register.vue
    },
    modules: {

    }
})
