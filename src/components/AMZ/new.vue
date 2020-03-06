<template> </template>

<script>
import { mapGetters } from "vuex";
export default {
 name: "AmzGraph",
components: {}, data: () => ({ loaded: false, chartdata: null }), methods: {
toggleAmzGraph() { this.$store.commit("toggle_amz_graph"); } }, computed: {
...mapGetters({ amzGraphVisible: "amzGraphVisible" }), graph: { get() { return
this.amzGraphVisible; }, set(newValue) { return newValue; } }, currentItem() {
return this.$store.getters.currentItem; }, graphRes() { return
this.$store.getters.graphRes; }, minMax() { return this.$store.getters.minMax;
}, days() { return this.$store.getters.days; } }, async mounted() { this.loaded
= false; try { await this.$store.dispatch("amz_graph").then(res => {
this.chartdata = res; this.loaded = true; }); } catch (e) { console.error(e); }
} };
}
</script>

<style></style>
