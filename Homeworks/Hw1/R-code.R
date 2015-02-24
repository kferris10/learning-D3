
library(ggplot2)
library(ggthemes)
library(grid)
library(scales)
library(dplyr)
# setwd("~/School/Stat_592-D3/Homeworks/Hw1")
dat <- data_frame(scout = seq(20, 80, by = 10), 
                  avg = c(.220, .240, .250, .270, .280, .290, .310))

p1 <- ggplot(dat, aes(x = scout, y = avg)) + 
  stat_bin2d(fill = muted("red"), alpha = I(.5)) + 
  geom_hline(aes(yintercept = .25), linetype = "dashed") + 
  geom_text(aes(x = 30, y = .280, label = "Typical BA in 2014")) + 
  geom_segment(aes(x = 30, y = .275, xend = 33, yend = .251), 
               arrow = arrow(length = unit(0.4,"cm"))) + 
  guides(fill = F) + 
  theme_igray() + 
  scale_x_continuous(breaks = seq(20, 80, by = 10)) + 
  scale_y_continuous(breaks = c(.22, .24, .26, .28, .3), 
                     labels = c("0.220", "0.240", "0.260", "0.280", "0.300")) + 
  labs(x = "Scouting Scale", 
       y = "Batting Average")
p1
ggsave("scouting-scale.png", p1, width = 6, height = 4)



