<template>

    <v-container
        id="leagueue-match-view"
        fluid
        tag="section"
    >
        <div> width: {{width}}, height: {{height}}</div>
        <v-row
            align="center">
            <v-col
                cols="12"
                sm="6">
                <v-select
                    class="league-match-select"
                    v-model="leagueSelect"
                    :loading="isLeagueLoading"
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
                    v-model="gameSelect"
                    :loading="isGameLoading"
                    :items="gameItems"
                    item-text="game_nm"
                    item-value="game_no"
                    label="Game"
                    outlined
                />
            </v-col>

        </v-row>

        <!-- League Rank -->
        <v-row>
            <v-col
                cols="12"
            >
                <material-card
                    v-for="(lvl, index) in ranking"
                    :key="index"
                    heading="League Ranking"
                    color="accent"
                    >
                    <v-card-text>
                        <material-card
                            v-for="(group, index2) in lvl"
                            :key="index2"
                            :heading="getChar(index2) + ` Group`"
                            color="#9C27b0"
                            >
                            <v-card-text>
                                <v-sheet
                                    class="card-text-sheet"
                                    color="dark">

                                    <v-data-table
                                        dark
                                        :headers="headers"
                                        :items="group"
                                        :items-per-page="30"
                                        hide-default-footer
                                        class="elevation-1"
                                    >
                                    <template v-slot:[`item.rank`]="{ item }">
                                        <v-chip
                                            :color="getColor(item.rank)"
                                            dark
                                        >
                                            {{ item.rank }}
                                        </v-chip>
                                        </template>
                                    </v-data-table>
                                </v-sheet>
                            </v-card-text>
                        </material-card>
                    </v-card-text>
                </material-card>
            </v-col>
        </v-row>

        <!-- Tournament -->
        <v-row>
            <v-col
                cols="12"
                v-if="width >= 1315"
            >
                <material-card
                    v-for="(item, index) in rounds"
                    :key="index"
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
                                    {{ player.name ? player.name : "미정" }}
                                </template>

                            <!-- <template #player-extension-bottom="{ match }">
                                Extra info: {{ match.title }}
                            </template> -->
                            </bracket>
                        </v-sheet>
                    </v-card-text>
                </material-card>
            </v-col>

            <v-col
                cols="12"
                v-else
            >
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
        /*
        background-image: url('~@/assets/hallym-symbol-ui-mark.png');
        background-position: center;
        */

    }
</style>
<script>
    import Bracket from "./Bracket";
    import axios from 'axios'

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
                rounds: null,
                leag_no: null,
                game_no: null,
                isLeagueLoading: true,
                isGameLoading: false,
                isMatchesLoading: true,
                headers: [
                    { text: 'Ranking ', value: 'rank' },
                    { text: 'Team Name', align: 'start', value: 'team_nm' },
                    { text: '승 (횟수)', value: 'win_cnt' },
                    { text: '패 (횟수)', value: 'loss_cnt' },
                    { text: '무승부 (횟수)', value: 'draw_cnt' },
                    { text: '승점', value: 'win_score' },
                    { text: '득실차', value: 'goal_diff' }
                ],

                ranking: [],
                width: window.innerWidth,
                height: window.innerHeight

            };
        },
        mounted() {
            this.init();

            window.addEventListener('resize', this.handleResize);
        },
        beforeDestory() {
            window.removeEventListener('resize', this.handleResize);
        },
        watch: {
            leagueSelect: function(val) {
                this.getGames(val);
            },
            gameSelect: function(val) {
                this.getGameInfo(val);
            }
        },
        methods: {
            init() {
                this.getLeagues();
            },
            handleResize(event) {
                this.width = window.innerWidth;
                this.height = window.innerHeight;
            },
            getChar(val) {
                return String.fromCharCode(val + 65);
            },
            getColor (rank) {
                let color;

                switch (rank) {
                    case 1 : color = 'red'; break;
                    case 2 : color = 'orange'; break;
                    case 3 : color = 'green'; break;
                    default : color = 'gray';
                }

                return color;
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
                this.isMatchesLoading = true;
                this.rounds = null;
                this.rank = null;

                await axios.get(`/api/leagues/${this.leag_no}/games/${this.game_no}/matches`)
                    .then((result) => {
                        console.log(JSON.stringify(result.data.data));
                        if (result.data.data.tm) {
                            this.rounds = [{
                                    heading: 'Tournament Match',
                                    round: result.data.data.tm
                                }]
                        }

                        this.ranking = result.data.data.rankList;


                        this.isMatchesLoading = false;
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            },
        }
    };
</script>
