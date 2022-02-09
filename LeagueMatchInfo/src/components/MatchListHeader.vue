<template>
    <div class="matches-list-header">
        {{getGang}}
    </div>
</template>

<script>

    export default {
        name: "match-list-header",
        props: ["games", "isBracket"],
        computed: {
            getGang() {
                console.log("header: " + JSON.stringify(this.games));
                if(!this.isBracket && this.games[0].player1.lvl === "99") return "3, 4위전";
                let round = 2 * this.games.length;
                return round !== 2 ? round + "강" : "결승";
            }
        },
        methods: {

        }
    };
</script>

<style>
    .matches-list-header {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 50px;
        background-color: #1e2025;
        color: aliceblue;
        font-size: 16px;
        font-weight: 600;
    }


</style>
