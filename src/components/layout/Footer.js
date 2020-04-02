import React from 'react'
import fterStyle from '../../styles/FooterStyles'

import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Typography} from '@material-ui/core';
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
import {Link} from "react-router-dom";


function Footer() {
  const classes = fterStyle();
  const newsletter = <Grid className={classes.news} container spacing={0}>
    <Grid item xs={2} sm={2}>
      <img alt="newslogo" src={newsLogo} className={classes.imageNews} style={{}}/>
    </Grid>
    <section style={{paddingTop: "2em", paddingBottom: '3em', width: "82%"}}>
      <Grid container spacing={4}>

        <Grid item xs={3} sm={5} direction={"column"} alignItems={'center'}>

          <p style={{fontWeight: "bold", margin: 0, fontSize: '1.1em', color: 'black'}}>
            <strong> Subscribe to receive letter from Tiki</strong>
          </p>
          <p style={{fontWeight: "bold", margin: 0, fontSize: '0.9em', color: 'black'}}>
            <strong>Don't slip your chance to collect thousand of deals everyday</strong>
          </p>
        </Grid>
        <Grid item xs={5} sm={7} justify={"flex-end"} style={{display: "flex"}}>
          <form className={classes.form} noValidate autoComplete="off">
            <TextField id="email" label="Your email address"
                       size={"small"}
                       className={classes.subscribeText}
            />
            <Button id={"subscribe"} variant="contained" color="primary"
                    style={{marginLeft: "0.5em", marginTop: "0.6em"}}>
              Subscribe
            </Button>
          </form>
        </Grid>
      </Grid>

    </section>

  </Grid>;

  const about = <Grid container spacing={0} className={classes.aboutRoot}>
    <Grid container item xs={3} spacing={2} className={classes.mobileMode}>
      <Grid item xs={6} sm={12}>
        <Typography className={classes.headers}>Customer Service</Typography>
      </Grid>
      <Grid item xs={6} sm={12}>
        <Typography style={{color: "#C4011A", lineHeight: 1, fontSize: "0.95em", fontWeight: "bold"}}>
          <Link to={"#"} className={classes.removeLinkStyles}>
            Hotline Order: 1800-9999-9999
          </Link>
        </Typography>
        <Typography className={classes.fontSmall}>(Free,8-21h include Sat,Sun)</Typography>
      </Grid>
      <Grid item xs={6} sm={12}>
        <Typography style={{color: "#C4011A", lineHeight: 1, fontSize: "0.95em", fontWeight: "bold"}}>
          <Link to={"#"} className={classes.removeLinkStyles}>
            Customer Service: 1900-6034</Link></Typography>
        <Typography className={classes.fontSmall}>(10$/min, 8-21 include Sat,Sun)</Typography>
      </Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}>
        <Link to={"https://hotro.tiki.vn/hc/vi"}
              className={classes.removeLinkStyles}>Question&Answer</Link>
      </Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}>
        <Link to={"/https://hotro.tiki.vn/hc/vi/requests/new"} className={classes.removeLinkStyles}>
          Ask for Support</Link></Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}>
        <Link to={"/https://hotro.tiki.vn/hc/vi/categories/200126644"} className={classes.removeLinkStyles}>
          Ordering Instruction</Link></Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}>
        <Link to={"https://hotro.tiki.vn/hc/vi/categories/200123960"} className={classes.removeLinkStyles}>
          Transport Method</Link></Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}>
        <Link to={"https://tiki.vn/doi-tra-de-dang"} className={classes.removeLinkStyles}>
          Refund Policy</Link></Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}>
        <a href={"mailto:hotro@tiki.vn"} className={classes.removeLinkStyles}>
          Customer Support:support@tiki.vn</a></Grid>

    </Grid>
    <Grid container item xs={2} spacing={0} className={classes.mobileMode}>
      <Grid item xs={6} sm={12}>
        <Typography className={classes.headers}>About Tiki</Typography>
      </Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}><Link to={"https://tiki.vn/gioi-thieu-ve-tiki"} className={classes.removeLinkStyles}>Tiki Introduction</Link></Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}><Link to={"https://tuyendung.tiki.vn/"} className={classes.removeLinkStyles}>Recruitment</Link></Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}><Link to={"https://tiki.vn/bao-mat-thanh-toan"} className={classes.removeLinkStyles}>Payment Security</Link></Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}><Link to={"https://tiki.vn/bao-mat-thong-tin-ca-nhan"} className={classes.removeLinkStyles}>Information Security</Link></Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}><Link to={"https://hotro.tiki.vn/hc/vi/articles/201971214"} className={classes.removeLinkStyles}>Term&Agreement</Link></Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}><Link to={"https://tiki.vn/tu-van/"} className={classes.removeLinkStyles}>Tiki Advice</Link></Grid>
      <Grid item xs={6} sm={12}></Grid>
      <Grid item xs={6} sm={12}></Grid>
      <Grid item xs={6} sm={12}></Grid>
      <Grid item xs={6} sm={12}></Grid>
      <Grid item xs={6} sm={12}></Grid>
    </Grid>
    <Grid container item xs={2} spacing={0} className={classes.mobileMode}>
      <Grid item xs={6} sm={12}>
        <Typography className={classes.headers}>Associate and Connect
        </Typography>
      </Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}><Link to={"#"} className={classes.removeLinkStyles}>
        Work Regulation</Link>
      </Grid>
      <Grid item xs={6} sm={12} className={classes.fontSmall}><Link to={"#"} className={classes.removeLinkStyles}>
        Sell with Tiki</Link>
      </Grid>
      <Grid item xs={6} sm={12}/>
      <Grid item xs={6} sm={12}/>
      <Grid item xs={6} sm={12}/>
      <Grid item xs={6} sm={12}/>
      <Grid item xs={6} sm={12}/>
      <Grid item xs={6} sm={12}/>
      <Grid item xs={6} sm={12}/>
      <Grid item xs={6} sm={12}/>
      <Grid item xs={6} sm={12}/>
    </Grid>
    <Grid container item xs={3} spacing={0} style={{paddingLeft: "1em"}}>
      <Typography className={classes.headers} component={'span'}>Payment Method
        <Grid style={{paddingTop: "1.3em", lineHeight: 1}}>
          <Icon className={classes.iconRoot}>
            <Link to={"#"} className={classes.removeLinkStyles}>
              <img alt="visa" className={classes.icon} src={visaIcon}/>
            </Link>
          </Icon>
          <Icon className={classes.iconRoot}>
            <Link to={"#"} className={classes.removeLinkStyles}><img alt="master" className={classes.icon} src={mastercardIcon}/></Link>
          </Icon>
          <Icon className={classes.iconRoot}>
            <Link to={"#"} className={classes.removeLinkStyles}><img alt="jcb" className={classes.icon} src={jcbIcon}/></Link>
          </Icon>
        </Grid>
        <Grid>
          <Icon className={classes.iconRoot}>
            <Link to={"#"} className={classes.removeLinkStyles}><img alt="cash" className={classes.icon} src={cashIcon}/></Link>
          </Icon>
          <Icon className={classes.iconRoot}>
            <Link to={"#"} className={classes.removeLinkStyles}><img alt="internet" className={classes.icon} src={internetIcon}/></Link>
          </Icon>
          <Icon className={classes.iconRoot}>
            <Link to={"#"} className={classes.removeLinkStyles}><img alt="installment" className={classes.icon} src={installmentIcon}/></Link>
          </Icon>
        </Grid>
      </Typography>

    </Grid>
    <Grid container item xs={2} spacing={0}>
      <Typography className={classes.headers} component={'span'}>Connect with Us
        <Grid style={{paddingTop: "1.2em", lineHeight: 1}}>
          <Link to="https://www.facebook.com/praise.oketola">
            <Icon className={classes.iconRoot}>
              <img alt="fb" className={classes.icon} src={fbIcon}/>
            </Icon>
          </Link>
          <Icon className={classes.iconRoot}>
            <Link to={"#"} className={classes.removeLinkStyles}>
              <img alt="yt" className={classes.icon} src={youtubeIcon}/>
            </Link>
          </Icon>
          <Icon className={classes.iconRoot}>
            <Link to={"#"} className={classes.removeLinkStyles}>
              <img alt="zalo" className={classes.icon} src={zalo} style={{width: 32, height: 32}}/>
            </Link>
          </Icon>
        </Grid>
        <Grid>
          <Typography  component={'span'}>
            <p className={classes.headers}> Install App On Your Mobile</p>

            <Grid>
              <div>
                <Link to={"#"} className={classes.removeLinkStyles}>
                  <img alt="appstore" className={classes.apprefer} src={appstore}
                       style={{width: '134px'}}/>
                </Link>
              </div>
              <div>
                <Link to={"#"} className={classes.removeLinkStyles}>
                  <img alt="playstore" className={classes.apprefer} src={playstore}
                       style={{width: '134px'}}/>
                </Link>
              </div>
            </Grid>
          </Typography>
        </Grid>
      </Typography>

    </Grid>
  </Grid>;

  return (
      <div className={classes.root} style={{margin: '0 0%', background: 'white'}}>
        <div className={classes.news} style={{padding: '0 6%'}}>
          {newsletter}
        </div>
        <div className={classes.about} style={{padding: '0 6%'}}>
          {about}
        </div>
      </div>
  );
}

export default Footer
