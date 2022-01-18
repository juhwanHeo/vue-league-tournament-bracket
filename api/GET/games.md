# RestLeague ( `/api/leagues/{leag_no}/games` )
## Request Method: `GET`
## PathVariable: `leag_no`
## Ex) `get: /api/leagues/202101/games`
- get: /api/leagues/202101/games
## Response Ex)

|한국명|영문명|셈플데이터|설명|
|---|---|---|---|
|결과코드|code|200|결과코드|
|결과메시지|msg|ok|결과메세지|
|리그번호|leag_no|202101|리그일련번호|
|종목번호|game_no|202101001|종목일련번호|
|성별코드|gender_cd|003001|해당 종목의 성별코드: <br>003001(남), 003002(여), 003003(공통)|
|종목코드|game_cd|001001|해당 종목의 종목코드: <br>001001(축구), 001002(농구), 001003(야구)....|
|참가인원|entry_cnt|13|해당 종목의 팀별 최소 참가인원|
|그룹 수|group_cnt|4|(더블) 리그 방식에서 한 그룹의 팀 수|
|최대참가팀수|max_team_cnt|13|해당 종목의 최대 참가 팀수|
|경기규칙|rule|경기 규칙 입니다.|종목의 경기 규칙|
|운영방식코드|operate_cd|002003|해당 종목의 경기 운영 방식코드: <br>리그(002001), 더블리그(002004), 토너먼트(002002), 혼합(002003)|
|운영시작일|st_dt|2021/11/08|운영 시작일|
|운영시작시간|st_hm|10:30|운영 시작 시간|
|운영종료일|ed_dt|2021/11/30|운영 종료일|
|운영종료시간|ed_hm|12:30|운영 종료 시간|
|신청시작일|st_apply_dt|2021/11/02|참가신청 시작 일|
|신청종료일|ed_apply_dt|2021/11/05|참가신청 종료 일|
|리그명|leag_nm|2021 Intramural League|리그 명|
|출석인정시간|admit_time|180|출석 인정 시간 (분)|
|종목명|game_nm|축구(남)|종목 명|
|성별명|gender_nm|남자|성별 명|
|운영방식명|operate_nm|혼합|운영방식 명|
|년도|year|2021|진행 년도|
|학기|hakgi|2|진행 학기|

---

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
            "st_hm": 10:30,
            "ed_dt": "2021/11/30",
            "ed_hm": 12:30,
            "st_apply_dt": "2021/11/02",
            "ed_apply_dt": "2021/11/05",
            "admit_time": 180,
            "leag_nm": "2021 Intramural League",
            "game_nm": "축구(남)",
            "gender_nm": "남자",
            "operate_nm": "혼합",
            "year": "2021",
            "hakgi": "2"
        }
    ]
}
```
