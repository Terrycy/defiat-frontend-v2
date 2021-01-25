import { Box, Button, Chip, Grid, Typography } from "@material-ui/core";
import React from "react";
import { Card } from "../../../components/Card";
import { Flex } from "../../../components/Flex";
import LinearProgress from "@material-ui/core/LinearProgress";
import { useDashboard } from "../../../hooks/useDashboard";
import { ArrowUpwardRounded } from "@material-ui/icons";

export const DashboardPointsCard = () => {
  const {data, upgrade} = useDashboard();

  return (
    <Card>
      <Flex align='center' justify='space-between' mb={2}>
        <Flex>
          <Typography variant="h5">
            DeFiat Points
          </Typography>
          {+data.pointsBalance <= +data.nextLevel && (
            <Box ml={2}>
              <Button 
                variant="contained"
                color="primary"
                startIcon={<ArrowUpwardRounded />}
                onClick={upgrade}
              >
                Upgrade Discount
              </Button>
            </Box>
          )}
        </Flex>
        
        <Flex align='flex-end'>
          <Typography variant="h5">{data ? data.pointsBalance : '0'}</Typography>
          <Typography variant="h5" color="textSecondary">/{data ? data.nextLevel : '0'}</Typography>
          <Typography variant="body1">DFTP</Typography>
        </Flex>
      </Flex>
      

      <Grid container spacing={2} alignItems="center" justify="center">
        <Grid item xs={1}>
          <Flex center column>
            <Chip label={data ? data.discountLevel : '0'} color="primary" />
            <Box mt={1}>
              <Typography color="textSecondary" variant="body2" align='center'>
                {+data.discountLevel * 10}% Discount  
              </Typography>
            </Box>
          </Flex>
        </Grid>

        <Grid item xs={10}>
          <LinearProgress variant="determinate" value={data ? (+data.pointsBalance/+data.nextLevel)*100 : 0} color="primary" />
        </Grid>

        <Grid item xs={1}>
          <Flex center column>
            <Chip label={data ? +data.discountLevel+1 : '0'} color="primary" />
            <Box mt={1}>
              <Typography color="textSecondary" variant="body2" align='center'>
                {+data.discountLevel + 1 * 10}% Discount
              </Typography>
            </Box>
          </Flex>
        </Grid>
      </Grid>
    </Card>
  );
};
