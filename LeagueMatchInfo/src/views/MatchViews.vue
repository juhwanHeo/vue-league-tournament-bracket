<template>

    <v-container
        id="leagueue-match-view"
        fluid
        tag="section"
    >
        <v-row
            align="center">
            <v-col
                cols="12"
                sm="6">
                <v-select
                    class="league-match-select"
                    :loading="isLeagueLoading"
                    v-model="leagueSelect"
                    :items="leagueItems"
                    item-text="leag_nm"
                    item-value="leag_no"
                    label="League"
                    outlined
                />
            </v-col>

            <v-col
                cols="12"
                sm="6">
                <v-select
                    class="league-match-select"
                    :loading="isGameLoading"
                    v-model="gameSelect"
                    :items="gameItems"
                    item-text="game_nm"
                    item-value="game_no"
                    label="Game"
                    outlined
                />
            </v-col>

        </v-row>

        <v-row>
        </v-row>
        <v-row>
            <v-col
                v-for="(item, i) in getRounds"
                :key="i"
                cols="12"
            >
                <material-card
                    :heading="item.heading"
                    color="accent"
                >
                    <v-card-text>
                        <v-sheet
                            class="card-text-sheet"
                            color="dark">
                            <bracket
                                class="card-bracket"
                                :rounds="item.round">
                                <template #player="{ player }">
                                    {{ player.name }}
                                </template>

                            <!-- <template #player-extension-bottom="{ match }">
                                Extra info: {{ match.title }}
                            </template> -->
                            </bracket>
                        </v-sheet>
                    </v-card-text>
                </material-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<style>
    .card-text-sheet {
        border-radius: 10px;
    }
    .league-match-select{
        width: 100%;
    }

    .card-bracket {
        padding: 10px;
        /* background-image: url('~@/assets/hallym-symbol-ui-mark.png');
        background-position: center; */
    }
