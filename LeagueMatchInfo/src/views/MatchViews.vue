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
                    :loading="isLoading"
                    v-model="leagueDefault"
                    :items="leagueItems"
                    item-text="leag_nm"
                    item-value="leag_no"
                    label="League"
                    @input="getGames"
                    outlined
                />
            </v-col>

            <v-col
                cols="12"
                sm="6">
                <v-select
                    class="league-match-select"
                    :loading="isLoading"
                    v-model="gameDefault"
                    :items="gameItems"
                    item-text="game_nm"
                    item-value="game_no"
                    label="Game"
                    @input="getGameInfo"
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
                leagueDefault: '202101',
                gameDefault: '202101002',
                leagueItems: [],
                gameItems: [],
                rounds: [
                ],
                leag_no: null,
                game_no: null,
                loading: null,
                isLoading: true
            };
        },
        computed: {
            getGameItems() {
                return this.gameItems;
            },
            getRounds() {
                return this.rounds;
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.loading = setInterval(this.getLeagues, 1000);

            },
            async getLeagues() {
                // await axios.get(`https://hleague.hallym.ac.kr:2443/api/leagues/`)
                //     .then((result) => {
                //         console.log(result);
                //         this.leagueItems = result.data.data;

                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     })

                    this.leagueItems = [
                        {leag_nm : '2021 Intramural leagueue', leag_no : '202101'},
                        {leag_nm : '2022 Intramural leagueue Spring', leag_no : '202201'}
                    ];

                    this.gameItems =  [
                        {game_nm : '축구', game_no : '202101001'},
                        {game_nm : '농구', game_no : '202101002'},
                        {game_nm : '야구', game_no : '202101003'}
                    ]

                this.isLoading = false;
                clearInterval(this.loading);

            },

            async getGames(leag_no) {
                console.log('getGames!!: ' + leag_no);
                console.log(`leag_no: ${leag_no}`);
                this.leag_no = leag_no;
                // await axios.get(`https://hleague.hallym.ac.kr:2443/api/leagues/${this.league_no}`)
                //     .then((result) => {
                //         console.log(result);
                //         this.gameItems = result.data.data.game_no;
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     })

            },

            async getGameInfo(game_no) {
                console.log('getGameInfo!!: ' + game_no);
                console.log(`game_no: ${game_no}`);
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

                // await axios.get(`https://hleague.hallym.ac.kr:2443/api/leagues/${this.league_no}/games/${this.game_no}`)
                //     .then((result) => {
                //         console.log(result);
                //         this.gameInfo = result.data.data;
                //     })
                //     .catch((err) => {
                //         console.log(err);
                //     })
            },
    }
    };
</script>
