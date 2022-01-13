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
                    :items="leagueItems"
                    :loading="isLeagueLoading"
                    item-text="leag_nm"
                    item-value="leag_no"
                    label="League"
                    persistent-hint
                    return-object
                    outlined
                />
            </v-col>

            <v-col
                cols="12"
                sm="6">
                <v-select
                    class="league-match-select"
                    v-model="gameSelect"
                    :items="gameItems"
                    :loading="isGameLoading"
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

        <!-- Tournament  1315-->
        <v-row>
            <v-col
                cols="12"
            >
                <material-card
                    v-for="(item, index) in rounds"
                    :key="index"
                    :heading="item.heading"
                    color="accent"
                >
                    <v-card-text
                        v-if="width >= tmChangeSize">
                        <v-sheet
                            class="card-text-sheet"
                            color="dark">
                            <bracket
                                class="card-bracket"
                                :rounds="item.round">
                                <template #player="{ player }">
                                    {{ player.name ? player.name : "미정" }}
                                </template>

                            <!--
                                <template #player-extension-bottom="{ match }">
                                    Extra info: {{ match.title }}
                                </template>
                            -->
                            </bracket>
                        </v-sheet>
                    </v-card-text>
                    <div class="card-text-sheet-items"
                        v-else
                        v-for="(roundItem, roundIndex) in item.round"
                        :key="roundIndex"
                        >
                        <match-list-header
                            :games="roundItem.games"
                        >
                        </match-list-header>

                        <div
                            v-for="(gamesItem, gamesIndex) in roundItem.games"
                            :key="gamesIndex">

                            <match-list-item
                                :games="gamesItem"
                                >
                            </match-list-item>
                            <v-divider class="match-list-divider" />
                        </div>


                    </div>
                </material-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<style>
    .card-text-sheet {
        border-radius: 10px;
    }
    .card-text-sheet-items{
        padding: 10px;
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
    import MatchListItem from "./../components/MatchListItem"
    import MatchListHeader from '../components/MatchListHeader';
    import axios from 'axios'

    const defaultRounds = [
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
    export default {
        name: "matchViews",
        components: {
            Bracket,
            MatchListItem,
            MatchListHeader
        },
        data() {
            return {
                leagueSelect: {leag_no : 0, leag_nm: '로딩 중'},
                gameSelect: {game_no : 0, game_nm: '로딩 중'},
                leagueItems: [{leag_no : 0, leag_nm: '로딩 중'}],
                gameItems: [{game_no : 0, game_nm: '로딩 중'}],
                rounds: null,
                leag_no: [],
                game_no: [],
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
                height: window.innerHeight,
                roundsList: null,
                tmFristCount: 0

            };
        },
        mounted() {
            this.init();

            window.addEventListener('resize', this.handleResize);
        },
        beforeDestory() {
            window.removeEventListener('resize', this.handleResize);
        },
        computed: {
            tmChangeSize() {
                let size;

                switch (this.tmFristCount) {
                    case 1:
                    case 2: size = 550; break;
                    case 3:
                    case 4: size = 1060; break;
                    case 5:
                    case 6:
                    case 7:
                    case 8: size = 1310; break;
                    default: size = 1;

                }

                return size;
            }

        },
        watch: {
            leagueSelect: function(val) {
                // console.log('watch leagueSelect val: ' + JSON.stringify(val));
                if (val) {
                    if (typeof val === 'object')
                        this.getGames(val.leag_no);
                    else
                        this.getGames(val);
                }
            },
            gameSelect: function(val) {
                // console.log('watch gameSelect val: ' + JSON.stringify(val));
                if (val) {
                    if (typeof val === 'object')
                        this.getGameInfo(val.game_no);
                    else
                        this.getGameInfo(val);
                }
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
            getRound(val) {
                console.log("[getRound] : " + val)

                let round = val * 2;
                return round !== 2 ? round : "결승"
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
                        this.leagueItems = result.data.data;
                        this.leagueSelect = this.leagueItems[0].leag_no;
                        console.log('[getLeages] select: ' + this.leagueItems[0].leag_no);
                    })
                    .catch((err) => {
                        console.log(err);
                    })

                this.isLeagueLoading = false;
            },
            async getGames(leag_no) {
                console.log('getGames: ' + leag_no);
                this.isGameLoading = true;
                this.leag_no = leag_no;
                await axios.get(`/api/leagues/${leag_no}/games`)
                    .then((result) => {
                        this.gameItems = result.data.data;
                        this.gameSelect = this.gameItems[0].game_no;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.isGameLoading = false;
                        this.gameSelect = {game_no : 0, game_nm: '로딩 중'};
                        this.gameItems = [{game_no : 0, game_nm: '로딩 중'}];
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
                        if (result.data.data.tm) {
                            this.rounds = [{
                                    heading: 'Tournament Match',
                                    round: result.data.data.tm
                                    // round: defaultRounds
                                }]

                            this.tmFristCount = this.rounds[0].round[0].games.length
                        }

                        this.roundsList = defaultRounds;
                        this.ranking = result.data.data.rankList;
                    })
                    .catch((err) => {
                        console.log(err);
                        this.rounds = null;
                        this.ranking = null;
                    })

                this.isMatchesLoading = false;
            },
        }
    };
</script>
