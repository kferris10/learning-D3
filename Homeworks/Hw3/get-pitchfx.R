
library(dplyr)
library(lubridate)

phi_ids <- c("Hamels" = 430935, 
             "Burnett" = 150359, 
             "Lee" = 424324, 
             "Hernandez" = 433584, 
             "Kendrick" = 452718, 
             "Buchanan" = 571527, 
             "Williams" = 425532)
phi_dat <- data.frame(pit = names(phi_ids), 
                      pitcher = phi_ids)
setwd("~/")
db <- src_sqlite("~/Baseball Stuff/pitchfx/regseason13.sqlite3")

ab <- tbl(db, "atbat") %>% 
  filter(pitcher %in% phi_dat$pitcher) %>% 
  select(gameday_link, num, pitcher)
pit <- tbl(db, "pitch") %>% 
  filter(pitch_type %in% c("FF", "FT")) %>% 
  select(gameday_link, num, pitch_type, type_confidence, start_speed)

dat <- inner_join(ab, pit) %>% collect()
dat2 <- dat %>% 
  mutate(date = substr(gameday_link, 5, 14) %>% ymd()) %>% 
  group_by(pitcher, date) %>% 
  summarise(avg_speed = mean(start_speed), 
            num = n(), 
            se_speed = sqrt(var(start_speed) / num)) %>% 
  ungroup() %>% 
  inner_join(phi_dat) %>% 
  select(pit, date, num, avg_speed, se_speed) %>% 
  rename(pitcher = pit)

write.csv(dat2, file = "~/School/Stat_592-D3/Homeworks/Hw3/pitch-speeds.csv", quote = F, row.names = F)