</style>
<script>
    import Bracket from "./Bracket";
    import axios from 'axios'

    const rounds = [
        //Quarter
        {
            games: [
                {
                    player1: { id: "1", name: "Competitor 1", winner: true, score: 3 },
                    player2: { id: "2", name: "Competitor 2", winner: false, score: 1 }
                },
                {
                    player1: { id: "3", name: "Competitor 3", winner: false, score: 0 },
                    player2: { id: "4", name: "Competitor 4", winner: true, score: 1 }
                },
                {
                    player1: { id: "5", name: "Competitor 5", winner: true, score: 4 },
                    player2: { id: "6", name: "Competitor 6", winner: false, score: 2 }
                },
                {
                    player1: { id: "7", name: "Competitor 7", winner: false, score: 1 },
                    player2: { id: "8", name: "Competitor 8", winner: true, score: 3 }
                }
            ]
        },
        //Semi
        {
            games: [
                {
                    player1: { id: "1", name: "Competitor 1", winner: false, score: 0 },
                    player2: { id: "4", name: "Competitor 4", winner: true, score: 1 }
                },
                {
                    player1: { id: "5", name: "Competitor 5", winner: null, score: 0 },
                    player2: { id: "8", name: "Competitor 8", winner: null, score: 0 }
                }
            ]
        },
        //Final
        {
            games: [
                {
                    player1: { id: "4", name: "Competitor 4", winner: null, score: 0 },
                    player2: { id: null, name: "미정", winner: null, score: 0 }
                }
            ]
        }
    ];

    const rounds2 = [
        //16 gang
        {
            games: [
                {
                    player1: { id: "1", name: "Competitor 1", winner: true, score: 3 },
                    player2: { id: "2", name: "Competitor 2", winner: false, score: 1 }
                },
                {
                    player1: { id: "3", name: "Competitor 3", winner: false, score: 0 },
                    player2: { id: "4", name: "Competitor 4", winner: true, score: 1 }
                },
                {
                    player1: { id: "5", name: "Competitor 5", winner: true, score: 4 },
                    player2: { id: "6", name: "Competitor 6", winner: false, score: 2 }
                },
                {
                    player1: { id: "7", name: "Competitor 7", winner: false, score: 1 },
                    player2: { id: "8", name: "Competitor 8", winner: true, score: 3 }
                },
                {
                    player1: { id: "9", name: "Competitor 9", winner: true, score: 3 },
                    player2: { id: "10", name: "Competitor 10", winner: false, score: 1 }
                },
                {
                    player1: { id: "11", name: "Competitor 11", winner: false, score: 0 },
                    player2: { id: "12", name: "Competitor 12", winner: true, score: 1 }
                },
                {
                    player1: { id: "13", name: "Competitor 13", winner: true, score: 4 },
                    player2: { id: "14", name: "Competitor 14", winner: false, score: 2 }
                },
                {
                    player1: { id: "15", name: "Competitor 15", winner: false, score: 1 },
                    player2: { id: "16", name: "Competitor 16", winner: true, score: 3 }
                }
            ]
        },
        //Quarter
        {
            games: [
                {
                    player1: { id: "1", name: "Competitor 1", winner: false, score: 0 },
                    player2: { id: "4", name: "Competitor 4", winner: true, score: 1 },
                },
                {

                    player1: { id: "5", name: "Competitor 5", winner: false, score: 3 },
                    player2: { id: "8", name: "Competitor 8", winner: true, score: 2 }
                },
                {

                    player1: { id: "9", name: "Competitor 9", winner: false, score: 3 },
                    player2: { id: "12", name: "Competitor 12", winner: true, score: 2 },
                },
                {
                    player1: { id: "13", name: "Competitor 13", winner: false, score: 3 },
                    player2: { id: "16", name: "Competitor 16", winner: true, score: 2 }
                }
            ]
        },
        //Semi
        {
            games: [
                {
                    player1: { id: "4", name: "Competitor 4", winner: false, score: 0 },
                    player2: { id: "8", name: "Competitor 8", winner: true, score: 1 }
                },
                {
                    player1: { id: "12", name: "Competitor 12", winner: null, score: 0 },
                    player2: { id: "16", name: "Competitor 16", winner: null, score: 0 }
                }
            ]
        },
        //Final
        {
            games: [
                {
                    player1: { id: "8", name: "Competitor 8", winner: null, score: 0 },
                    player2: { id: null, name: "미정", winner: null, score: 0 }
                }
            ]
        }
    ];

    export default {
        name: "matchViews",
        components: {
            Bracket
        },
        data() {
            return {
                leagueSelect: null,
                gameSelect: null,
                leagueItems: [],
                gameItems: [],
                rounds: [],
                leag_no: null,
                game_no: null,
                isLeagueLoading: true,
                isGameLoading: false
            };
        },
        mounted() {
            this.init();
        },
        computed: {
            getGameItems() {
                return this.gameItems;
            },
            getRounds() {
                return this.rounds;
            }
        },
        watch: {
            leagueSelect: function(val) {
                this.getGames(val);
            },
            gameSelect:function(val) {
                this.getGameInfo(val);
            }
        },
        methods: {
            init() {
                this.getLeagues();
            },
            async getLeagues() {
                this.isLeagueLoading = true;
                await axios.get(`/api/leagues`)
                    .then((result) => {
                        console.log("leages: " + result);
                        this.leagueItems = result.data.data;
                        this.leagueSelect = this.leagueItems[0].leag_no;
                        console.log("leagueSelect : " + this.leagueSelect);
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                this.isLeagueLoading = false;
            },

            async getGames(leag_no) {
                this.isGameLoading = true;
                this.leag_no = leag_no;

                await axios.get(`/api/leagues/${leag_no}/games`)
                    .then((result) => {
                        console.log("games: " + result);
                        this.gameItems = result.data.data;
                        this.gameSelect = this.gameItems[0].game_no;
                        console.log("gameSelect : " + this.gameSelect);
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                this.isGameLoading = false;

            },

            async getGameInfo(game_no) {
                this.game_no = game_no;
                this.rounds = [
                        {
                            heading: 'leagueue Match',
                            round: rounds2,
                        },

                        {
                            heading: 'leagueue Match',
                            round: rounds
                        }
                    ];

                await axios.get(`/api/leagues/${this.league_no}/games/${this.game_no}`)
                    .then((result) => {
                        console.log(result);
                        this.gameInfo = result.data.data;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
    }
    };
</script>
