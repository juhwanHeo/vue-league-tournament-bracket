# RestLeague ( `/api/leagues` )
## Request Method: `GET`
## Ex) `get: /api/leagues`
- get: /api/leagues
## Response Ex)
|한국명|영문명|셈플데이터|설명|
|---|---|---|---|
|결과코드|code|200|결과코드|
|결과메시지|msg|ok|결과메세지|
|리그번호|leag_no|202101|리그일련번호|
|리그명|leag_nm|2021 Intramural League|리그 명|
|년도|year|2021|진행 년도|
|학기|hakgi|2|진행 학기|
|리그시작일|game_st_dt|2021/11/08|리그 시작 일|
|리그종료일|game_ed_dt|2021/12/13|리그 종료 일|
|진행상황코드|process_cd|014001|리그 진행 상황 코드: <br>리그시작전(014001), 리그 진행중(014002), 리그 종료(014003)|

---
```json
{
    "code": 200,
    "msg": "ok",
    "data": [
        {
            "leag_no": "202101",
            "leag_nm": "2021 Intramural League",
            "year": "2021",
            "hakgi": "2",
            "game_st_dt": "2021/11/08",
            "game_ed_dt": "2021/12/13",
            "process_cd": "014001"
        }
    ]
}
```
