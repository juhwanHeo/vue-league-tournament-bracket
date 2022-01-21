# vue-league-tournament-bracket

  * [original]( https://github.com/kamilwylegala/vue-tournament-bracket ) Github
  * [그래프 오픈소스]( https://www.chartjs.org/ ) Chart.js (ver 2.9.x)
  * [league]( https://hleague.hallym.ac.kr:2443/ ) 에 바로가기 링크 추가
  * [테스트 사이트](http://hleague.hallym.ac.kr:23003/components/matchViews/) `22.01.04 ~ 22.01.31` (테스트 기간)

## File

### ChangeOriginalBraket
  - original 디자인에서 색상 및 디자인을 변경한 파일

### LeagueMatchInfo
  - 테스트 사이트에 적용한 파일

## Development

Checkout repository and:
```
npm install yarn
yarn serve
```

## API
* [API README](https://github.com/juhwanHeo/vue-league-tournament-bracket/tree/main/api)

## Ex
### IMG
![LeagueInfo1](https://user-images.githubusercontent.com/47820142/145952772-5abe67d9-cd17-4041-ab02-8cf3edc79c8f.PNG)

(Mouse Hover)
![LeagueInfo2](https://user-images.githubusercontent.com/47820142/145952810-37313667-caa5-47a6-bb57-1eb4db789323.PNG)

### DATA
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
```

# LICENSE
ChangeOriginalBraket - `MIT License`  
LeagueMatchInfo - `Vuetify License`
