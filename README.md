# vue-league-tournament-bracket

  * [original]( https://github.com/kamilwylegala/vue-tournament-bracket ) Github

  * [league]( https://hleague.hallym.ac.kr:2443/ ) 에 `적용 예정`
  
## Development

Checkout repository and:
```
npm install
npm run serve
```

## Change
1, 점수 표기 추가  
  
2, 디자인 수정
  
```js
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
                    player1: { id: "5", name: "Competitor 5", winner: false, score: 3 },
                    player2: { id: "8", name: "Competitor 8", winner: true, score: 2 }
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
```
# LICENSE
`MIT License`
