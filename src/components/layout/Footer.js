import React from 'react'
import fterStyle from '../../styles/FooterStyles'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import Link from '@material-ui/core/Link';
import Icon from '@material-ui/core/Icon';

import newsLogo from '../../image/newsletter.png'
import visaIcon from '../../image/visa.svg'
import jcbIcon from '../../image/jcb.svg'
import cashIcon from '../../image/cash.svg'
import installmentIcon from '../../image/installment.svg'
import internetIcon from '../../image/internet.svg'
import mastercardIcon from '../../image/mastercard.svg'
import fbIcon from '../../image/fb.svg'
import youtubeIcon from '../../image/youtube.svg'
import appstore from '../../image/appstore.png'
import playstore from '../../image/playstore.png'
import zalo from '../../image/Logo_Zalo.png'


function Footer() {
  const classes = fterStyle();
  const newsletter = <Grid className={classes.news} container spacing={0} >
    <Grid item xs={2} sm={2} style ={{paddingTop:"1.5em"}}>
      <img alt="newslogo" src={newsLogo} className={classes.imageNews} style={{}}/>
    </Grid>
    <section style ={{paddingTop:"3em"}}>
    <Grid container spacing={4}>

        <Grid item xs={3} sm={7} >
          <Typography variant="h6" className={classes.newsTypo} noWrap>
            Subscribed to receive letter from Tiki
          </Typography>
          <Typography variant="h7" className={classes.newsTypo} noWrap>
            Dont slip your chance to collect thousand of deals everyday
          </Typography>
        </Grid>
        <Grid item xs={7} sm={5} >
          <form className={classes.form} noValidate autoComplete="off" >
            <TextField id="email" label="Your email" variant="outlined"
            className={classes.subscribeText} InputProps={{classes: { input : classes.input1 }  }} />
            <Button variant="contained" color="primary" style={{marginLeft:"0.3em"}}>
              Subscribe
            </Button>
          </form>
        </Grid>
    </Grid>

    </section>

  </Grid>;

  const about = <Grid container spacing={0}>
    <Grid container item xs={3} spacing={2} className={classes.mobileMode} >
      <Grid item xs={6} sm={12}>
        <Typography style={{fontWeight:'bold',lineHeight:3,paddingBottom:"0.47em"}}>Customer Service</Typography>
      </Grid>
      <Grid item xs={6} sm={12}>
        <Typography style={{color:"red",lineHeight:1,fontSize:"1.1em"}}>Hotline Order: 1800-9999-9999</Typography>
        <Typography >(Free,8-21h include Sat,Sun)</Typography>
      </Grid>
      <Grid item xs={6} sm={12}>
        <Typography style={{color:"red",lineHeight:1,fontSize:"1.1em"}}>Customer Service: 1900-6034</Typography>
        <Typography >(10$/min, 8-21 include Sat,Sun)</Typography>
      </Grid>
      <Grid item xs={6} sm={12} className={classes.fteritem1}>Question&Answer</Grid>
      <Grid item xs={6} sm={12} className={classes.fteritem1}>Ask for Support</Grid>
      <Grid item xs={6} sm={12} className={classes.fteritem1}>Ordering Instruction</Grid>
      <Grid item xs={6} sm={12} className={classes.fteritem1}>Transport Method</Grid>
      <Grid item xs={6} sm={12} className={classes.fteritem1}>Refund Policy</Grid>
      <Grid item xs={6} sm={12} className={classes.fteritem1}>Customer Support:support@tiki.vn</Grid>

    </Grid>
    <Grid container item xs={2} spacing={0} className={classes.mobileMode}>
      <Grid item xs={6} sm={12}>
        <Typography style={{fontWeight:'bold',lineHeight:3}}>About Tiki</Typography>
      </Grid>
      <Grid item xs={6} sm={12}>Tiki Introduction</Grid>
      <Grid item xs={6} sm={12}>Recruitment</Grid>
      <Grid item xs={6} sm={12}>Payment Security</Grid>
      <Grid item xs={6} sm={12}>Information Security</Grid>
      <Grid item xs={6} sm={12}>Term&Agreement</Grid>
      <Grid item xs={6} sm={12}>Tiki Advice</Grid>
      <Grid item xs={6} sm={12}></Grid>
      <Grid item xs={6} sm={12}></Grid>
      <Grid item xs={6} sm={12}></Grid>
      <Grid item xs={6} sm={12}></Grid>
      <Grid item xs={6} sm={12}></Grid>
    </Grid>
    <Grid container item xs={2} spacing={0} className={classes.mobileMode}>
      <Grid item xs={6} sm={12}>
        <Typography style={{fontWeight:'bold',lineHeight:3,paddingBottom:"1.3em"}}>Associate and Connect
        </Typography>
        <Grid style={{paddingBottom:"1.5em"}}>Work Regulation
        </Grid>
        <Grid item xs={6} sm={12}>Sell with Tiki
        </Grid>
      </Grid>
    </Grid>
    <Grid container item xs={6} sm={6} md={2} spacing={0} style={{paddingLeft:"1em"}} >
      <Typography style={{fontWeight:'bold',lineHeight:3,paddingBottom:"1.3em"}}>Payment Method
      <Grid style={{paddingTop:"1.3em",lineHeight:1}}>
        <Icon className={classes.iconRoot}>
          <img alt="visa" className={classes.icon} src={visaIcon} />
        </Icon>
        <Icon className={classes.iconRoot}>
          <img alt="master" className={classes.icon} src={mastercardIcon} />
        </Icon>
        <Icon className={classes.iconRoot}>
          <img alt="jcb" className={classes.icon} src={jcbIcon} />
        </Icon>
      </Grid>
      <Grid>
        <Icon className={classes.iconRoot}>
          <img alt="cash" className={classes.icon} src={cashIcon} />
        </Icon>
        <Icon className={classes.iconRoot}>
          <img alt="internet" className={classes.icon} src={internetIcon} />
        </Icon>
        <Icon className={classes.iconRoot}>
          <img alt="installment" className={classes.icon} src={installmentIcon} />
        </Icon>
      </Grid>
      </Typography>

    </Grid>
    <Grid container item xs={6} sm={6} md={3} spacing={0} style={{paddingLeft:"3em"}}>
      <Typography style={{fontWeight:'bold',lineHeight:3}}>Connect with Us
        <Grid style={{paddingTop:"1.2em",lineHeight:1}}>
          <Link href="https://www.facebook.com/praise.oketola" >
            <Icon className={classes.iconRoot}>
              <img alt="fb" className={classes.icon} src={fbIcon} />
            </Icon>
          </Link>
          <Icon className={classes.iconRoot}>
            <img alt="yt" className={classes.icon} src={youtubeIcon} />
          </Icon>
          <Icon className={classes.iconRoot}>
            <img alt="zalo" className={classes.icon} src={zalo} style={{width:32,height:32}}/>
          </Icon>
        </Grid>
        <Grid>
          <Typography style={{fontWeight:'bold',lineHeight:3}}>Install App On Your Mobile
            <Grid>
              <img alt="appstore" className={classes.apprefer} src={appstore} />
              <img alt="playstore" className={classes.apprefer} src={playstore} />
            </Grid>
          </Typography>
        </Grid>
      </Typography>

    </Grid>
  </Grid>

  return (
    <div className={classes.root}>
      <div className={classes.news}>
        {newsletter}
      </div>
      <div className= {classes.about}>
      {about}
      </div>
    </div>
  );
}

export default Footer
