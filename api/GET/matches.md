# Bus_Log ( `/api/leagues/{leag_no}/games/{game_no}/matches` )
## Request Method: `GET`
## PathVariable: `leag_no`, `game_no`
## Ex) `get: /api/leagues/202101/games/202101001/matches`
- get: /api/leagues/202101/games/202101001/matches
## Response Ex)
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
            "other_score": 4,
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
            "other_score": 5,
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
            "other_score": 7,
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
            "other_score": 3,
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
            "other_score": 5,
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
            "other_score": 5,
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
