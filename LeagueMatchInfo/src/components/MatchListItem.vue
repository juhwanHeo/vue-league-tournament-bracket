<template>
    <div class="matches-list-item">
        <div class="matches-list-card">
            <div class="item-players item-player1">
                {{games.player1.name}}
            </div>

            <div class="item-score"
                v-if="isAfterPlay ">
                <div class="item-score1"
                    v-bind:class="{'item-player-win': games.player1.winner}">
                    {{ games.player1.score }}
                </div>

                <div class="item-score2"
                    v-bind:class="{'item-player-win': games.player2.winner}">
                    {{ games.player2.score }}
                </div>
            </div>
            <div class="item-score"
                v-else>

                <div class="item-score-no">
                    VS
                </div>
            </div>


            <div class="item-players item-player2">
                {{games.player2.name}}
            </div>
        </div>
    </div>
</template>

<script>
// this.games.winner
    export default {
        name: "match-list-item",
        props: ["games"],
        computed: {
            isAfterPlay() {
                return this.games.player1.winner !== null;
            }
        },

        methods: {

        }
    };
</script>

<style>
    .matches-list-item {
        width: 100%;
        height: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        background-color: #5b5c64;
    }

    .matches-list-card {
        height: 30px;
        background-color: #5b5c64;
    }

    @media screen and (max-width: 425px) {
        .matches-list-card {
            width: 100%;
        }
        .item-player1 {
            min-width: 75px;
            max-width: 75px;
        }
        .item-player2 {
            min-width: 75px;
            max-width: 75px;
        }
    }

    @media screen and (min-width: 425px) and (max-width: 475px){
        .matches-list-card {
            width: 80%;
        }
        .item-player1 {
            min-width: 75px;
            max-width: 75px;
        }
        .item-player2 {
            min-width: 75px;
            max-width: 75px;
        }
    }

    @media screen and (min-width: 475px) {
        .matches-list-card {
            width: 70%;
        }
        .item-player1 {
            min-width: 100px;
            max-width: 100px;
        }
        .item-player2 {
            min-width: 100px;
            max-width: 100px;
        }
    }

    .item-players {
        font-size: 16px;
        font-weight: 600;
        color: white;
        background-color: #5b5c64;
        margin: 5px;
        display: inline-block;
    }

    .item-player1 {
        text-overflow: ellipsis;
        white-space:nowrap;
        overflow:hidden;
        float: left;
    }

    .item-player2 {
        text-overflow: ellipsis;
        white-space:nowrap;
        overflow:hidden;
        float: right;
    }

    .item-player-win {
        color: #06d6a0;
    }

    .item-player-defeated {
        color: #a3a4a9;
    }

    .item-score {
        font-size: 20px;
        font-weight: 700;
        color: #a3a4a9;
        display: inline-block;

    }
    .item-score-no {
        width: 50px;
        height: 30px;
        font-size: 20px;
        font-weight: 700;
        color: #a3a4a9;
        background-color: #27282d;
        display: inline-block;
        text-align: center;
    }

    .item-score1 {
        width: 30px;
        height: 30px;
        background-color: #27282d;
        display: inline-block;
        text-align: center;
        margin-right: 1px;
    }
    .item-score2 {
        width: 30px;
        height: 30px;
        background-color: #27282d;
        display: inline-block;
        text-align: center;
        margin-left: 1px;

    }

</style>
