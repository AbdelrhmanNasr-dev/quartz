---
date: <% tp.file.creation_date("YYYY-MM-DD") %>
modified: 2026-06-03T22:23:46+03:00
name: <% tp.file.title %>
phone:
email:
job:
work/school:
nationality:
aliases:
Date of birth:
tags:
follow up: false
---

# [[<% tp.file.title %>]]

## Bio

- **Birthday:** `= this["Date of birth"]`
- **Age:** `= round((date(today) - this["Date of birth"]).years)` year
- **Days left on his birthday:** `= (choice(date(date(today).year + "-" + dateformat(this["Date of birth"], "MM-dd")) >= date(today), date(date(today).year + "-" + dateformat(this["Date of birth"], "MM-dd")), date((date(today).year + 1) + "-" + dateformat(this["Date of birth"], "MM-dd"))) - date(today)).days` day

## How we met



## Family


## Personality

- Goal: 
- Attitude:
- Stake:

## Things I learned from them



## Meetings

```dataview
TABLE date, summary
FROM "01 - Areas/Meetings" 
WHERE contains(attendees, this.file.link)
SORT date DESC
```

