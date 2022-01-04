# RestLeague ( `/api/leagues/{leag_no}/games` )
## Request Method: `GET`
## PathVariable: `leag_no`
## Ex) `get: /api/leagues/202101/games`
- get: /api/leagues/202101/games
## Response Ex)
```json
{
    "code": 200,
    "msg": "ok",
    "data": [
        {
            "leag_no": "202101",
            "game_no": "202101001",
            "gender_cd": "003001",
            "game_cd": "001001",
            "entry_cnt": 13,
            "group_cnt": 4,
            "max_team_cnt": 40,
            "rule": "리그 후 상하위 토너먼트",
            "operate_cd": "002003",
            "st_dt": "2021/11/08",
            "st_hm": null,
            "ed_dt": "2021/11/30",
            "ed_hm": null,
            "st_apply_dt": "2021/11/02",
            "ed_apply_dt": "2021/11/05",
            "admit_time": 180,
            "input_date": "2021-11-01T06:33:29.000+0000",
            "update_date": "2021-11-08T12:08:00.000+0000",
            "leag_nm": "2021 Intramural League",
            "game_nm": "축구(남)",
            "gender_nm": "남자",
            "operate_nm": "혼합",
            "year": "2021",
            "hakgi": "2",
            "process_nm": "경기전"
        },
        {
            "..."
        }
    ]
}
```
