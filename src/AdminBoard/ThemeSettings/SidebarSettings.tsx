import React, { Fragment } from 'react';
import { createStyles, Divider, makeStyles, Slider, Theme, Typography } from '@material-ui/core';
import intl from "react-intl-universal";
import useRowStyles from './useRowStyles';
import classNames from 'classnames';
import { useThemeSettings } from 'store/helpers/useAppStore';
import { DARK, LIGHT, linearGradient1, linearGradient2, linearGradient3, linearGradient4, linearGradient5, sidebarImg1, sidebarImg2, sidebarImg3, sidebarImg4, sidebarImg5, sidebarImg6, sidebarImg7, sidebarImg8 } from 'store/ThemeSettings';
import {observer} from "mobx-react-lite";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    colorBlock:{
      width:'50px',
      height:'80px',
      border:'solid 1px',
      borderRadius:'10px',
      cursor:"pointer",
      margin:theme.spacing(1),
      backgroundSize: "cover",
      backgroundPosition: "center center",
    },
    selected:{
      boxShadow: "0 0 0 2px rgba(26, 92,255, 0.4)"
    }
  }),
);

const MaskBlock = observer((
  props:{
    selectedLinerGradient:string,
    mask:string,
    borderColor?:string,
    light?:boolean,
  }
)=>{
  const {mask, selectedLinerGradient, borderColor, light=false} = props;
  const classes = useStyles();
  const selected = mask === selectedLinerGradient;
  const sidebarSkin = useThemeSettings().leftDrawerSkin;

  const handleClick = ()=>{
    sidebarSkin.setMask(mask);
    sidebarSkin.setMode(light ? LIGHT : DARK);
  }

  return (
    <div className = {classNames(classes.colorBlock, {[classes.selected]:selected})}
      style={{
        backgroundImage : mask,
        borderColor: borderColor||'transparent',
        opacity: ".9",
      }}
      onClick={handleClick}
    ></div>
  )
})

const ImageBlock = observer((
  props:{
    selectImage:any,
    image?:any,
    borderColor?:string,
  }
)=>{
  const {selectImage, image, borderColor } = props;
  const classes = useStyles();
  const selected = image === selectImage;
  const sidebarSkin = useThemeSettings().leftDrawerSkin;

  const handleClick = ()=>{
    sidebarSkin.setImage(image);
  }

  return (
    <div className = {classNames(classes.colorBlock, {[classes.selected]:selected})}
      style={{
        backgroundImage:"url(" + image + ")",
        opacity: ".9",
        borderColor: borderColor||'transparent',
      }}
      onClick={handleClick}
    ></div>
  )
})

export const SidebarSettings = observer(()=>{
  const classes = useRowStyles();
  const sidebarSkin = useThemeSettings().leftDrawerSkin;
 
  return (
    <Fragment>
      <Typography 
        variant="subtitle1"
        className = {classes.title}
      >{intl.get('sidebar-color')}</Typography>
      <div className = {classes.content}>
        <MaskBlock 
          selectedLinerGradient= {sidebarSkin.mask} 
          mask= {linearGradient1}
          borderColor="#111"
          light
        />
        <MaskBlock selectedLinerGradient= {sidebarSkin.mask} mask = {linearGradient2}/>
        <MaskBlock selectedLinerGradient= {sidebarSkin.mask} mask = {linearGradient3}/>
        <MaskBlock selectedLinerGradient= {sidebarSkin.mask} mask = {linearGradient4}/>
        <MaskBlock selectedLinerGradient= {sidebarSkin.mask} mask = {linearGradient5} borderColor="#fff"/>
      </div>
      <div className = {classes.content}>
        <Typography gutterBottom>
          {intl.get("opacity")}
        </Typography>
        <Slider
          value={sidebarSkin.maskOpacity}
          max = {1}
          step={0.01}
          valueLabelDisplay="on"
          onChange = {(e,value)=>{sidebarSkin.setMaskOpacity(value as any)}}
        />
      </div>
      <Divider />
      <Typography 
        variant="subtitle1"
        className = {classes.title}
      >{intl.get('sidebar-image')}</Typography>
      <div className = {classes.content}>
        <ImageBlock selectImage = {sidebarSkin.image} borderColor="#111"/>
        <ImageBlock selectImage = {sidebarSkin.image} image={sidebarImg1}/>
        <ImageBlock selectImage = {sidebarSkin.image} image={sidebarImg2}/>
        <ImageBlock selectImage = {sidebarSkin.image} image={sidebarImg3}/>
        <ImageBlock selectImage = {sidebarSkin.image} image={sidebarImg4}/>
        <ImageBlock selectImage = {sidebarSkin.image} image={sidebarImg5}/>
        <ImageBlock selectImage = {sidebarSkin.image} image={sidebarImg6}/>
        <ImageBlock selectImage = {sidebarSkin.image} image={sidebarImg7}/>
        <ImageBlock selectImage = {sidebarSkin.image} image={sidebarImg8}/>
      </div>
    </Fragment>
  )
})
