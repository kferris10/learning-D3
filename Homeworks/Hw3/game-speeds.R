
library(dplyr)
library(rCharts)
library(lubridate)

setwd("~/School/Stat_592-D3/Homeworks/Hw3")
dat <- read.csv("pitch-speeds.csv") %>% 
  tbl_df() %>% 
  mutate(date = as.Date(date))

p1  <- nPlot(avg_speed ~ date, 
             data = dat, 
             group = 'pitcher', 
             type = 'lineChart')
p1$xAxis(tickFormat="#!function(d) {return d3.time.format('%b %Y')(new Date( d * 86400000 ));}!#" )
p1$chart(useInteractiveGuideline=TRUE, 
         forceY = c(floor(min(dat$avg_speed)), floor(max(dat$avg_speed+1))), 
         margin = list(left = 100))
p1$templates$script <- "http://timelyportfolio.github.io/rCharts_nvd3_templates/chartWithTitle.html"
p1$set(title = "Phillies Average Fastball Speeds in 2013")
p1


p1$publish("fastball-speeds")
p1$save("fastball-speeds.html")
