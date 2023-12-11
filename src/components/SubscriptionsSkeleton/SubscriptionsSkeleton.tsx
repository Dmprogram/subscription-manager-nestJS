import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

import classes from './SubscriptionsSkeleton.module.css'

export const SubscriptionsSkeleton = () => (
  <Box sx={{ maxWidth: '1000px' }}>
    <Box className={classes.container}>
      <div className={classes.containerBox}>
        <div className={classes.leftContent}>
          <Skeleton sx={{ bgcolor: 'grey.800' }} width='40%' height={26} />
          <Skeleton sx={{ bgcolor: 'grey.800', marginTop: '3px' }} width='60%' height={26} />
          <Skeleton sx={{ bgcolor: 'grey.800', marginTop: '3px' }} width='80%' height={26} />
        </div>
        <div className={classes.rightContent}>
          <Skeleton sx={{ bgcolor: 'grey.800' }} width='100%' height={35} />
          <Skeleton sx={{ bgcolor: 'grey.800', marginTop: '5px' }} width='80%' height={35} />
        </div>
      </div>
    </Box>
    <Box className={classes.container}>
      <div className={classes.containerBox}>
        <div className={classes.leftContent}>
          <Skeleton sx={{ bgcolor: 'grey.800' }} width='40%' height={26} />
          <Skeleton sx={{ bgcolor: 'grey.800', marginTop: '3px' }} width='60%' height={26} />
          <Skeleton sx={{ bgcolor: 'grey.800', marginTop: '3px' }} width='80%' height={26} />
        </div>
        <div className={classes.rightContent}>
          <Skeleton sx={{ bgcolor: 'grey.800' }} width='100%' height={35} />
          <Skeleton sx={{ bgcolor: 'grey.800', marginTop: '5px' }} width='80%' height={35} />
        </div>
      </div>
    </Box>
    <Box className={classes.container}>
      <div className={classes.containerBox}>
        <div className={classes.leftContent}>
          <Skeleton sx={{ bgcolor: 'grey.800' }} width='40%' height={26} />
          <Skeleton sx={{ bgcolor: 'grey.800', marginTop: '3px' }} width='60%' height={26} />
          <Skeleton sx={{ bgcolor: 'grey.800', marginTop: '3px' }} width='80%' height={26} />
        </div>
        <div className={classes.rightContent}>
          <Skeleton sx={{ bgcolor: 'grey.800' }} width='100%' height={35} />
          <Skeleton sx={{ bgcolor: 'grey.800', marginTop: '5px' }} width='80%' height={35} />
        </div>
      </div>
    </Box>
  </Box>
)
