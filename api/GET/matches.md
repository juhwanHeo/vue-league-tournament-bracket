## RestLeague (`/api/leagues/{leag_no}/games/{game_no}/matches`)
## Request Method: `GET`
## PathVariable: `leag_no`, `game_no`
## Ex) `get: /api/leagues/202101/games/202101001/matches`
- get: /api/leagues/202101/games/202101001/matches
## Response Ex)
### 공통
|한국명|영문명|셈플데이터|설명|
|---|---|---|---|
|결과코드|code|200|결과코드|
|결과메시지|msg|ok|결과메세지|
---
### data: rankList
설명: (더블) 리그방식의 조별 순위 
|한국명|영문명|셈플데이터|설명|
|---|---|---|---|
|리그번호|leag_no|202101|리그일련번호|
|종목번호|game_no|202101001|종목일련번호|
|팀번호|team_no|202101001006|팀일련번호|
|팀명|team_nm|축구팀6|팀 명|
|그룹번호|group_no|1|그룹번호|
|레벨|lvl|0|레벨|
|승리횟수|win_cnt|0|팀의 승리횟수|
|패배횟수|loss_cnt|2|팀의 패배횟수|
|무승부횟수|draw_cnt|0|팀의 무승부횟수|
|승점|win_score|-2|승점:<br> 승 - 3점, 무승부 - 1점, 패배 -1점|
|득점|score|5|팀의 득점|
|실점|diff|7|팀의 실점|
|득실차|goal_diff|-2|득점 - 실점|
|순위|rank|3|그룹 순위|
---

### data: tm
설명: 토너먼트 방식에서 그래프를 그리기 위한 데이터
|한국명|영문명|셈플데이터|설명|
|---|---|---|---|
|팀번호|team_no|202101001002|팀일련번호|
|아이디|id|202101001002|팀일련번호 (토너먼트 대진표 그래프에서 사용)|
|레벨|lvl|1|레벨|
|승패코드|win_cd|009001|승패코드:<br> 009001(승), 009002(패), 009003(무승부), 0(경기전)|
|승패여부|winner|true|승패 여부 (토너먼트 대진표 그래프에서 색[css]를 판단할때 사용)|
|팀명|name|축구팀2|팀 명 (토너먼트 대진표 그래프에서 사용)|
|점수|score|1|팀의 점수 (토너먼트 대진표 그래프에서 사용)|
|그룹번호|group_no|0|팀의 그룹번호 (토너먼트: 0, 리그: 1~)|


---
```json
{
  "code": 200,
  "msg": "ok",
  "data": {
    "rankList": [
      [
        [
          {
            "leag_no": "202101",
            "game_no": "202101001",
            "team_no": "202101001003",
            "team_nm": "축구팀3",
            "group_no": "1",
            "lvl": "0",
            "win_cnt": 2,
            "loss_cnt": 0,
            "draw_cnt": 0,
            "win_score": 2,
            "score": 7,
            "diff": 4,
            "goal_diff": 3,
            "rank": 1
          },
          {
            "leag_no": "202101",
            "game_no": "202101001",
            "team_no": "202101001004",
            "team_nm": "축구팀4",
            "group_no": "1",
            "lvl": "0",
            "win_cnt": 1,
            "loss_cnt": 1,
            "draw_cnt": 0,
            "win_score": 0,
            "score": 4,
            "diff": 5,
            "goal_diff": -1,
            "rank": 2
          },
          {
            "leag_no": "202101",
            "game_no": "202101001",
            "team_no": "202101001006",
            "team_nm": "축구팀6",
            "group_no": "1",
            "lvl": "0",
            "win_cnt": 0,
            "loss_cnt": 2,
            "draw_cnt": 0,
            "win_score": -2,
            "score": 5,
            "diff": 7,
            "goal_diff": -2,
            "rank": 3
          }
        ],
        [
          {
            "leag_no": "202101",
            "game_no": "202101001",
            "team_no": "202101001001",
            "team_nm": "축구팀1",
            "group_no": "2",
            "lvl": "0",
            "win_cnt": 2,
            "loss_cnt": 0,
            "draw_cnt": 0,
            "win_score": 2,
            "score": 7,
            "diff": 3,
            "goal_diff": 4,
            "rank": 1
          },
          {
            "leag_no": "202101",
            "game_no": "202101001",
            "team_no": "202101001002",
            "team_nm": "축구팀2",
            "group_no": "2",
            "lvl": "0",
            "win_cnt": 1,
            "loss_cnt": 1,
            "draw_cnt": 0,
            "win_score": 0,
            "score": 4,
            "diff": 5,
            "goal_diff": -1,
            "rank": 2
          },
          {
            "leag_no": "202101",
            "game_no": "202101001",
            "team_no": "202101001005",
            "team_nm": "축구팀5",
            "group_no": "2",
            "lvl": "0",
            "win_cnt": 0,
            "loss_cnt": 2,
            "draw_cnt": 0,
            "win_score": -2,
            "score": 2,
            "diff": 5,
            "goal_diff": -3,
            "rank": 3
          }
        ]
      ]
    ],
    "tm": [
      {
        "games": [
          {
            "player1": {
              "team_no": "202101001002",
              "id": "202101001002",
              "lvl": "1",
              "win_cd": "009001",
              "winner": true,
              "name": "축구팀2",
              "score": 2,
              "group_no": "0"
            },
            "player2": {
              "team_no": "202101001003",
              "id": "202101001003",
              "lvl": "1",
              "win_cd": "009002",
              "winner": false,
              "name": "축구팀3",
              "score": 1,
              "group_no": "0"
            }
          },
          {
            "player1": {
              "team_no": "202101001001",
              "id": "202101001001",
              "lvl": "1",
              "win_cd": "009001",
              "winner": true,
              "name": "축구팀1",
              "score": 2,
              "group_no": "0"
            },
            "player2": {
              "team_no": "202101001004",
              "id": "202101001004",
              "lvl": "1",
              "win_cd": "009002",
              "winner": false,
              "name": "축구팀4",
              "score": 1,
              "group_no": "0"
            }
          }
        ]
      },
      {
        "games": [
          {
            "player1": {
              "team_no": "202101001002",
              "id": "202101001002",
              "lvl": "2",
              "win_cd": "0",
              "winner": null,
              "name": "축구팀2",
              "score": 0,
              "group_no": "0"
            },
            "player2": {
              "team_no": "202101001001",
              "id": "202101001001",
              "lvl": "2",
              "win_cd": "0",
              "winner": null,
              "name": "축구팀1",
              "score": 0,
              "group_no": "0"
            }
          }
        ]
      }
    ]
  }
}
```
