<template>
    <div class="vtb-item-players">
        <div>
            <div
                :class="['vtb-player', 'vtb-player1', getPlayerClass(bracketNode.player1)]"
                @mouseover="highlightPlayer(bracketNode.player1.id)"
                @mouseleave="unhighlightPlayer"
            >
                <slot :player="bracketNode.player1" name="player" />

                <div class="vtb-player-score">
                    {{bracketNode.player1.score}}
                </div>
            </div>

            <div
                :class="['vtb-player', 'vtb-player2', getPlayerClass(bracketNode.player2)]"
                @mouseover="highlightPlayer(bracketNode.player2.id)"
                @mouseleave="unhighlightPlayer"
            >
                <slot :player="bracketNode.player2" name="player" />

                <span class="vtb-player-score">
                    {{bracketNode.player2.score}}
                </span>
            </div>
        </div>
        <slot name="player-extension-bottom" :match="matchProperties" />
    </div>
</template>
<style>
    .vtb-player {
        width: calc(100% - 80px);
        height: calc(100% - 80px);
    }

    .vtb-player1 {
        border-radius: 10px 10px 0 0;
    }

    .vtb-player2 {
        border-radius: 0 0 10px 10px ;
    }
    


    .vtb-item-players {
        background-color: #3b3c40;
    }

    .vtb-player .vtb-player-score {
        margin-left: auto;
        margin-right: auto;
        line-height: 25px;
        float: right;
        text-align: center;

        width: 10%;
        height: 100%; 
        /* background-color: #1e2025; */
    }
</style>
<script>
    export default {
        name: "game-players",
        props: ["bracketNode", "highlightedPlayerId"],
        computed: {
            matchProperties() {
                return Object.assign({}, this.bracketNode, { games: undefined, hasParent: undefined });
            }
        },
        methods: {
            getPlayerClass(player) {

                let clazz = "no-class";
                if (player.winner === null || player.winner === undefined) {
                    clazz =  "no-class";
                }
                else if (player.winner) {
                    clazz = "winner";
                }
                else clazz = "defeated";

                if (player.id !== null && this.highlightedPlayerId === player.id) {
                    clazz += " highlight";
                }

                return clazz;
            },
            highlightPlayer(playerId) {
                this.$emit("onSelectedPlayer", playerId);
            },
            unhighlightPlayer() {
                this.$emit("onDeselectedPlayer");
            }
        }
    };
</script>
